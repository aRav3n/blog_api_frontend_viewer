const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getJsonResponse(urlExtension, method, bodyObject) {
  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
  } else {
    fetchObject.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, fetchObject);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error sending data:", error);
  }
}

export async function wakeUpBackend() {
  const bodyObject = null;
  const urlExtension = "user";
  const method = "GET";

  await getJsonResponse(urlExtension, method, bodyObject);
}

export async function getAllPosts() {
  const urlExtension = "post";
  
}
