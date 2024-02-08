import { app } from '@/firebase/firebase.config';
import { useGetAdminUserByEmailQuery } from '@/redux/features/adminUser/adminUserApi';
import { useUpdateGigMutation } from '@/redux/features/gigs/gigsApi';
import { Dialog, Transition } from '@headlessui/react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";

export default function EditGigModal({ isOpen, closeModal, gigData }) {

    const { email } = useSelector((state) => state.userSlice);
    const { data: adminUser } = useGetAdminUserByEmailQuery({ email });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [fileFormat, setFileFormat] = useState("");
    const [gigsImage, setGigsImage] = useState([]);
    const [industry, setIndustry] = useState("");
    const [design, setDesign] = useState();

    const [updateGig] = useUpdateGigMutation();

    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {

        if (gigData) {
            setTitle(gigData?.data?.title || "");
            setDescription(gigData?.data?.description || "");
            setSize(gigData?.data?.size || "");
            setFileFormat(gigData?.data?.fileFormat || "");
            setGigsImage(gigData?.data?.GigsImage || []);
            setIndustry(gigData?.data?.industry || "");
            setDesign(gigData?.data?.industry || "");
        }

    }, [gigData])

    const handleFileInputChange = (e) => {
        const selectedFiles = e.target.files;
        const fileArray = Array.from(selectedFiles);

        const updatedFiles = fileArray.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles([...files, ...updatedFiles]);
    };

    const handleCheckboxChange = (index) => {
        const isChecked = checkedItems.includes(index);
        if (isChecked) {
            setCheckedItems(checkedItems.filter((item) => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const handleRemoveSelectedFiles = () => {
        const remainingFiles = files.filter(
            (_, index) => !checkedItems.includes(index)
        );
        setFiles(remainingFiles);
        setCheckedItems([]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setUpdating(true);

        const id = gigData?.data?.id;

        // Call getGigsImages and wait for it to complete
        const imageData = await getGigsImages();

        const body = {
            title,
            description,
            size,
            fileFormat,
            imageData, // Use the result of getGigsImages
            industry,
            design,
            wordCount: description.split(" ").length,
            adminUserId: adminUser?.data?.id,
        }

        try {
            // Call the updateGig mutation with the updated body
            const res = await updateGig({ id, body });

            if (res) {
                setUpdating(false);
                closeModal();
                return navigate('/');
            }

        } catch (error) {
            setUpdating(false);
            console.error("Error updating gig:", error);
            // Handle the error as needed
        }
    };

    async function getGigsImages() {
        if (files && files.length > 0) {
            // Map each file to a Promise that resolves when the upload is complete
            const uploadPromises = files.map((fileObject) => {
                const imageFile = fileObject.file;
                const fileName = new Date().getTime() + imageFile.name;
                const storageRef = ref(getStorage(app), fileName);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                // Return a Promise that resolves when the upload is complete
                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log("Upload is " + progress + "% done");
                        },
                        (error) => {
                            console.error(error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((imageUrl) => {
                                    resolve({ image: imageUrl });
                                })
                                .catch((error) => {
                                    console.error("Error getting download URL:", error);
                                    reject(error);
                                });
                        }
                    );
                });
            });

            try {
                // Wait for all upload promises to resolve
                const uploadedFiles = await Promise.all(uploadPromises);

                // Map the resolved upload promises to the required format
                const formattedImages = uploadedFiles.map((file) => ({ image: file.image }));

                return formattedImages;
            } catch (error) {
                console.error("Error occurred during form submission:", error);
                // Handle the error or return a default value as needed
                return [];
            }
        } else {
            // If no new files are selected, return the existing gigsImage
            return gigsImage;
        }
    }

    console.log("modal", gigData);

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
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow transition-all">

                                    <div className='flex justify-between items-center mb-5'>
                                        <h2 className='text-2xl text-webPrimary font-semibold'>Edit Gig</h2>
                                        <IoCloseCircleOutline onClick={closeModal} className='cursor-pointer' size={28} />
                                    </div>



                                    <div className="w-full">
                                        <form className=" w-full h-auto" onSubmit={(e) => onSubmit(e)}>
                                            <div className="mb-2">
                                                <label
                                                    htmlFor="title"
                                                    className="ml-2 block text-gray-700 font-medium"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label
                                                    htmlFor="description"
                                                    className="ml-2 block text-gray-700 font-medium"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    id="description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="my-1 resize-none w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                    rows="4"
                                                    cols="50"
                                                />
                                            </div>
                                            <div className="mb-4 flex flex-col">
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor="size"
                                                            className="ml-2 block mb-1 text-gray-700 font-medium"
                                                        >
                                                            Size
                                                        </label>
                                                        <input
                                                            id="size"
                                                            type="text"
                                                            value={size}
                                                            onChange={(e) => setSize(e.target.value)}
                                                            className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor="fileFormat"
                                                            className="ml-2 block mb-1 text-gray-700 font-medium"
                                                        >
                                                            File Format
                                                        </label>
                                                        <input
                                                            id="fileFormat"
                                                            type="text"
                                                            value={fileFormat}
                                                            onChange={(e) => setFileFormat(e.target.value)}
                                                            className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="fileUpload"
                                                    className="ml-2 block text-gray-700 font-medium"
                                                >
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileInputChange}
                                                    multiple
                                                    id="fileUpload"
                                                    accept="image/*"
                                                    className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200 text-center"
                                                />


                                                {
                                                    files && files.length > 0 ? <div className="grid gap-10 grid-cols-2 my-5">

                                                        {files.map((fileObject, index) => (
                                                            <div key={index} className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`checkbox-${index}`}
                                                                    className="mr-4"
                                                                    checked={checkedItems.includes(index)}
                                                                    onChange={() => handleCheckboxChange(index)}
                                                                />
                                                                <img
                                                                    src={fileObject.preview}
                                                                    alt={`Preview-${index}`}
                                                                    className="w-[400px] h-[100px] object-contain"
                                                                />
                                                                <span
                                                                    onClick={() => handleRemoveSelectedFiles(index)}
                                                                    className="ml-4 bg-[#F2F9FF] text-gray-500  px-1.5 py-[.25] rounded-full  border-2 border-gray-500 cursor-pointer"
                                                                >
                                                                    &#10005;
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div> : <div className="grid gap-4 grid-cols-4 my-5">
                                                        {gigsImage.map((item, index) => (
                                                            <div key={item.id}>
                                                                <img
                                                                    src={item.image}
                                                                    alt={`Preview-${index}`}
                                                                    className="w-[400px] h-[100px] object-contain"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                }



                                            </div>

                                            <div className="mb-4 flex flex-col">
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor="industries"
                                                            className="ml-2 block text-gray-700 font-medium"
                                                        >
                                                            Industries
                                                        </label>
                                                        <input
                                                            id="industries"
                                                            type="text"
                                                            value={industry}
                                                            onChange={(e) => setIndustry(e.target.value)}
                                                            className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                        />

                                                    </div>
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor="designs"
                                                            className="ml-2 block text-gray-700 font-medium"
                                                        >
                                                            Designs
                                                        </label>
                                                        <input
                                                            id="designs"
                                                            type="text"
                                                            value={design}
                                                            onChange={(e) => setDesign(e.target.value)}
                                                            className="my-1 w-full border-2 border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:border-gray-200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center mt-5">
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:ring focus:border-blue-300 mb-4"
                                                >
                                                    {updating ? (
                                                        <FaSpinner className='m-auto animate-spin' size={24} />
                                                    ) : (
                                                        `Update Now`
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}