import { Autodesk } from 'forge-viewer'; // Make sure to install Forge Viewer types
import { getToken } from './auth'; // Assuming you extract token logic into an auth file

const urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTYwOGM1OWYtN2ZjNC00MzFhLWEzNjktOWY5YWNlOGRkZjBlL0FCREFMUkFITUFfQUxfR0hBTURJX3JldjAyLnJ2dA';
let viewerApp: Autodesk.Viewing.GuiViewer3D | null = null;

export function initializeViewer(container: HTMLElement) {
    const options = {
        env: 'AutodeskProduction',
        getAccessToken: (callback: (token: string, expires: number) => void) => getToken().then(({ access_token, expires_in }) => callback(access_token, expires_in)),
    };

    Autodesk.Viewing.Initializer(options, () => {
        const config = { extensions: ['SampleExtension', 'DataGridExtension'] };
        viewerApp = new Autodesk.Viewing.GuiViewer3D(container, config);
        Autodesk.Viewing.Document.load(`urn:${urn}`, onDocumentLoadSuccess, onDocumentLoadError);
    });
}

function onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (!viewable) {
        console.warn('Document contains no viewables');
        return;
    }

    viewerApp?.start();
    viewerApp?.loadDocumentNode(doc, viewable).then(onItemLoadSuccess).catch(onItemLoadError);
}

function onDocumentLoadError(errorCode: number) {
    console.error(`onDocumentLoadError: ${errorCode}`);
}

function onItemLoadSuccess() {
    console.debug('Model loaded successfully');
}

function onItemLoadError(error: any) {
    console.error(`onItemLoadError: ${error}`);
}
