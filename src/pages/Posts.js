import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";
import { getToken } from "../auth";
import { motion } from "framer-motion";
import "./Posts.css";
import Swal from "sweetalert2";

function Posts() {
  
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/Post", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 5;

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://psotsomnapi.runasp.net/api/Post/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      Swal.fire("Deleted!", "Your post has been deleted.", "success");
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
      Swal.fire("Error", "Failed to delete the post.", "error");
    }
  }
};

 return (
  <>
    <div className="posts-container">
      <div className="posts-header">
        <h2>Your Posts</h2>
      </div>

      {currentPosts.length === 0 ? (
        <div className="no-posts">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-box-2130356-1800926.png"
            alt="No Posts"
          />
          <h4>No posts yet</h4>
          <p>Start sharing your thoughts by creating your first post!</p>
          <Link to="/add" className="btn btn-outline-dark mt-3">
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="row justify-content-center">
          {currentPosts.map((post) => {
            const fullImageUrl = post.imageUrl?.startsWith("http")
              ? post.imageUrl
              : `https://psotsomnapi.runasp.net${post.imageUrl}`;

            return (
              <motion.div
                className="col-md-6 col-lg-4 mb-4"
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="post-card">
                  {post.imageUrl ? (
                    <img src={fullImageUrl} alt="Post" />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                  <div className="post-body">
                    <h5>{post.title}</h5>
                    <p>{post.description?.slice(0, 120)}...</p>
                    <p className="text-primary fw-semibold mb-2">By: {post.userName}</p>
                    <div className="post-actions">
                      <Link to={`/edit/${post.id}`} className="btn bedit">
                        Edit
                      </Link>
                      <Link to={`/view/${post.id}`} className="btn bview">
                        View
                      </Link>
                      <button className="btn bdelete" onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      <div className="pagination d-flex justify-content-center mt-4">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => paginate(index + 1)}
      className={`btn mx-1 ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
    >
      {index + 1}
    </button>
  ))}
</div>

    </div>

    <Link to="/add" className="add-post-btn text-decoration-none" title="Create New Post">
      +
    </Link>
  </>
);

}

export default Posts;
