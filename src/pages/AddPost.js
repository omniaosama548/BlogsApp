import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title.trim() || form.title.trim().length < 3) {
    setError("Title must be at least 3 characters.");
    return;
  }

  if (!form.description.trim() || form.description.trim().length < 10) {
    setError("Description must be at least 10 characters.");
    return;
  }

  if (!form.image) {
    setError("Image is required.");
    return;
  }

  setError("");
  setLoading(true);

  const formData = new FormData();
  formData.append("title", form.title.trim());
  formData.append("description", form.description.trim());
  formData.append("image", form.image);

  try {
    await axios.post("/Post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/posts");
  } catch (err) {
    setError("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

 

  return (
    <div className="container col-md-8" style={{ marginTop: "100px" }}>
      <h2 className="text-center mb-4">Create New Post</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white shadow"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {preview && (
          <div className="text-center mb-3">
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn bg-dark text-white w-100" disabled={loading}>
  {loading ? "Please wait while we publish your post" : "Publish Post"}
</button>

      </form>
    </div>
  );
}

export default AddPost;
