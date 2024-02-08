import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import HomeSidebar from '../Home/HomeSidebar/HomeSidebar';
import { CgAttachment } from "react-icons/cg";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase/firebase.config';
import { useCreateRequirementsMutation } from '@/redux/features/requirements/requirementsApi';
import toast from 'react-hot-toast';
import { useGetAllCartItemsQuery } from '@/redux/features/cart/cartApi';
import { useSelector } from 'react-redux';

const ProjectRequirements = () => {
    const { id } = useParams();
    const { email } = useSelector((state) => state.userSlice);
    
    const [industry, setIndustry] = useState('');
    const [industryLogo, setIndustryLogo] = useState('');
    const [industryWebsite, setIndustryWebsite] = useState('');
    const [designIdeas, setDesignIdeas] = useState('');
    const [specificDesignSize, setSpecificDesignSize] = useState('');
    const [designInformation, setDesignInformation] = useState('');

    const [attachment1, setAttachment1] = useState('');
    const [attachment2, setAttachment2] = useState('');
    const [attachment3, setAttachment3] = useState('');

    const [imagePercent1, setImagePercent1] = useState(0);
    const [imagePercent2, setImagePercent2] = useState(0);
    const [imagePercent3, setImagePercent3] = useState(0);

    const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery(email);

    const navigate = useNavigate();

    const [createRequirements] = useCreateRequirementsMutation();

    const handleStartNowClick = () => {

        if(industry === "" || industryLogo === "" || industryWebsite === "" || designIdeas === "" || specificDesignSize === "" || designInformation === "") {
            return toast.error('Please fill the all input!')
        }

        const data = {
            itemOne: industry,
            itemTwo: industryLogo,
            itemTwoAttachment: attachment1,
            itemThree: industryWebsite,
            itemFour: designIdeas,
            itemFourAttachment: attachment2,
            itemFive: specificDesignSize,
            itemSix: designInformation,
            itemSixAttachment: attachment3,
            orderId: id
        }

        createRequirements(data)
        .then(() => {
            toast.success('Requirements Saved!');

            if(cartItems?.data.length > 0) {
                return navigate('/cart');
            }
            else {
                return navigate('/customer-profile');
            }
        })
    };

    const handleAttachmentUpload = (image, setImagePercent, setAttachment) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setImagePercent(Math.round(progress));

        }, (error) => {
            // Handle any errors that occur during the upload.
            console.error(error);
        }, () => {
            // When the upload is complete, get the image URL.
            getDownloadURL(uploadTask.snapshot.ref).then(async (attachmentUrl) => {
                setAttachment(attachmentUrl);
            }).catch((error) => {
                // Handle any errors getting the download URL.
                console.error('Error getting download URL:', error);
            });
        });
    }

    const handleAttachment1Change = (e) => {
        handleAttachmentUpload(e.target.files[0], setImagePercent1, setAttachment1);
    };

    const handleAttachment2Change = (e) => {
        handleAttachmentUpload(e.target.files[0], setImagePercent2, setAttachment2);
    };

    const handleAttachment3Change = (e) => {
        handleAttachmentUpload(e.target.files[0], setImagePercent3, setAttachment3);
    };

    return (
        <div>
            <Container>
                <div className="grid grid-cols-9 gap-5 my-10">
                    <div className="col-span-7">
                        <h3 className='text-xl font-bold text-center'>Please fill in the answers to the questions below and attach the necessary files, <br /> so that we can create your design with your own information.</h3>
                        <p className='font-medium text-base text-center my-6'>If you skip this page, you must complete the "Project Requirements" page from the Project page. If you do not complete the Project Requirements page, your project will not start and your project's timer will not start.</p>
                        <div className='w-2/3 mx-auto'>
                            <div className='border border-gray-300 mb-10'>
                                <div className='bg-webPrimary text-center py-3'>
                                    <p className='text-white font-medium'>Project Requirements</p>
                                </div>
                                <div className='bg-[#F2F9FF] p-5'>
                                    <div className='space-y-10'>
                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>1.</span> Which industry do you work in?</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={industry}
                                                required
                                                onChange={(e) => setIndustry(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>2.</span> Do you have your own/Industry logo?</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={industryLogo}
                                                required
                                                onChange={(e) => setIndustryLogo(e.target.value)}
                                            ></textarea>

                                            {/* attachment */}
                                            {
                                                imagePercent1 ? <p className='text-green-500 font-semibold ml-2 text-sm'>{`Upload is ${imagePercent1}% done`}</p> : <>
                                                    <label htmlFor="attachment1" className="ml-2 text-sm cursor-pointer flex items-center gap-1">
                                                        Attachment <CgAttachment />
                                                    </label>
                                                    <input type="file" id="attachment1" className="hidden" onChange={handleAttachment1Change} />
                                                </>
                                            }
                                        </div>

                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>3.</span> Do you have your own/Industry website?</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={industryWebsite}
                                                required
                                                onChange={(e) => setIndustryWebsite(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>4.</span> Do you have any imaginary or specific design ideas?</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={designIdeas}
                                                required
                                                onChange={(e) => setDesignIdeas(e.target.value)}
                                            ></textarea>

                                            {/* attachment */}
                                            {
                                                imagePercent2 ? <p className='text-green-500 font-semibold ml-2 text-sm'>{`Upload is ${imagePercent2}% done`}</p> : <>
                                                    <label htmlFor="attachment2" className="ml-2 text-sm cursor-pointer flex items-center gap-1">
                                                        Attachment <CgAttachment />
                                                    </label>
                                                    <input type="file" id="attachment2" className="hidden" onChange={handleAttachment2Change} />
                                                </>
                                            }
                                        </div>

                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>5.</span> Do you have your specific design size?</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={specificDesignSize}
                                                required
                                                onChange={(e) => setSpecificDesignSize(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div>
                                            <p className='text-sm ml-2 font-semibold mb-2'><span className='text-webPrimary font-semibold'>6.</span> You have to give clear information that you need in the design. <br /> (E.g. all texts, all photos, logo, contact info, etc.)</p>
                                            <textarea
                                                className="border border-gray-300 outline-none px-3 py-2 w-full h-20 resize-none"
                                                placeholder="Type here"
                                                value={designInformation}
                                                required
                                                onChange={(e) => setDesignInformation(e.target.value)}
                                            ></textarea>

                                            {/* attachment */}
                                            {
                                                imagePercent3 ? <p className='text-green-500 font-semibold ml-2 text-sm'>{`Upload is ${imagePercent3}% done`}</p> : <>
                                                    <label htmlFor="attachment3" className="ml-2 text-sm cursor-pointer flex items-center gap-1">
                                                        Attachment <CgAttachment />
                                                    </label>
                                                    <input type="file" id="attachment3" className="hidden" onChange={handleAttachment3Change} />
                                                </>
                                            }
                                        </div>

                                        {/* Buttons */}
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <button
                                                onClick={() => navigate('/customer-profile')}
                                                className="w-full text-white text-xl font-semibold py-3 bg-gray-400 "
                                            >
                                                Skip
                                            </button>
                                            <button
                                                onClick={handleStartNowClick}
                                                className="w-full text-white text-xl font-semibold py-3 bg-webPrimary"
                                            >
                                                Start Now
                                            </button>
                                        </div>
                                    </div>

                                    <p className='text-center text-sm mt-6'>Start your project now by clicking "Start Now"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <HomeSidebar isTrue={false} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProjectRequirements;
