export const poster = async (url: string, data: { [key: string]: any }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).catch((error) => console.log("Error: ", error));
  console.log(response);
  if (response) {
    return await response.json().catch((err) => console.log(err));
  }
  return null;
};