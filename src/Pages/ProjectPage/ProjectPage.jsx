import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequirementsByProject from "@/components/RequirementsByProject/RequirementsByProject";
import { useSelector } from "react-redux";
import { useGetRoleByEmailQuery } from "@/redux/features/adminUser/adminUserApi";
import ReadProjectRequirements from "@/components/ReadProjectRequirements/ReadProjectRequirements";
import { useGetOrderByIdQuery } from "@/redux/features/order/orderApi";
import { add, format } from "date-fns";
import Activity from "./Activity/Activity";

const ProjectPage = () => {
  const { id } = useParams();
  const { email } = useSelector((state) => state.userSlice);
  const { data: role } = useGetRoleByEmailQuery({ email });

  const { data: orderData, isLoading } = useGetOrderByIdQuery(id);
  console.log(orderData);

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const createdAt = new Date(orderData?.data?.createAt);
      const deliveryDeadline = new Date(
        createdAt?.getTime() +
          orderData?.data?.deliveryTime * 24 * 60 * 60 * 1000
      );
      const now = new Date();
      const diff = deliveryDeadline - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [orderData]);



  return (
    <div className="mt-10">
      <div className="px-20 grid grid-cols-10 gap-10">
        <Tabs className="col-span-7" defaultValue="account">
          <TabsList className="flex items-center justify-start gap-5 bg-transparent w-full">
            <TabsTrigger
              className="uppercase data-[state=active]:text-[#1C91E4] data-[state=active]:underline text-black data-[state=active]:shadow-none text-xl font-semibold"
              value="account"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger
              className="uppercase text-xl data-[state=active]:text-[#1C91E4] data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold"
              value="password"
            >
              Project Requirements
            </TabsTrigger>
          </TabsList>
          <div className="border-b-2 shadow-sm mt-8"></div>
          <TabsContent value="account">
            <Activity id={id} />
          </TabsContent>
          <TabsContent value="password">
            {role === "admin" ? (
              <ReadProjectRequirements id={id} />
            ) : (
              <RequirementsByProject id={id} />
            )}
          </TabsContent>
        </Tabs>

        <aside className="flex flex-col gap-10 col-span-3 mr-16">
          <div className="bg-red-50 p-5">
            <h1 className="text-3xl font-semibold mb-3">
              Time left to deliver{" "}
            </h1>
            <div className="flex flex-col">
              <div className="flex w-full">
                <div className="flex w-full flex-col items-center p-4 border-2 border-blue-500">
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.days}</span>
                    <span>Days</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center p-4 border-2 border-blue-500">
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.hours}</span>
                    <span>Hours</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center p-4 border-2 border-blue-500">
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.minutes}</span>
                    <span>Minutes</span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center p-4 border-2 border-blue-500">
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.seconds}</span>
                    <span>Seconds</span>
                  </div>
                </div>
              </div>
              <button className="bg-blue-500 text-xl font-semibold py-2 text-white">
                Delivery Now
              </button>

              <div className="flex items-center justify-center pt-5 text-xl font-semibold">
                Extend Delivery Data
              </div>
            </div>
          </div>

          <div className="bg-red-50 flex gap-5 flex-col p-5">
            <h2 className="text-3xl font-semibold">Project Details</h2>
            <div className="grid grid-cols-3 items-center gap-3 p-5 border rounded-xl border-gray-400 bg-white">
              <div className="col-span-1">
                <img src={orderData?.data?.categoryImage} alt="" />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <h2 className="text-xl text-gray-600">
                  {orderData?.data?.category}
                </h2>
                <h3 className="text-xl font-semibold">
                  {orderData?.data?.status}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h2>Project by</h2>
                <h2>{orderData?.data?.customer?.name}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Quantity</h2>
                <h2>{orderData?.data?.quantity}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Duration</h2>
                <h2>{orderData?.data?.deliveryTime} Days</h2>
              </div>
              <div className="flex justify-between">
                <h2>Project Start</h2>
                <h2>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    format(new Date(orderData?.data?.createAt), "MMM d, h:mm a")
                  )}
                </h2>
              </div>
              <div className="flex justify-between">
                <h2>Project Delivery</h2>
                <h2>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    format(
                      add(new Date(orderData?.data?.createAt), {
                        days: orderData?.data?.deliveryTime,
                      }),
                      "MMM d, h:mm a"
                    )
                  )}
                </h2>
              </div>
              <div className="flex justify-between">
                <h2>Total Price</h2>
                <h2>${orderData?.data?.amount}</h2>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectPage;
