import React, { useState, useRef } from "react";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const ActionModal = ({ data }) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleDelete = () => {
    setRemove(true);
    setOpen(false);
  };

  const handleUpdate = () => {
    setUpdate(true);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <div className="fixed z-10 inset-0 overflow-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-1/3 px-1 py-6">
              <div className="px-4 py-3 sm:flex sm:px-6">
                <div className="py-2">
                  <span className="font-montserrat text-md font-semibold text-gray-600">
                    What action do you want to perform?
                  </span>
                </div>

                <span
                  type="button"
                  className="mt-1 inline-flex justify-center text-slate-700 px-3 py-2 text-xl font-semibold rounded-full sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                >
                  X
                </span>
              </div>
              <div className="flex gap-2 justify-evenly items-center py-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 w-full sm:w-auto"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 w-full sm:w-auto"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {update && (
        <UpdateModal update={update} setUpdate={setUpdate} data={data} />
      )}
      {remove && (
        <DeleteModal remove={remove} setRemove={setRemove} data={data} />
      )}
    </>
  );
};

export default ActionModal;
