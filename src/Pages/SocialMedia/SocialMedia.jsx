import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../Shared/Container';
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebookCircular, TiSocialGooglePlusCircular, TiSocialLinkedinCircular, TiSocialPinterestCircular, TiSocialTwitterCircular, TiSocialYoutubeCircular } from 'react-icons/ti';
import { LiaYelp } from "react-icons/lia";
import { BiLogoTiktok } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { useSelector } from 'react-redux';
import { useCreateCustomerSocialMediaMutation, useGetCustomerByIdQuery, useUpdateCustomerSocialMediaByIdMutation } from '@/redux/features/customer/customer';
import toast from 'react-hot-toast';

const SocialMedia = () => {
    const { email } = useSelector((state) => state.userSlice);
    const { data: customerData, isLoading } = useGetCustomerByIdQuery(email);
    const [createCustomerSocialMedia] = useCreateCustomerSocialMediaMutation();
    const [updateCustomerSocialMedia] = useUpdateCustomerSocialMediaByIdMutation();

    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [youtube, setYoutube] = useState('');
    const [pinterest, setPinterest] = useState('');
    const [google, setGoogle] = useState('');
    const [yelp, setYelp] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [nextdoor, setNextdoor] = useState('');

    useEffect(() => {
        if (!isLoading && customerData?.data?.CustomerSocialLink?.length > 0) {
            const socialMedia = customerData.data.CustomerSocialLink[0];

            setFacebook(socialMedia.facebookUrl || '');
            setTwitter(socialMedia.twitterUrl || '');
            setInstagram(socialMedia.instagramUrl || '');
            setLinkedin(socialMedia.linkedinUrl || '');
            setYoutube(socialMedia.youtubeUrl || '');
            setPinterest(socialMedia.pinterestUrl || '');
            setGoogle(socialMedia.googleUrl || '');
            setYelp(socialMedia.yelpUrl || '');
            setTiktok(socialMedia.tiktokUrl || '');
            setNextdoor(socialMedia.nextdoorUrl || '');
        }
    }, [customerData, isLoading]);


    if (isLoading) {
        return <div>Loading ...</div>
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (customerData?.data?.CustomerSocialLink?.length > 0) {
            const id = customerData.data.CustomerSocialLink[0].id;
            const data = {
                facebookUrl: facebook,
                twitterUrl: twitter,
                instagramUrl: instagram,
                linkedinUrl: linkedin,
                youtubeUrl: youtube,
                pinterestUrl: pinterest,
                googleUrl: google,
                yelpUrl: yelp,
                tiktokUrl: tiktok,
                nextdoorUrl: nextdoor,
            };

            updateCustomerSocialMedia({ id, data })
                .then(() => {
                    toast.success('Update Successfully!');
                });
        } else {
            const body = {
                facebookUrl: facebook,
                twitterUrl: twitter,
                instagramUrl: instagram,
                linkedinUrl: linkedin,
                youtubeUrl: youtube,
                pinterestUrl: pinterest,
                googleUrl: google,
                yelpUrl: yelp,
                tiktokUrl: tiktok,
                nextdoorUrl: nextdoor,
                customerId: customerData?.data?.id,
            };

            createCustomerSocialMedia(body)
                .then(() => {
                    toast.success('Added Successfully!');
                });
        }
    };

    return (
        <div className='font-montserrat my-10 w-3/5 mx-auto'>
            <Container>
                <div className='shadow'>
                    <div className='bg-[#1C91E4] px-5 py-4'>
                        <h4 className='text-white font-medium'>Social Media Links</h4>
                    </div>

                    <div className='p-5'>
                        <form onSubmit={(e) => onSubmit(e)}>

                            {/* Facebook Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="facebook" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Facebook</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialFacebookCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="facebook"
                                        name="facebook"
                                        placeholder="https://"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Instagram Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="instagram" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Instagram</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <FaInstagram className='text-gray-500 text-xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="instagram"
                                        name="instagram"
                                        placeholder="https://"
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* LinkedIn Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="linkedin" className="block mb-1 ml-2 text-xs md:text-sm font-medium">LinkedIn</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialLinkedinCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="linkedin"
                                        name="linkedin"
                                        placeholder="https://"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Twitter Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="twitter" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Twitter</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialTwitterCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="twitter"
                                        name="twitter"
                                        placeholder="https://"
                                        value={twitter}
                                        onChange={(e) => setTwitter(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Pinterest Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="pinterest" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Pinterest</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialPinterestCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="pinterest"
                                        name="pinterest"
                                        placeholder="https://"
                                        value={pinterest}
                                        onChange={(e) => setPinterest(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Google Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="google" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Google</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialGooglePlusCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="google"
                                        name="google"
                                        placeholder="https://"
                                        value={google}
                                        onChange={(e) => setGoogle(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* YouTube Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="youtube" className="block mb-1 ml-2 text-xs md:text-sm font-medium">YouTube</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <TiSocialYoutubeCircular className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="youtube"
                                        name="youtube"
                                        placeholder="https://"
                                        value={youtube}
                                        onChange={(e) => setYoutube(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Yelp Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="yelp" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Yelp</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <LiaYelp className='text-gray-500 text-2xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="yelp"
                                        name="yelp"
                                        placeholder="https://"
                                        value={yelp}
                                        onChange={(e) => setYelp(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* TikTok Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="tiktok" className="block mb-1 ml-2 text-xs md:text-sm font-medium">TikTok</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <BiLogoTiktok className='text-gray-500 text-xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="tiktok"
                                        name="tiktok"
                                        placeholder="https://"
                                        value={tiktok}
                                        onChange={(e) => setTiktok(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Nextdoor Field */}
                            <div className="mb-4 relative">
                                <label htmlFor="nextdoor" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Nextdoor</label>
                                <div className="flex items-center border border-gray-300">
                                    <div className='border-r p-2'>
                                        <SiNextdotjs className='text-gray-500 text-xl' />
                                    </div>
                                    <input
                                        type="text"
                                        id="nextdoor"
                                        name="nextdoor"
                                        placeholder="https://"
                                        value={nextdoor}
                                        onChange={(e) => setNextdoor(e.target.value)}
                                        className="w-full ml-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold w-2/4 py-2 rounded-full'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SocialMedia;
