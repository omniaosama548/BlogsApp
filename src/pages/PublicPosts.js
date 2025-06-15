import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PublicPosts.css";
import { getToken } from "../auth";
import { Modal, Button } from "react-bootstrap";
import { getUserIdFromToken } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../api";

function PublicPosts() {
  const currentUserId = getUserIdFromToken();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/Post/all");
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setPosts(sorted);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
        await axiosInstance.delete(`/Post/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        setPosts(posts.filter((post) => post.id !== id));
      } catch (err) {
        console.error("Error deleting post:", err);
        Swal.fire("Error", "Failed to delete the post.", "error");
      }
    }
  };

  const handleView = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5 explore-heading">Explore Public Posts</h2>
      <div className="row">
        {currentPosts.map((post, index) => (
          <div
            className="col-md-6 col-lg-4 mb-4 fade-in"
            key={post.id}
            style={{ animationDelay: `${index * 0.22}s` }}
          >
            <div className="card h-100 shadow-sm border-0">
              <img
                src={`https://psotsomnapi.runasp.net${post.imageUrl}` || `https://picsum.photos/400/200?random=${post.id}`}
                onError={(e) => {
                  e.target.src = `https://picsum.photos/400/200?random=${post.id}`;
                }}
                className="card-img-top"
                alt="Post"
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{post.title.slice(0, 40)}</h5>
                <p className="card-text text-muted">{post.description.slice(0, 80)}...</p>
                <p className="text-primary fw-semibold mb-1">By: {post.userName}</p>

                {post.userId?.toString() === currentUserId?.toString() && (
                  <div className="mt-2 d-flex justify-content-between">
                    <button className="btn  px-4 rounded-5 pt-0 pb-0  bedit">
                      <Link to={`/edit/${post.id}`} className="btn">Edit</Link>
                    </button>
                    <button className="btn px-4 pt-0 pb-0 bdelete rounded-5" onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                )}

                <button className="btn btn-dark mt-2 w-100" onClick={() => handleView(post)}>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              key={index}
            >
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={
              selectedPost?.imageUrl?.startsWith("http")
                ? selectedPost.imageUrl
                : `https://psotsomnapi.runasp.net${selectedPost?.imageUrl}`
            }
            className="img-fluid mb-3"
            alt="Post"
            onError={(e) =>
              (e.target.src = `https://picsum.photos/600/300?random=${selectedPost?.id}`)
            }
          />
          <p>{selectedPost?.description}</p>
          <p className="fw-semibold text-primary">Posted by: {selectedPost?.userName}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PublicPosts;

