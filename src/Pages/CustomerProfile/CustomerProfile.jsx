import React, { Fragment, useState } from "react";
import Container from "../Shared/Container";
import userImage from "../../assets/user.png";
import { useSelector } from "react-redux";
import { useGetCustomerByIdQuery, useUpdateCustomerByIdMutation } from "@/redux/features/customer/customer";
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { Dialog, Transition } from '@headlessui/react'
import { TiSocialFacebookCircular, TiSocialGooglePlusCircular, TiSocialLinkedinCircular, TiSocialPinterestCircular, TiSocialTwitterCircular, TiSocialYoutubeCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { LiaYelp } from "react-icons/lia";
import { BiLogoTiktok } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { useGetOrderByCustomerIdQuery } from "@/redux/features/order/orderApi";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ProjectCard from "@/components/ProjectCard/ProjectCard";

const CustomerProfile = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(email);
  const [isOpen, setIsOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(customerData?.data?.description || '');
  const [updateDescription, { data, isSuccess }] = useUpdateCustomerByIdMutation();
  const { data: OrderData } = useGetOrderByCustomerIdQuery(customerData?.data?.id);

  const activeProjects = OrderData?.data.filter(singleOrder => singleOrder.status === "revision" || singleOrder.status === "ongoing" || singleOrder.status === "waiting" || singleOrder.status === "delivered");

  const completedProjects = OrderData?.data.filter(singleOrder => singleOrder.status === "completed");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    id,
    image,
    location,
    description,
    language,
    userName,
    address,
    country,
    city,
    number,
    industryName,
    CustomerSocialLink,
    createdAt,
  } = customerData.data;

  const createdAtDate = new Date(createdAt);
  const monthsAbbreviated = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthsAbbreviated[createdAtDate.getMonth()];
  const year = createdAtDate.getFullYear();

  const handleDescription = () => {

    const data = {
      description: editedDescription
    }

    updateDescription({ id, data })
      .then(() => {
        setIsOpen(false);
      })
  }

  return (
    <div className="my-10">
      <Container>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">

            <div className="bg-[#F2F9FF] border p-5">

              <div className="w-full flex flex-col items-center">

                {
                  image ? <img
                    className="w-36 h-36 rounded-full object-cover"
                    src={image}
                    alt=""
                  /> :
                    <Link to="/billing-address">
                      <img
                        className="w-36 h-36 rounded-full object-cover"
                        src={userImage}
                        alt=""
                      />
                    </Link>
                }

                <h4 className="font-bold my-4 text-base">{userName ? userName : <Link className="text-sm text-webPrimary underline" to="/billing-address">Add Here</Link>}</h4>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm">From</p>
                  {
                    country ? <h6 className="font-semibold text-sm">{country}</h6> : <Link className="text-sm text-webPrimary underline" to="/billing-address">Add Here</Link>
                  }
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Member Since</p>
                  <h6 className="font-semibold text-sm">{`${month}, ${year}`}</h6>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Language</p>
                  {
                    language ? <h6 className="font-semibold text-sm">{language}</h6> : <Link className="text-sm text-webPrimary underline" to="/billing-address">Add Here</Link>
                  }
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Status</p>
                  <h6 className="font-semibold text-sm">Online</h6>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Completed Projects</p>
                  <h6 className="font-semibold text-sm">5</h6>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Project Completion Rate</p>
                  <h6 className="font-semibold text-sm">100%</h6>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Avg. Rating</p>
                  <h6 className="font-semibold text-sm">4.9 Starts</h6>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Avg. Rating Given</p>
                  <h6 className="font-semibold text-sm">5 Starts</h6>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">Last project on</p>
                  <h6 className="font-semibold text-sm">May 27, 2023</h6>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="text-center">
                <p className="text-sm font-medium">Social Media Links</p>

                {
                  CustomerSocialLink?.length > 0 ? <div className="flex justify-center gap-3 items-center my-4">

                    {
                      CustomerSocialLink[0]?.facebookUrl && <Link to={CustomerSocialLink[0]?.facebookUrl}><TiSocialFacebookCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.instagramUrl && <Link to={CustomerSocialLink[0]?.instagramUrl}><FaInstagram className="text-2xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.linkedinUrl && <Link to={CustomerSocialLink[0]?.linkedinUrl}><TiSocialLinkedinCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.twitterUrl && <Link to={CustomerSocialLink[0]?.twitterUrl}><TiSocialTwitterCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.pinterestUrl && <Link to={CustomerSocialLink[0]?.pinterestUrl}><TiSocialPinterestCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.googleUrl && <Link to={CustomerSocialLink[0]?.googleUrl}><TiSocialGooglePlusCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.youtubeUrl && <Link to={CustomerSocialLink[0]?.youtubeUrl}><TiSocialYoutubeCircular className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.yelpUrl && <Link to={CustomerSocialLink[0]?.yelpUrl}><LiaYelp className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.tiktokUrl && <Link to={CustomerSocialLink[0]?.tiktokUrl}><BiLogoTiktok className="text-3xl" /></Link>
                    }
                    {
                      CustomerSocialLink[0]?.nextdoorUrl && <Link to={CustomerSocialLink[0]?.nextdoorUrl}><SiNextdotjs className="text-3xl" /></Link>
                    }

                  </div> :
                    <Link className="text-sm text-webPrimary underline" to="/social-media">Add Here</Link>
                }

              </div>

            </div>

            <div className="bg-[#F2F9FF] border p-5 mt-5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">Description</h4>
                <FiEdit className="cursor-pointer" onClick={() => setIsOpen(true)} />

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium ml-2 mb-3 leading-6 text-gray-900"
                            >
                              {description ? "Edit Description" : "Add Description"}
                            </Dialog.Title>
                            <div className="mt-2">
                              {/* Add textarea */}
                              <div className="mt-2">
                                <textarea
                                  className="w-full p-2 border outline-none rounded"
                                  placeholder="Type your description here..."
                                  value={editedDescription}
                                  onChange={(e) => setEditedDescription(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => setIsOpen(false)}
                              >
                                No, thanks!
                              </button>
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleDescription}
                              >
                                Save changes
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>

              <Separator className="my-4" />

              <div>
                {
                  description ? <p className="text-sm font-medium leading-relaxed">{description}</p> : <p className="text-sm">Click edit icon then add description</p>
                }
              </div>
            </div>

          </div>
          <div className="md:col-span-2">
            <div>
              <Tabs defaultValue="account">
                <TabsList className="flex justify-between items-center bg-transparent w-full">
                  <TabsTrigger className="data-[state=active]:underline text-black data-[state=active]:shadow-none text-2xl font-semibold" value="account">Active Projects</TabsTrigger>
                  <TabsTrigger className="text-2xl data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold" value="password">Completed Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="grid grid-cols-2 gap-5 my-10">
                    {
                      activeProjects?.map(singleProject => <ProjectCard key={singleProject?.id} singleProject={singleProject} />)
                    }
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="grid grid-cols-2 gap-5 my-10">
                    {
                      completedProjects?.map(singleProject => <ProjectCard key={singleProject?.id} singleProject={singleProject} />)
                    }
                  </div>
                </TabsContent>
              </Tabs>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerProfile;


{/* <div>
      <Container>
        <div className="grid grid-cols-10 gap-20 mt-10">
          <div className="col-span-3 sticky top-0">
            <div className="flex flex-col px-5 py-5 gap-5 bg-gray-100">
              <div className="w-full flex flex-col items-center">
                <img
                  className="w-40 h-40 rounded-full object-cover"
                  src={image ? image : userImage}
                  alt=""
                />
                <h2 className="font-bold pt-2 text-3xl">{userName}</h2>
              </div>
              <div className="h-[2px] rounded-lg bg-gray-300 px-3 w-full"></div>
              <div className="flex gap-3 flex-col">
                <div className="flex justify-between">
                  <span>From:</span>
                  <span className="font-semibold">{country}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <span className="font-semibold">{`${month}, ${year}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="font-semibold">{language}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-white bg-green-500 px-2 rounded-xl">
                    {"Online"}
                  </span>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div></div>
          </div>
          <div className="col-span-7 ">b</div>
        </div>
      </Container>
    </div> */}