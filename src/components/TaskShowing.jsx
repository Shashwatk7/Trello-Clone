import React from "react";

export function TaskModal({ closeModal, modalTitle, setModalTitle, modalType, setModalType, lists, modalDesc, setModalDesc, addItem, Colorlist }) {
  const handleCloseModal = () => {
    closeModal();
  };

  const handleTitleChange = (event) => {
    setModalTitle(event.target.value);
  };

  const handleTypeChange = (event) => {
    setModalType(event.target.value);
  };

  const handleDescChange = (event) => {
    setModalDesc(event.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="w-full md:w-1/3 bg-white p-4 rounded border flex flex-col relative">
        <button className="absolute top-0 right-0 p-2" onClick={handleCloseModal}>
          X
        </button>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={modalTitle}
          onChange={handleTitleChange}
          className="border mb-2 px-2 py-1 rounded"
        />
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={modalType}
          onChange={handleTypeChange}
          className="border mb-2 px-2 py-1 rounded"
        >
          {Object.keys(lists).map((type) => (
            <option key={type} value={type} style={{ color: `${Colorlist[type]}` }} className="capitalize">
              {type.toString().split("_").join(" ")}
            </option>
          ))}
        </select>
        <label htmlFor="desc">Description:</label>
        <textarea
          id="desc"
          value={modalDesc}
          onChange={handleDescChange}
          className="border mb-2 px-2 py-1 rounded"
        />
        <div className="flex justify-between">
          <button className="p-2 rounded text-white hover:bg-blue-700 bg-blue-500" onClick={addItem}>
            Add
          </button>
          <button className="bg-red-600 p-2 rounded text-white hover:bg-red-700" onClick={handleCloseModal}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}