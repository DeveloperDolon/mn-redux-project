import { useGetAllTestimonialsQuery, useGetAverageFiveStartToOneStartRatingQuery, useGetAverageRatingQuery, useGetRecentTestimonialsQuery, useGetRelevantTestimonialsQuery, useSearchByTestimonialsQuery } from '@/redux/features/testimonials/testimonialsApi';
import { Rating, Star } from '@smastrom/react-rating';
import React, { useRef, useState } from 'react';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import { AiOutlineSearch } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const HomeTestimonials = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchText, setSearchText] = useState('');

    const { data: allTestimonials } = useGetAllTestimonialsQuery();
    const { data: averageRating } = useGetAverageRatingQuery();
    const { data: mostRelevantTestimonials } = useGetRelevantTestimonialsQuery();
    const { data: mostRecentTestimonials } = useGetRecentTestimonialsQuery();
    const { data: searchTestimonials } = useSearchByTestimonialsQuery(searchText);

    const { data: fiveToOneReviews } = useGetAverageFiveStartToOneStartRatingQuery();

    const navigate = useNavigate();

    const prevButtonId = `custom-prev-${Math.random().toString(36).substring(7)}`;
    const nextButtonId = `custom-next-${Math.random().toString(36).substring(7)}`;

    const handleSearch = () => {

        if (searchTerm === "") {
            return toast.error('Please seach input!')
        }

        setSearchText(searchTerm);
        setSearchTerm("");
    };

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#1781CB',
        inactiveFillColor: '#C8E3F6'
    }

    return (
        <div className='my-10'>

            <div className='flex justify-center items-center -mb-6'>
                <div className='py-2 px-5 bg-[#FFEFEF] rounded-full'>
                    <h2 className='text-3xl uppercase font-bold'>Testimonials</h2>
                </div>
            </div>

            <div className='bg-[#E7F4FC] p-8 rounded-md'>

                <div className='flex justify-between items-center'>
                    <div>
                        <h4 className='font-semibold text-2xl'>{allTestimonials?.data?.length} Reviews</h4>
                    </div>
                    <div className='flex justify-between items-center gap-3'>
                        <h4 className='font-medium text-2xl'>Average {averageRating?.data?._avg?.rating?.toFixed(1)}</h4>

                        <Rating
                            style={{ maxWidth: 130 }}
                            value={averageRating?.data?._avg?.rating}
                            itemStyles={myStyles}
                            readOnly
                        />

                    </div>
                </div>

                <div className='grid grid-cols-5 gap-4 my-5'>

                    <div className='bg-white rounded-md p-5 text-center'>
                        <h6 className='font-bold'>1 Stars</h6>
                        <div className='flex justify-center items-center my-1'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={1}
                                itemStyles={myStyles}
                                readOnly
                            />
                        </div>
                        <p className='font-medium'>({fiveToOneReviews?.data?.oneStartRating})</p>
                    </div>

                    <div className='bg-white rounded-md p-5 text-center'>
                        <h6 className='font-bold'>2 Stars</h6>
                        <div className='flex justify-center items-center my-1'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={2}
                                itemStyles={myStyles}
                                readOnly
                            />
                        </div>
                        <p className='font-medium'>({fiveToOneReviews?.data?.twoStartRating})</p>
                    </div>

                    <div className='bg-white rounded-md p-5 text-center'>
                        <h6 className='font-bold'>3 Stars</h6>
                        <div className='flex justify-center items-center my-1'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={3}
                                itemStyles={myStyles}
                                readOnly
                            />
                        </div>
                        <p className='font-medium'>({fiveToOneReviews?.data?.threeStartRating})</p>
                    </div>

                    <div className='bg-white rounded-md p-5 text-center'>
                        <h6 className='font-bold'>4 Stars</h6>
                        <div className='flex justify-center items-center my-1'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={4}
                                itemStyles={myStyles}
                                readOnly
                            />
                        </div>
                        <p className='font-medium'>({fiveToOneReviews?.data?.fourStartRating})</p>
                    </div>

                    <div className='bg-white rounded-md p-5 text-center'>
                        <h6 className='font-bold'>5 Stars</h6>
                        <div className='flex justify-center items-center my-1'>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={5}
                                itemStyles={myStyles}
                                readOnly
                            />
                        </div>
                        <p className='font-medium'>({fiveToOneReviews?.data?.fiveStartRating})</p>
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="allTestimonials" className="w-full">
                        <TabsList className="flex justify-between items-center bg-transparent">
                            <TabsTrigger className="text-xl text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-gray-400 py-1" value="allTestimonials">Sort By</TabsTrigger>
                            <TabsTrigger className="text-xl text-black data-[state=active]:bg-[#FFEFEF] data-[state=active]:shadow-none data-[state=active]:border-gray-400 py-1 border border-transparent" value="mostRelevant">Most Relevant</TabsTrigger>
                            <TabsTrigger className="text-xl text-black data-[state=active]:bg-[#FFEFEF] data-[state=active]:shadow-none data-[state=active]:border-gray-400 py-1 border border-transparent" value="mostRecent">Most Recent</TabsTrigger>
                            <TabsTrigger className="text-xl text-black data-[state=active]:bg-[#FFEFEF] data-[state=active]:shadow-none data-[state=active]:border-gray-400 py-1 border border-transparent" value="deliveryImage">Delivery Image (23)</TabsTrigger>
                            <div className='flex items-center'>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-3 py-2 w-full rounded-md border-gray-300 outline-none"
                                    />
                                    <div className="absolute bg-blue-500 rounded-md right-1">
                                        <button
                                            className="p-2 text-white"
                                            onClick={handleSearch}
                                        >
                                            <AiOutlineSearch size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabsList>
                        <TabsContent value="allTestimonials">
                            <div style={{ position: "relative" }}>

                                <Swiper navigation={{
                                    prevEl: `.${prevButtonId}`,
                                    nextEl: `.${nextButtonId}`,
                                }} spaceBetween={30} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} modules={[Autoplay, Navigation]} className="mySwiper">
                                    {
                                        searchTestimonials?.data ? searchTestimonials?.data?.map(testimonial => <SwiperSlide key={testimonial?.id}><TestimonialCard isPadding={true} testimonial={testimonial} /></SwiperSlide>) : allTestimonials?.data?.map(testimonial => <SwiperSlide key={testimonial?.id}><TestimonialCard isPadding={true} testimonial={testimonial} /></SwiperSlide>)
                                    }
                                </Swiper>

                                <div className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${prevButtonId}`}>
                                        <MdNavigateBefore className="text-3xl" />
                                    </button>
                                </div>

                                <div className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${nextButtonId}`}>
                                        <MdNavigateNext className="text-3xl" />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="mostRelevant">

                            <div style={{ position: "relative" }}>

                                <Swiper navigation={{
                                    prevEl: `.${prevButtonId}`,
                                    nextEl: `.${nextButtonId}`,
                                }} spaceBetween={30} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} modules={[Autoplay, Navigation]} className="mySwiper">
                                    {
                                        mostRelevantTestimonials?.data?.map(testimonial => <SwiperSlide key={testimonial?.id}><TestimonialCard isPadding={true} testimonial={testimonial} /></SwiperSlide>)
                                    }
                                </Swiper>

                                <div className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${prevButtonId}`}>
                                        <MdNavigateBefore className="text-3xl" />
                                    </button>
                                </div>

                                <div className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${nextButtonId}`}>
                                        <MdNavigateNext className="text-3xl" />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="mostRecent">

                            <div style={{ position: "relative" }}>

                                <Swiper navigation={{
                                    prevEl: `.${prevButtonId}`,
                                    nextEl: `.${nextButtonId}`,
                                }} spaceBetween={30} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} modules={[Autoplay, Navigation]} className="mySwiper">
                                    {
                                        mostRecentTestimonials?.data?.map(testimonial => <SwiperSlide key={testimonial?.id}><TestimonialCard isPadding={true} testimonial={testimonial} /></SwiperSlide>)
                                    }
                                </Swiper>

                                <div className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${prevButtonId}`}>
                                        <MdNavigateBefore className="text-3xl" />
                                    </button>
                                </div>

                                <div className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${nextButtonId}`}>
                                        <MdNavigateNext className="text-3xl" />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="deliveryImage">

                            <div style={{ position: "relative" }}>

                                <Swiper navigation={{
                                    prevEl: `.${prevButtonId}`,
                                    nextEl: `.${nextButtonId}`,
                                }} spaceBetween={30} loop={true} autoplay={{ delay: 2500, disableOnInteraction: false }} modules={[Autoplay, Navigation]} className="mySwiper">
                                    {
                                        allTestimonials?.data?.map(testimonial => <SwiperSlide key={testimonial?.id}><TestimonialCard isPadding={true} testimonial={testimonial} /></SwiperSlide>)
                                    }
                                </Swiper>

                                <div className="absolute -left-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${prevButtonId}`}>
                                        <MdNavigateBefore className="text-3xl" />
                                    </button>
                                </div>

                                <div className="absolute -right-[45px] top-1/2 transform -translate-y-1/2 z-10">
                                    <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${nextButtonId}`}>
                                        <MdNavigateNext className="text-3xl" />
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>

            <div className='flex justify-end -mt-5'>
                <button onClick={() => navigate('/testimonials')} className='bg-webPrimary mr-5 text-white px-4 rounded-full flex justify-between items-center gap-1'>See all <MdKeyboardDoubleArrowRight /></button>
            </div>
        </div>
    );
};

export default HomeTestimonials;