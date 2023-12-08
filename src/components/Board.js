import React, { useState } from "react";
import "./Board.css";
import { FaTrashAlt, FaEdit, FaThumbsUp, FaBookmark } from "react-icons/fa";

const Board = ({ board, onAddPost }) => {
  const [showAddPostPopup, setShowAddPostPopup] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDesc, setNewPostDesc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState(board.posts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddPost = () => {
    if (newPostTitle.trim() !== "") {
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
        desc: newPostDesc,
        image: selectedImage ? URL.createObjectURL(selectedImage) : "",
        likes: 0,
        bookmarked: false,
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);
      onAddPost(board.id, newPost);
      setShowAddPostPopup(false);
      setNewPostTitle("");
      setNewPostDesc("");
      setSelectedImage(null);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (postId, newTitle, newDesc) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, title: newTitle, desc: newDesc } : post
      )
    );
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleBookmarkPost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const handleEditPost = (postId, updatedTitle, updatedDescription) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, title: updatedTitle, description: updatedDescription }
          : post
      )
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterPosts = () => {
    if (searchQuery.trim() === "") {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredPosts = filterPosts();

  return (
    <div className="board">
      <div className="board-header">
        <div className="board-name-i">Board Name: </div>
        {board.title}
        <div className="board-search">
          <input
            className="search-input"
            type="text"
            placeholder="Enter post name to search:"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>
      <div className="post-container">
        List of Posts:
        {filteredPosts.map((post) => (
          <div className="post-inner" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-desc">{post.desc}</div>
            {post.image && (
              <img className="post-imgg" src={post.image} alt="Post" />
            )}
            <div className="post-actions">
              <button onClick={() => handleDeletePost(post.id)}>
                <FaTrashAlt />
              </button>
              <button
                onClick={() =>
                  handleEditPost(
                    post.id,
                    "Updated Title",
                    "Updated Description"
                  )
                }
              >
                <FaEdit />
              </button>
              <button onClick={() => handleLikePost(post.id)}>
                <FaThumbsUp /> <span>{post.likes} Likes</span>
              </button>
              <button onClick={() => handleBookmarkPost(post.id)}>
                <FaBookmark className={post.bookmarked ? "bookmarked" : ""} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="post-button" onClick={() => setShowAddPostPopup(true)}>
        Add Post
      </button>

      {showAddPostPopup && (
        <div className="add-post-popup">
          <div className="heading-popup">Adding a Post</div>
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter post description"
            value={newPostDesc}
            onChange={(e) => setNewPostDesc(e.target.value)}
          />
          <input type="file" onChange={handleImageUpload} />

          <button className="add-post-submit" onClick={handleAddPost}>
            Submit
          </button>
          <button
            className="add-post-cancel"
            onClick={() => setShowAddPostPopup(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
