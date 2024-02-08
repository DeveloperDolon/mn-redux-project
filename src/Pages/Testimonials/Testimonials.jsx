import React, { useState } from 'react';
import Container from '../Shared/Container';
import { useGetAllTestimonialsQuery, useGetAverageFiveStartToOneStartRatingQuery, useGetAverageRatingQuery, useGetRecentTestimonialsQuery, useGetRelevantTestimonialsQuery, useSearchByTestimonialsQuery } from '@/redux/features/testimonials/testimonialsApi';
import { Rating, Star } from '@smastrom/react-rating';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiOutlineSearch } from 'react-icons/ai';
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard';
import toast from 'react-hot-toast';

const Testimonials = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchText, setSearchText] = useState('');

    const { data: allTestimonials } = useGetAllTestimonialsQuery();
    const { data: averageRating } = useGetAverageRatingQuery();
    const { data: mostRelevantTestimonials } = useGetRelevantTestimonialsQuery();
    const { data: mostRecentTestimonials } = useGetRecentTestimonialsQuery();
    const { data: searchTestimonials } = useSearchByTestimonialsQuery(searchText);

    const { data: fiveToOneReviews } = useGetAverageFiveStartToOneStartRatingQuery();

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
            <Container>

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
                            <h4 className='font-medium text-2xl'>Average {averageRating?.data?._avg?.rating}</h4>

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
                                {
                                    searchTestimonials?.data ? searchTestimonials?.data?.map(testimonial => <TestimonialCard key={testimonial?.id} testimonial={testimonial} />) : allTestimonials?.data?.map(testimonial => <TestimonialCard key={testimonial?.id} testimonial={testimonial} />)
                                }
                            </TabsContent>
                            <TabsContent value="mostRelevant">
                                {
                                    mostRelevantTestimonials?.data?.map(testimonial => <TestimonialCard key={testimonial?.id} testimonial={testimonial} />)
                                }
                            </TabsContent>
                            <TabsContent value="mostRecent">
                                {
                                    mostRecentTestimonials?.data?.map(testimonial => <TestimonialCard key={testimonial?.id} testimonial={testimonial} />)
                                }
                            </TabsContent>
                            <TabsContent value="deliveryImage">
                                {
                                    allTestimonials?.data?.map(testimonial => <TestimonialCard key={testimonial?.id} testimonial={testimonial} />)
                                }
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Testimonials;