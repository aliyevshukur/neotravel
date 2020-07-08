export async function uploadImg(uri) {
  try {
    const image = {
      name: uri.split("/").pop(),
      type: `image/${uri.split(".").pop()}`,
      uri,
    };

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dflogslqa/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("uploadImg err", error);
  }
}
