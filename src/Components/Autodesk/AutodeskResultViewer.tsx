



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
