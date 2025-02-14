import { useState } from "react";
import MyEditor from "./Reusable/MyEditor";
import sendNewPost from "../utils/Posts/sendNewPost";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handlEditorChange = (newContent) => {
    setNewPost((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleTitleChange = (e) => {
    setNewPost((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await sendNewPost(newPost);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  return (
    <div className="container flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">NewPost</h1>
      <div className="flex gap-2 items-center justify-center container">
        <label className="text-2xl  " htmlFor="title">
          Title:
        </label>
        <input
          onChange={handleTitleChange}
          value={newPost.title}
          className="border rounded-full w-md px-2 py-1"
          type="text"
          name="title"
          id="title"
        />
      </div>
      <MyEditor value={newPost.content} onChange={handlEditorChange} />
      <button
        onClick={() => handleSubmit()}
        className="border rounded-full px-4 py-2 bg-blue-900 text-white"
      >
        Send New Post
      </button>
    </div>
  );
};

export default NewPost;
