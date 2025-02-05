//Replace placeholder below by your encoded model urn
const urn =localStorage.getItem('urn');
    
    //'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTYwOGM1OWYtN2ZjNC00MzFhLWEzNjktOWY5YWNlOGRkZjBlL0FCREFMUkFITUFfQUxfR0hBTURJX3JldjAyLnJ2dA';


let viewerApp;
const documentId = `urn:${urn}`;
/**
 * Wait until document is ready and then initialize viewer and display given document.
 */
$(document).ready(() => {
    console.log('Document is ready');
    const options = {
        env: 'AutodeskProduction',
        getAccessToken: getToken
    };

    Autodesk.Viewing.Initializer(options, () => {
        const container = document.getElementById('viewer-container');
        const config = {
            extensions: [
                'DataGridExtension'
            ]
        };

        viewerApp = new Autodesk.Viewing.GuiViewer3D(container, config);
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadError);
    });
});

/**
 * Obtains authentication token. The information is returned back via callback.
 * @param {callback} callback - callback to pass access token and expiration time.
 */
async function getToken(callback) {
    const clientId = '8A24Sv5A1dnxsewS2cyuVEKnzaBkO4J4FdfdSUx17aJq1DUI';  // Replace with your actual client ID
    const clientSecret = '9VPSYajPf2AEkexvOo5swTwJgiELSNoAURJoaDq7235nPlLVjqD84RcgK0aTb3gm';  // Replace with your actual client secret

    // Create the Authorization header by encoding client_id:client_secret
    const encodedAuth = btoa(`${clientId}:${clientSecret}`);

    const url = 'https://developer.api.autodesk.com/authentication/v2/token';

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedAuth}`, // Use the encoded value here
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', 'bucket:create bucket:read code:all data:create data:read data:write');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        const result = await response.json();  // Parse JSON response

        if (response.ok) {
            console.log(result);
            callback(result.access_token, result.expires_in); // Log the response
        } else {
            console.error('Error getting auth token:', result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Autodesk.Viewing.Document.load() success callback.
 * Proceeds with model initialization.
 * @param {Autodesk.Viewing.Document} doc - loaded document
 */
function onDocumentLoadSuccess(doc, errorsAndWarnings) {
    // Get default geometry
    const viewable = doc.getRoot().getDefaultGeometry();

    if (!viewable) {
        console.warn('Document contains no viewables');
        return;
    }
    // Start viewer
    viewerApp.start();
    viewerApp.loadDocumentNode(doc, viewable).then((model) => {
        onItemLoadSuccess(model);
    }).then(async () => {


    }
    ).catch((err) => {
        onItemLoadError(err);
    });
}

/**
 * Autodesk.Viewing.Document.load() failure callback.
 * @param {number} errorCode 
 */
function onDocumentLoadError(errorCode, errorMsg, statusCode, statusText, errors) {
    console.error(`onDocumentLoadError: ${errorCode}`);
}

/**
 * loadDocumentNode resolve handler.
 * Invoked after the model's SVF has been initially loaded.
 * @param {Object} item 
 */
function onItemLoadSuccess(item) {
    console.debug('onItemLoadSuccess');
}

/**
 * loadDocumentNode reject handler.
 * @param {number} error
 */
function onItemLoadError(error) {
    console.error(`onItemLoadError: ${error}`);
}