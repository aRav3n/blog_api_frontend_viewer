import { useState, useEffect } from "react";
import { getAllPosts } from "../apiFunctions";
import "../App.css";
import Header from "../Header";
import Footer from "../Footer";

export default function Root() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPostList(allPosts);
      console.log({ allPosts });
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div id="sidebar">
        <h1>Posts</h1>
        <nav>
          <ul>
            {postList.map((post) => {
              <li key={post.id}>
                <a href={`post/${post.id}`}>{post.title}</a>
              </li>;
            })}
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}
