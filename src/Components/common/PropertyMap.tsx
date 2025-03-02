import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, AlertCircle } from 'lucide-react';

// Fix for default marker icons in Leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Coordinate {
    CoordinateNumber: number;
    Longitude: string;
    Latitude: string;
}

interface PropertyMapProps {
    coordinates: Coordinate[];
    height?: string;
    buildingType?: 'residential' | 'commercial' | 'industrial' | string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
    coordinates,
    height = '400px',
    buildingType = 'residential'
}) => {
    // If no coordinates available, return placeholder
    if (!coordinates || coordinates.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 rounded-lg"
                style={{ height }}
            >
                <div className="text-center p-4">
                    <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">لا توجد إحداثيات متاحة</p>
                </div>
            </div>
        );
    }

    // Process and sort coordinates to create a proper polygon
    const processedCoordinates = useMemo(() => {
        // First convert strings to numbers and filter out invalid coordinates
        const validCoords = coordinates
            .map(coord => ({
                number: coord.CoordinateNumber,
                lat: parseFloat(coord.Latitude),
                lng: parseFloat(coord.Longitude)
            }))
            .filter(coord => !isNaN(coord.lat) && !isNaN(coord.lng));

        if (validCoords.length === 0) return { coordinates: [], center: [0, 0] as [number, number] };

        // Calculate the centroid of the polygon
        const centroid = validCoords.reduce(
            (acc, coord) => {
                return { lat: acc.lat + coord.lat / validCoords.length, lng: acc.lng + coord.lng / validCoords.length };
            },
            { lat: 0, lng: 0 }
        );

        // Sort coordinates in a clockwise order around the centroid
        // This creates a proper polygon outline
        const sortedCoords = [...validCoords].sort((a, b) => {
            // Calculate the angle between the centroid and each point
            const angleA = Math.atan2(a.lat - centroid.lat, a.lng - centroid.lng);
            const angleB = Math.atan2(b.lat - centroid.lat, b.lng - centroid.lng);
            return angleA - angleB;
        });

        // Convert to the format needed for Leaflet
        const mapCoords = sortedCoords.map(coord => [coord.lat, coord.lng] as [number, number]);

        return {
            coordinates: mapCoords,
            center: [centroid.lat, centroid.lng] as [number, number],
            original: validCoords
        };
    }, [coordinates]);

    // If conversion resulted in no valid coordinates
    if (processedCoordinates.coordinates.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-gray-100 rounded-lg"
                style={{ height }}
            >
                <div className="text-center p-4">
                    <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">بيانات الإحداثيات غير صالحة</p>
                </div>
            </div>
        );
    }

    // Determine shape type based on points count and/or building type
    const getShapeInfo = useMemo(() => {
        // Determine the shape color based on building type
        let color = 'green';
        let fillColor = '#4ade80';
        let shapeName = 'مبنى';

        // switch (buildingType) {
        //     case 'commercial':
        //         color = 'blue';
        //         fillColor = '#60a5fa';
        //         shapeName = 'مبنى تجاري';
        //         break;
        //     case 'industrial':
        //         color = 'orange';
        //         fillColor = '#fb923c';
        //         shapeName = 'مبنى صناعي';
        //         break;
        //     case 'school':
        //         color = 'purple';
        //         fillColor = '#c084fc';
        //         shapeName = 'مدرسة';
        //         break;
        //     case 'mosque':
        //         color = 'teal';
        //         fillColor = '#2dd4bf';
        //         shapeName = 'مسجد';
        //         break;
        //     default:
        //         shapeName = 'مبنى سكني';
        //         break;
        // }

        // Determine shape type based on number of points
        let shapeType = '';
        const numPoints = processedCoordinates.coordinates.length;

        if (numPoints === 3) {
            shapeType = 'مثلث';
        } else if (numPoints === 4) {
            shapeType = 'مربع';
        } else if (numPoints > 4) {
            shapeType = 'متعدد الأضلاع';
        } else {
            shapeType = 'خط';
        }

        return {
            color,
            fillColor,
            shapeName,
            shapeType
        };
    }, [buildingType, processedCoordinates.coordinates.length]);

    return (
        <MapContainer
            center={processedCoordinates.center}
            zoom={18}
            style={{ height, width: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Add markers for each corner point */}
            {processedCoordinates.coordinates.map((coord, index) => (
                <Marker key={`marker-${index}`} position={coord}>
                    <Popup className="text-right" dir="rtl">
                        <div>
                            <strong>نقطة {index + 1}</strong><br />
                            <div>الإحداثيات: {coord[0].toFixed(6)}, {coord[1].toFixed(6)}</div>
                            {index === 0 && (
                                <div className="mt-2">
                                    <strong>{getShapeInfo.shapeName}</strong><br />
                                    نوع الشكل: {getShapeInfo.shapeType}<br />
                                    عدد النقاط: {processedCoordinates.coordinates.length}
                                </div>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Draw polygon based on shape type */}
            {processedCoordinates.coordinates.length >= 3 ? (
                < Polygon
                    positions={processedCoordinates.coordinates}
                    pathOptions={{
                        color: getShapeInfo.color,
                        weight: 3,
                        fillColor: getShapeInfo.fillColor,
                        fillOpacity: 0.2
                    }}
                >
                    <Popup className="text-right" dir="rtl">
                        <div>
                            <strong>{getShapeInfo.shapeName}</strong><br />
                            نوع الشكل: {getShapeInfo.shapeType}<br />
                            عدد النقاط: {processedCoordinates.coordinates.length}
                        </div>
                    </Popup>
                </Polygon>
            ) : processedCoordinates.coordinates.length === 2 ? (
                // If only 2 points, draw a line
                <Polygon
                    positions={processedCoordinates.coordinates}
                    pathOptions={{
                        color: getShapeInfo.color,
                        weight: 4,
                        fillOpacity: 0
                    }}
                >
                    <Popup className="text-right" dir="rtl">
                        <div>
                            <strong>{getShapeInfo.shapeName}</strong><br />
                            نوع الشكل: خط<br />
                            عدد النقاط: 2
                        </div>
                    </Popup>
                </Polygon>
            ) : null}

        </MapContainer>
    );
};

export default PropertyMap;
