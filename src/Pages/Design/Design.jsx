import { useGetSubFolderByIdQuery } from '@/redux/features/folder/folderApi';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../Shared/Container';
import { useSelector } from 'react-redux';
import { useGetRoleByEmailQuery } from '@/redux/features/adminUser/adminUserApi';
import { useAddCartItemMutation, useDeleteGigFromCartMutation, useGetAllCartItemsQuery } from '@/redux/features/cart/cartApi';
import { GiShoppingCart } from "react-icons/gi";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Watermark } from '@hirohe/react-watermark';

const Design = () => {

    const { id } = useParams();
    const { data: folderData, isLoading } = useGetSubFolderByIdQuery(id);
    const { email } = useSelector((state) => state.userSlice);
    const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery(email);
    const { data: role } = useGetRoleByEmailQuery({ email });
    const [addToCart] = useAddCartItemMutation();
    const [cartItemDelete] = useDeleteGigFromCartMutation();
    const navigate = useNavigate();

    const handleAddToCart = (id) => {

        if (role === "admin") {
            return toast.error('Opps.. You are admin!')
        }

        if (email) {
            const data = {
                customerEmail: email,
                gigsId: id,
            };
            addToCart(data)
                .then(() => {
                    toast.success('Added to cart!')
                })
        }
        else {

            Swal.fire({
                title: 'Please Sign Up',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign Up Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/authentication', { state: { from: location } })
                }
            })
        }
    }

    const handleRemovetoCart = (id) => {
        console.log(id);
        const deletedCartId = cartItems?.data?.find(cart => cart?.gigsId === id);
        cartItemDelete(deletedCartId?.id)
            .then(() => {
                toast.success('Deleted successfuly!')
            })
    }

    return (
        <div>
            <Container>
                <div className="flex justify-end mt-6 mb-5">
                    <div className="w-3/4 flex items-center justify-between gap-10">
                        <div>
                            <h2 className="font-semibold text-2xl">
                                Click on the design you need to see more designs.
                            </h2>
                        </div>
                        {
                            role === "admin" && <div>
                                <button onClick={() => navigate(`/customise/${id}`)} className="border border-webPrimary rounded-xl px-5 font-medium">
                                    Customise
                                </button>
                            </div>
                        }
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-5 mb-10">
                    {folderData?.data?.Gigs.map((singleData, _idx) => (
                        <div key={_idx} className="border border-gray-300 relative">
                            <Link to={`/design-description/${singleData.id}`}>
                                <Watermark text="MNTECH DIGITAL">
                                    <img
                                        className="w-full h-52 object-cover"
                                        src={singleData?.GigsImage[0]?.image}
                                        alt=""
                                    />
                                    <p className="text-sm font-medium px-3 my-2">
                                        {singleData?.title}
                                    </p>
                                </Watermark>
                            </Link>

                            <div className="absolute top-2 right-2">

                                {
                                    cartItems?.data?.find(cart => cart?.gigsId === singleData.id) ? <GiShoppingCart onClick={() => handleRemovetoCart(singleData.id)} className='cursor-pointer bg-green-600 text-white p-1 rounded' size={28} /> : <GiShoppingCart onClick={() => handleAddToCart(singleData.id)} className='cursor-pointer bg-white p-1 rounded' size={28} />
                                }

                            </div>
                        </div>
                    ))}
                </div>
            </Container >
        </div >
    );
};

export default Design;