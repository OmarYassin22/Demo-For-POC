import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Autodesk: any;
  }
}

interface ForgeViewerProps {
  urn: string;
  accessToken: string;
}

const ForgeViewer: React.FC<ForgeViewerProps> = ({ urn, accessToken }) => {
  const viewerDiv = useRef<HTMLDivElement>(null);
  const [viewerApp, setViewerApp] = useState<any>(null);

  // Dynamically load Forge Viewer script if it's not already available
  const loadForgeViewerScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Autodesk && window.Autodesk.Viewing) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://viewer.autodesk.com/viewers/7.*/viewer3D.js';
        script.onload = () => resolve();
        script.onerror = (err) => reject(new Error('Failed to load Autodesk Forge Viewer script'));
        document.head.appendChild(script);
      }
    });
  };

  useEffect(() => {
    // Ensure viewer div is available
    if (!viewerDiv.current) return;

    // Load Forge Viewer script and initialize viewer
    loadForgeViewerScript()
      .then(() => {
        const options = {
          env: 'AutodeskProduction',
          accessToken,
        };

        // Initialize the viewer once the script is loaded
        window.Autodesk.Viewing.Initializer(options, () => {
          const viewer = new window.Autodesk.Viewing.GuiViewer3D(viewerDiv.current);
          setViewerApp(viewer);
          viewer.start();

          const documentId = `urn:${urn}`;
          window.Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadError);
        });
      })
      .catch((error) => {
        console.error('Error loading Autodesk Forge Viewer script:', error);
      });

    // Cleanup viewer on unmount
    return () => {
      viewerApp?.finish();
    };
  }, [urn, accessToken, viewerApp]);

  // Document load success callback
  function onDocumentLoadSuccess(doc: any) {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (!viewable) {
      console.warn('Document contains no viewables');
      return;
    }

    viewerApp.loadDocumentNode(doc, viewable).then(() => {
      console.log('Model loaded successfully');
    }).catch((error: any) => {
      console.error('Error loading document node:', error);
    });
  }

  // Document load error callback
  function onDocumentLoadError(errorCode: number, errorMsg: string) {
    console.error(`onDocumentLoadError: ${errorCode} - ${errorMsg}`);
  }

  return <div ref={viewerDiv} style={{ width: '100%', height: '600px' }} />;
};

export default ForgeViewer;
