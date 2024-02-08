import {
  useDeleteGigMutation,
  useGetGigsByIdQuery,
  useGetRelatedGigsByCategoryIdQuery,
} from "@/redux/features/gigs/gigsApi";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../Shared/Container";
import { useAddCartItemMutation, useDeleteGigFromCartMutation, useGetAllCartItemsQuery, useUpdateIsSelectedCartMutation } from "@/redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { useGetRoleByEmailQuery } from "@/redux/features/roleManage/roleApi";
import RelatedSlider from "@/components/RelatedSlider/RelatedSlider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BsThreeDots } from "react-icons/bs";

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import EditGigModal from "@/components/EditGigModal/EditGigModal";
import { Watermark } from '@hirohe/react-watermark';

const DesignDescription = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: role, isLoading: roleLoading } = useGetRoleByEmailQuery({ email });
  const { id } = useParams();
  const { data: gigData, isLoading } = useGetGigsByIdQuery(id);
  const categoryId = gigData?.data?.categoryId;
  const [addToCart] = useAddCartItemMutation();
  const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery(email);
  const [cartItemDelete] = useDeleteGigFromCartMutation();
  const [toggleSelected] = useUpdateIsSelectedCartMutation();
  const [isAdded, setIsAdded] = useState(false);
  const { data: relatedCategoriesGigs } = useGetRelatedGigsByCategoryIdQuery({ id, categoryId });
  const [deleteGig] = useDeleteGigMutation();
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    const added = cartItems?.data?.find(cart => cart?.gigsId === gigData?.data?.id);
    if (added) {
      setIsAdded(true);
    }
    else {
      setIsAdded(false);
    }
  }, [cartItems?.data, gigData?.data?.id]);

  const handleAddToCart = () => {

    if (role === "admin") {
      return toast.error('Opps.. You are admin!')
    }

    if (email) {
      const data = {
        customerEmail: email,
        gigsId: gigData?.data?.id,
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
          navigate('/customer-login', { state: { from: location } })
        }
      })
    }

  };

  if (cartIsLoading) {
    return <div>Loading...</div>
  }

  const handleStartProject = async (id) => {

    if (role === "admin") {
      return toast.error('Opps.. You are admin!')
    }

    if (email) {
      const data = {
        customerEmail: email,
        gigsId: id,
      };
      const res = await addToCart(data);
      const cartID = res?.data?.data?.id;
      const isSelected = await toggleSelected({ customerEmail: email, id: cartID })

      if (isSelected?.data?.data?.id) {
        navigate(`/start-project/${gigData?.data?.id}`)
      }
    } else {
      // Handle the case when the user is not logged in
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
  };

  // ===================>
  const handleDeleteButtonClick = (e, id) => {
    e.stopPropagation();
    handleItemDelete(id);
  };

  const handleItemDelete = (id) => {
    const deletedCartId = cartItems?.data?.find(cart => cart?.gigsId === id);
    cartItemDelete(deletedCartId?.id)
      .then(() => {
        toast.success('Deleted successfuly!')
      })
  };

  const handleGigDelete = async (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this gig?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => { // Mark the function as async
      if (result.isConfirmed) {
        const res = await deleteGig(id);
        if (res?.data?.status === 200) {
          Swal.fire({
            title: "Gig Deleted",
            text: "The gig has been successfully deleted.",
            icon: "success"
          });
          return navigate("/");
        }
      }
    });
  }

  return (
    <div className="mt-8">
      <div className="max-w-[1080px] px-[72px] mx-auto">

        {
          role === "admin" && <> <div className="flex justify-end">
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <BsThreeDots className="cursor-pointer mb-1" size={24} />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 top-6 divide-y divide-gray-100 rounded bg-white shadow">
                    <Menu.Item>
                      <button onClick={openModal} className="px-5 py-1 hover:bg-webPrimary hover:text-white w-full">Edit</button>
                    </Menu.Item>
                    <Menu.Item>
                      <button onClick={() => handleGigDelete(gigData?.data?.id)} className="px-5 py-1 hover:bg-webPrimary hover:text-white w-full">Delete</button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
            <EditGigModal isOpen={isOpen} closeModal={closeModal} gigData={gigData} />
          </>
        }

        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <Watermark text="MNTECH DIGITAL">
              <img
                className="w-[600px] h-[444px] object-cover"
                src={gigData?.data?.GigsImage[0]?.image}
                alt=""
              />
            </Watermark>
          </div>
          <div className="col-span-1">

            <div className="bg-[#F2F9FF] h-[444px] py-6 px-4">

              <div className="space-y-8">

                <div className="w-full h-full">
                  <span className="font-bold text-4xl line-clamp-2">
                    {gigData?.data?.title}
                  </span>
                </div>

                <div className="text-sm space-y-2">
                  <p className="text-base">
                    <span className="font-semibold">Size: </span>
                    {gigData?.data?.size}
                  </p>
                  <p className="text-base">
                    <span className="font-semibold">File format: </span>
                    {gigData?.data?.fileFormat}
                  </p>
                  <p className="text-base">
                    <span className="font-semibold">Category: </span>
                    {gigData?.data?.Category?.title}
                  </p>
                  <p className="text-base">
                    <span className="font-semibold">Subcategory: </span>
                    {gigData?.data?.Category?.SubCategory[0]?.title}
                  </p>
                </div>

                <div>

                  {
                    isAdded ? <button
                      onClick={(e) =>
                        handleDeleteButtonClick(e, gigData?.data?.id)}
                      className="w-full text-webPrimary font-medium border-2 border-webPrimary rounded-full py-1"
                    >
                      Remove to cart
                    </button> : <button
                      onClick={handleAddToCart}
                      className="w-full text-webPrimary font-medium border-2 border-webPrimary rounded-full py-1"
                    >
                      Add to cart
                    </button>
                  }



                  <button
                    onClick={() => handleStartProject(gigData?.data?.id)}
                    className="w-full text-white bg-webPrimary font-medium rounded-full py-1 mt-4"
                  >
                    Start project
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="my-5">
          <h2 className="text-2xl font-bold">{gigData?.data?.title}</h2>

          <p className="leading-relaxed my-5">{gigData?.data?.description}</p>

          <h3 className="text-xl font-bold">
            If you just want to get the template/source file of this design,
            then you can{" "}
            <Link className="underline" to="/contact">
              contact us by clicking here
            </Link>
            . And show us this design.
          </h3>
        </div>

        <div className="border"></div>

        {gigData?.data?.Tags.length > 0 && (
          <div className="flex flex-wrap gap-5 my-10">
            {gigData?.data?.Tags.map((tag, _idx) => (
              <div
                className="bg-[#FFEFEF] rounded-full px-3 text-center"
                key={_idx}
              >
                <p className="font-medium">{tag?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-red-50 pb-10">
        <Container>
          <h2 className="text-3xl text-blue-500 font-bold mb-5 text-center pt-10">Related Gigs</h2>
          <RelatedSlider gigs={relatedCategoriesGigs} />
        </Container>
      </div>
    </div>
  );
};

export default DesignDescription;
