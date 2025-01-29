// import React, { useEffect } from "react";

// // Import stylesheets
// import '../../styles/site.css';
// import '../../styles/sampleExtension.css'//'./style/sampleExtension.css';

// // Define the App component
// const AutodeskResultViewer: React.FC = () => {
//   useEffect(() => {
//     // Dynamically load external scripts (if needed)
//     const loadScripts = () => {
//       const viewerScript = document.createElement("script");
//       viewerScript.src = "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js";
//       viewerScript.async = true;
//       document.body.appendChild(viewerScript);

//       const jqueryScript = document.createElement("script");
//       jqueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";
//       jqueryScript.async = true;
//       document.body.appendChild(jqueryScript);

//       // Load additional scripts needed for extensions
//       const extensionScripts = [
//         "./../src/Scripts/extensions/dataGridPanel.js",
//         "./../src/Scripts/extensions/sampleExtension.js",
//         "./../src/Scripts/extensions/baseExtension.js",
//         "./../src/Scripts/extensions/dataGridExtension.js",
//         "./../src/Scripts/extensions/conditionsResults.js",
//         "./../src/Scripts/extensions/viewer.utlis.js",
//         "./../src/Scripts/main.js"
//       ];

//       extensionScripts.forEach((scriptSrc) => {
//         const script = document.createElement("script");
//         script.src = scriptSrc;
//         script.async = true;
//         document.body.appendChild(script);
//       });
//     };

//     loadScripts();

//     return () => {
//       // Cleanup on component unmount (if needed)
//       const scripts = document.querySelectorAll("script[src]");
//       scripts.forEach(script => {
//         script.remove();
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <header>
//         <a href="/">
//           <div className="header-logo"></div>
//           <div className="header-title">APS Starter</div>
//         </a>
//       </header>
//       <main>
//         <div id="viewer-container" className="viewer-container"></div>
//       </main>
//     </div>
//   );
// };

// export default AutodeskResultViewer;



import React , { useEffect ,useState} from 'react'

const AutodeskResultViewer = () => {
  // const [htmlContent, setHtmlContent] = useState<string>("");

  // useEffect(() => {
  //   fetch(".././src/index.html") // Fetch from `public/sample.html`
  //     .then((response) =>response.text())
  //     .then((data) => setHtmlContent(data))
  //     .catch((error) => console.error("Error loading HTML file:", error));
  // }, []);

  return (
    <iframe src=".././src/index.html" title="External Page" width="100%" height="600px" />
   
  );
}

export default AutodeskResultViewer
