import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { User, Calendar, Hash } from "lucide-react"; // Import icons
import { useEffect } from "react";

interface RequestData {
  ownerName: string;
  number: string;
  platformName: string;
  ownerId: string;
  waitingApproval: boolean;
  creationTime: string|null;
}

export default function Component({data, officeId,providerId}: {data: RequestData, officeId: string,providerId:""}) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {

      navigate("/login");


    }
    
  });
  const { ownerName, number, platformName, ownerId,waitingApproval, creationTime } = data;
  const formattedDate = creationTime 
  ? new Date(creationTime).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) 
  : " ";

  return (
    <Link to={`/offices/${providerId}/request/${number}`} state={{ waitingApproval, ownerId, platformName,officeId}}className="w-full block hover:scale-[1.02] transition-transform">
      <Card className="w-full my-3 rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-500" />
              <span className="text-lg font-semibold text-gray-700">{number}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              waitingApproval == true 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {waitingApproval == true ? 'بانتظار الإجراء' : 'تم اعتماده'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <h5 className="text-xl font-bold text-gray-900">{ownerName}</h5>
              <p className="text-sm text-gray-600">{ownerId}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {platformName}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}