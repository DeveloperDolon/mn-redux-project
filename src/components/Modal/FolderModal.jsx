import { useCreateFolderMutation } from "@/redux/features/folder/folderApi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";

export default function FolderModal({ isOpen, closeModal }) {
  const [createFolder, { data, isSuccess }] =
    useCreateFolderMutation();
  const handleFolder = (e) => {
    e.preventDefault();
    const folder = e.target.folder.value;
    const data = {
      name: folder,
    };
    console.log(data)
    createFolder(data);
  };

  useEffect(() => {
    if(isSuccess) {
      toast.success("Folder Created Successfully");
      closeModal();
    }
  }, [data])  

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">
                    <div className="flex justify-between mb-5 items-center">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Create New Folder
                        </h3>
                      </div>
                      <div>
                        <div
                          onClick={closeModal}
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                        >
                          <button>x</button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Title>
                  <form onSubmit={handleFolder}>
                    <div className="mt-2">
                      <input
                        name="folder"
                        type="text"
                        className="w-full border-2 px-3 py-2"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
