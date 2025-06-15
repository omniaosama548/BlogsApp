import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { getToken } from "../auth";
import Swal from "sweetalert2";

function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/Post/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
     console.log("Delete button clicked");
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
        await axios.delete(`/Post/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        navigate("/posts");
      } catch (err) {
        console.error("Error deleting post:", err);
        Swal.fire("Error", "Failed to delete the post.", "error");
      }
    }
  };

  if (!post) return <p className="text-center mt-5">Loading...</p>;

  const fullImageUrl = post.imageUrl?.startsWith("https")
    ? post.imageUrl
    : `https://psotsomnapi.runasp.net${post.imageUrl}`;

  return (
    <div className="container" style={{ marginTop: "100px", maxWidth: "700px" }}>
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {post.imageUrl && (
          <img src={fullImageUrl} className="card-img-top" alt="Post" />
        )}
        <div className="card-body">
          <h3 className="card-title mb-3">{post.title}</h3>
          <p className="card-text text-muted">{post.description}</p>

          <div className="d-flex gap-2 mt-4">
            <Link to={`/edit/${post.id}`} className="btn btn-outline-primary bedit">
              Edit
            </Link>
            <button className="btn btn-outline-danger bdelete" onClick={handleDelete}>
              Delete
            </button>
            <Link to="/posts" className="btn btn-outline-dark ms-auto">
              ← Back to Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;

