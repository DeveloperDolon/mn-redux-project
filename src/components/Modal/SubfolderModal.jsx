import { useCreateSubFolderMutation } from "@/redux/features/folder/folderApi";
import { Dialog, Transition } from "@headlessui/react";
import { Label } from "@radix-ui/react-menubar";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase/firebase.config";

export default function SubFolderModal({ isOpen, closeModal }) {
  const [folderId, setFolderId] = useState("");
  const [createSubfolder, { data, isSuccess }] = useCreateSubFolderMutation();
  useEffect(() => {
    const folderIdValue = JSON.parse(localStorage.getItem("folder"));
    setFolderId(folderIdValue);
  }, []);

  console.log(folderId)
  const handleFolder = (e) => {
    e.preventDefault();
    const subFolder = e.target.subfolder.value;
    const image = e.target.image.files[0];
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (imageUrl) => {
            const data = {
              name: subFolder,
              image: imageUrl,
              folderId: folderId,
            };

            createSubfolder(data);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Subfolder Created Successfully");
      localStorage.removeItem("folder");
      closeModal();
    }
  }, [data]);

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
                          Create New Sub Folder
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
                      <Label>Subfolder Name</Label>
                      <Input
                        name="subfolder"
                        type="text"
                        className="w-full border-2 px-3 py-2"
                      />
                    </div>
                    <div className="mt-2">
                      <Label>Image</Label>
                      <input
                        name="image"
                        type="file"
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
