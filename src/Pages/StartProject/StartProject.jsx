import { useGetGigsByIdQuery } from '@/redux/features/gigs/gigsApi';
import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import HomeSidebar from '../Home/HomeSidebar/HomeSidebar';
import CheckoutCard from '@/components/CheckoutCard/CheckoutCard';
import { useGetSelectedCartGigsQuery } from '@/redux/features/cart/cartApi';
import { useSelector } from 'react-redux';

const StartProject = () => {

    const { email } = useSelector((state) => state.userSlice);
    const { id } = useParams();
    const { data: selectedData } = useGetSelectedCartGigsQuery(email);

    const singleData = selectedData?.data?.find(item => item.gigsId === id)

    return (
        <div>
            <Container>
                <div className="grid grid-cols-9 gap-5 my-5">
                    <div className="col-span-7">
                        <div className='w-2/3 mx-auto'>
                            <h2 className='text-2xl font-bold mb-8 mt-5 text-center'>Please select each step below carefully</h2>

                            {/* {
                                selectedData?.data.map((singleData, _idx) => (
                                    <CheckoutCard key={_idx} singleData={singleData} />
                                ))
                            } */}

                            <CheckoutCard singleData={singleData} />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <HomeSidebar />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StartProject;