import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";
import { getToken } from "../auth";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "", 
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/Post/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setForm({
        title: res.data.title,
        description: res.data.description,
        imageUrl: res.data.imageUrl, 
      });
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (newImage) {
      formData.append("image", newImage);
    }

    await axios.put(`/Post/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/posts");
  };

  const fullImageUrl = form.imageUrl?.startsWith("http")
    ? form.imageUrl
    : `https://psotsomnapi.runasp.net${form.imageUrl}`;

  return (
    <div className="container" style={{ marginTop: "100px", maxWidth: "600px" }}>
      <h3 className="mb-4"> Edit Post</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {form.imageUrl && (
          <div className="mb-3 text-center">
            <img
              src={fullImageUrl}
              alt="Current"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
            />
            <p className="text-muted mt-2">Current Image</p>
          </div>
        )}

        <div className="mb-3">
          <label>Change Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="mb-3">
          <label>Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-dark w-100">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
