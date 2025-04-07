import axios from "axios";

export async function sendFileToBackend(file, mainheading) {
  if (!file || file.length === 0) {
    alert("Please select a file.");
    return { imgpath: [], proroute: "", count: 0 };
  }

  const data = new FormData();
  file.forEach((f) => data.append("files", f));
  data.append("ProcessRoute", mainheading);

  try {
    const response = await axios.post("http://127.0.0.1:3000/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!response.data.imagePath || !Array.isArray(response.data.imagePath)) {
      console.log("No valid image paths received", response.data);
      return { imgpath: [], proroute: "", count: file.length };
    }

    const imgpath = response.data.imagePath.map((img) => img.imagepath);//array.map
    const proroute = response.data.ProcessRoute;

    return { imgpath, proroute, count: file.length };
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return { imgpath: [], proroute: "", count: 0 };
  }
}
