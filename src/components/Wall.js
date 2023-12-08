import React, { useState } from "react";
import Board from "./Board";
import "./Wall.css";

const Wall = () => {
  const [boards, setBoards] = useState([]);
  const [showAddBoardPopup, setShowAddBoardPopup] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddBoard = () => {
    setShowAddBoardPopup(true);
  };

  const onAddPost = (boardId, newPost) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? { ...board, posts: [...board.posts, newPost] }
          : board
      )
    );
  };

  const handleAddBoardConfirm = () => {
    if (newBoardTitle.trim() !== "") {
      const newBoard = {
        id: Date.now(),
        title: newBoardTitle,
        posts: [],
      };
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      setShowAddBoardPopup(false);
      setNewBoardTitle("");
    }
  };

  const handleAddBoardCancel = () => {
    setShowAddBoardPopup(false);
    setNewBoardTitle("");
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterBoards = () => {
    if (searchQuery.trim() === "") {
      return boards;
    }

    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBoards = filterBoards();

  return (
    <div className="wall">
      <div className="wall-title">
        Digital Wall App
        <div className="search-board">
          <input
            className="search-input"
            type="text"
            placeholder="Enter board name to search:"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>

      <div className="board-list">
        {filteredBoards.map((board) => (
          <Board key={board.id} board={board} onAddPost={onAddPost} />
        ))}
        <div className="add-board" onClick={handleAddBoard}>
          <button className="add-board-icon">+ Add Board</button>
        </div>
      </div>

      {showAddBoardPopup && (
        <div className="add-board-popup">
          <div className="board-popup-heading">Adding a Board</div>
          <input
            type="text"
            placeholder="Enter board name"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <button onClick={handleAddBoardConfirm}>Add</button>
          <button onClick={handleAddBoardCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Wall;
