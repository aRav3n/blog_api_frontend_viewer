import { useParams } from "react-router-dom";
import { getPostComments, getPostFromId, postComment } from "../apiFunctions";
import { useEffect, useState } from "react";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [writeNewComment, setWriteNewComment] = useState(false);

  const getComments = async (id) => {
    const comments = await getPostComments(id);
    setComments(comments);
  };

  useEffect(() => {
    getComments(postId);
  }, [postId]);

  function NewComment() {
    const [commentContent, setCommentContent] = useState("");

    async function submitComment() {
      await postComment(postId, commentContent);
      await getComments(postId);
      setCommentContent("");
      getComments(postId);
      setWriteNewComment(false);
    }

    if (writeNewComment) {
      return (
        <form>
          <input
            type="text"
            name="content"
            id="content"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
          <button type="button" onClick={submitComment}>
            Submit comment
          </button>
        </form>
      );
    }
    return (
      <button
        type="button"
        onClick={() => {
          setWriteNewComment(true);
        }}
      >
        Add a new comment
      </button>
    );
  }

  if (comments.length > 0) {
    return (
      <div id="comments">
        <NewComment />
        {comments.map((comment) => {
          return <p key={comment.id}>{comment.content}</p>;
        })}
      </div>
    );
  }
  return (
    <div id="comments">
      <NewComment />
    </div>
  );
}

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchPost() {
      try {
        const currentPost = await getPostFromId(postId);
        const contentArray = currentPost.content.split("\n");
        for (let i = 0; i < contentArray.length; i++) {}
        currentPost.content = contentArray;
        setPost(currentPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (post.id) {
    return (
      <main>
        <div id="post">
          <h1>{post.title}</h1>
          {post.content.map((paragraph) => {
            const matchesContent = (element) => element === paragraph;
            const index = post.content.findIndex(matchesContent);
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
        <CommentSection postId={postId} />
      </main>
    );
  }
  return <></>;
}
