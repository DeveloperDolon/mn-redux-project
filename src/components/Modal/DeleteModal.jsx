import { useDeleteCategoryMutation } from "@/redux/features/categories/category";
import React from "react";

const DeleteModal = ({ remove, setRemove, data }) => {
  const { id } = data;

  console.log(data);
  const [deleteCategory] = useDeleteCategoryMutation(id);

  function closeModal() {
    setRemove(false);
  }

  const handleDelete = () => {
    try {
      deleteCategory(id);
      setRemove(false);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <>
      {remove && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            </div>

            <div className="inline-block align-bottom w-[275px] h-[300px] bg-gray-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    onClick={closeModal}
                    className="mx-auto mt-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg mt-4 leading-6 font-medium text-gray-900">
                      Are you sure you want to delete this Category?
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm font-semibold mt-2 text-gray-500">
                        Category ID: {data?.id}
                      </p>
                      <p className="text-sm font-semibold mt-2 text-gray-700 line-clamp-3">
                        Category Title: {data?.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center">
                <button
                  onClick={handleDelete}
                  className="w-full inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-gray-100 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 bg-gray-200 w-full inline-flex justify-center rounded-md border border-gray-400 shadow-sm px-4 py-2 text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
