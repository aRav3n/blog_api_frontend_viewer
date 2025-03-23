const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getJsonResponse(urlExtension, method, bodyObject) {
  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
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
  const urlExtension = "post/all";
  const method = "GET";
  const posts = await getJsonResponse(urlExtension, method);
  return posts;
}

export async function getPostComments(postId) {
  const urlExtension = `comment/${postId}`;
  const method = "GET";
  const comments = await getJsonResponse(urlExtension, method);
  return comments;
}

export async function getPostFromId(postId) {
  const urlExtension = `post/${postId}`;
  const method = "GET";
  const post = await getJsonResponse(urlExtension, method);
  return post;
}

export async function postComment(postId, commentContent) {
  const urlExtension = `comment/${postId}`;
  const method = "POST";
  const bodyObject = { content: commentContent };
  await getJsonResponse(urlExtension, method, bodyObject);
  return;
}
