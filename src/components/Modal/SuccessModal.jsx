// SuccessModal.js
import React from "react";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-slate-200 p-8 rounded shadow-md">
        <h2 className="text-2xl  text-blue-500 font-bold mb-4">
          Form Submitted Successfully!
        </h2>
        <button
          className="bg-gray-400 border-2  border-slate-500 font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
