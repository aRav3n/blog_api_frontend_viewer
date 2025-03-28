import { useState, useEffect } from "react";
import { getAllPosts } from "../apiFunctions";
import { Outlet, Link } from "react-router-dom";
import "../App.css";
import Header from "../Header";
import Footer from "../Footer";

export default function Root() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      if (allPosts) {
        setPostList(allPosts);
      } else {
        const tempList = [{ id: 1, title: "Couldn't fetch data" }];
        setPostList(tempList);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div>
        <nav>
          <h2>Posts</h2>
          <ul>
            {postList.map((post) => {
              return (
                <li key={post.id}>
                  <Link to={`post/${post.id}`}>{post.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
