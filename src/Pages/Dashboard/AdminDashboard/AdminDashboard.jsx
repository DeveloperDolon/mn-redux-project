import Container from '@/Pages/Shared/Container';
import AdminSidebarAnalytics from '@/components/Dashboard/AdminSidebarAnalytics/AdminSidebarAnalytics';
import OrderItemCard from '@/components/Dashboard/OrderItemCard/OrderItemCard';
import { useGetActiveAllOrdersQuery, useGetActiveOrdersQuery, useGetAllOrdersQuery, useGetCancelledOrdersQuery, useGetCompletedOrdersQuery, useGetDeliveredOrdersQuery, useGetOngoingOrdersQuery, useGetRevisionOrdersQuery, useGetWaitingOrdersQuery } from '@/redux/features/order/orderApi';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const AdminDashboard = () => {

  const [searchInput, setSearchInput] = useState("");
  const [visitors, setVisitors] = useState(0);
  const [customers, setCustomers] = useState("Today");

  const { data: allOrders, isLoading } = useGetAllOrdersQuery();
  const { data: activeAllOrders } = useGetActiveAllOrdersQuery();
  const { data: activeOrders } = useGetActiveOrdersQuery();
  const { data: revisionOrders } = useGetRevisionOrdersQuery();
  const { data: ongoingOrders } = useGetOngoingOrdersQuery();
  const { data: waitingOrders } = useGetWaitingOrdersQuery();
  const { data: deliveredOrders } = useGetDeliveredOrdersQuery();
  const { data: completedOrders } = useGetCompletedOrdersQuery();
  const { data: cancelledOrders } = useGetCancelledOrdersQuery();
  const [fetchOrders, setFetchOrders] = useState([]);

  useEffect(() => {
    if (allOrders) {
      setFetchOrders(allOrders?.data)
    }
  }, [allOrders])

  // Function to handle active projects select change
  const handleSort = (event) => {

    const status = event.target.value;

    if (status === "Active") {
      setFetchOrders(activeOrders?.data)
    } else if (status === "Revision") {
      setFetchOrders(revisionOrders?.data);
    } else if (status === "Ongoing") {
      setFetchOrders(ongoingOrders?.data)
    } else if (status === "Waiting") {
      setFetchOrders(waitingOrders?.data)
    } else if (status === "Delivered") {
      setFetchOrders(deliveredOrders?.data)
    } else if (status === "Completed") {
      setFetchOrders(completedOrders?.data)
    } else if (status === "Canceled") {
      setFetchOrders(cancelledOrders?.data)
    }

  };

  // Function to handle all times select change
  const handleVisitorsChange = event => {

    const status = event.target.value;

    if (status === "All Times") {
      const randomVisitors = Math.floor(Math.random() * 5) + 1;
      setVisitors(randomVisitors);
    }
  };

  // Function to handle all times select change
  const handleCustomersChange = event => {
    setCustomers(event.target.value);
    console.log(event.target.value);
  };

  // Function to handle input change
  const handleInputChange = event => {
    setSearchInput(event.target.value);
  };

  // Function to handle search icon click
  const handleSearchClick = () => {
    console.log("Search Input:", searchInput); // Log the search input value
  };

  return (
    <div className="my-10">
      <Container>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            {/* Search Bar Start */}
            <div className="flex justify-between items-center border shadow p-5">
              <h4 className="text-lg font-bold text-webPrimary">
                Active Project - {activeAllOrders?.others?.totalOrders} (${activeAllOrders?.others?.totalSum})
              </h4>

              {/* Select Active Projects Option */}
              <select className='border text-base font-medium outline-none px-5 py-1' onChange={handleSort}>
                <option value="Active">Active Projects (12)</option>
                <option value="Revision">Revision ({revisionOrders?.others?._count})</option>
                <option value="Ongoing">Ongoing ({ongoingOrders?.others?._count})</option>
                <option value="Waiting">Waiting ({waitingOrders?.others?._count})</option>
                <option value="Delivered">Delivered ({deliveredOrders?.others?._count})</option>
                <option value="Completed">Completed ({deliveredOrders?.others?._count})</option>
                <option value="Canceled">Canceled ({cancelledOrders?.others?._count})</option>
              </select>
            </div>
            {/* Search Bar End */}

            <div className='my-5'>
              {
                fetchOrders && fetchOrders?.map((order) => (
                  <OrderItemCard key={order?.id} order={order} />
                ))
              }
            </div>
          </div>
          <div>
            <div className='bg-[#F2F9FF] p-5'>
              <h5 className='text-lg font-semibold text-webPrimary border-b border-webPrimary pb-2'>This Month</h5>

              <div className="flex justify-between items-center mt-3">
                <p className="font-medium">Completed Projects</p>
                <span className="font-bold">{deliveredOrders?.others?._count}</span>
              </div>

              <div className="flex justify-between items-center my-2">
                <p className="font-medium">Earnings</p>
                <span className="font-bold">${deliveredOrders?.others?._sum?.amount}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Cancelled Projects</p>
                <span className="font-bold">{cancelledOrders?.others?._count} (${cancelledOrders?.others?._sum?.amount})</span>
              </div>
            </div>

            <AdminSidebarAnalytics />

            {/* Search Bar Start */}
            <div className="bg-[#F2F9FF] p-5 mt-5">
              <h5 className="text-lg font-semibold text-webPrimary">
                Search Project
              </h5>

              {/* Input for search */}
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  className="border rounded-sm px-3 py-2 outline-none w-full"
                  placeholder="Type Project Number"
                  value={searchInput}
                  onChange={handleInputChange}
                />
                {/* Background color for the search icon */}
                <span
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleSearchClick}
                >
                  <div className="bg-blue-500 rounded-sm text-white p-3">
                    <AiOutlineSearch />
                  </div>
                </span>
              </div>
            </div>

            {/* Visitors */}
            <div className="bg-[#FEF0F0] p-5 mt-5">
              <div className="flex justify-between items-center border-b border-webPrimary pb-2">
                <h5 className="text-lg font-semibold text-webPrimary">
                  New Visitors
                </h5>

                {/* Select All Times Option */}
                <select
                  className="border text-sm font-medium outline-none"
                  onChange={handleVisitorsChange}
                >
                  <option value="Today">Today</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="This Year">This Year</option>
                  <option value="2022">2023</option>
                  <option value="2021">2022</option>
                  <option value="All Times">All Times</option>
                </select>
              </div>

              <div className="flex justify-center items-center h-16 mt-5">
                <span className="text-3xl font-bold">{visitors}</span>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-[#F2F9FF] p-5 mt-5">
              <div className="flex justify-between items-center border-b border-webPrimary pb-2">
                <h5 className="text-lg font-semibold text-webPrimary">
                  Customers
                </h5>

                {/* Select All Times Option */}
                <select
                  className="border text-sm font-medium outline-none"
                  value={customers}
                  onChange={handleCustomersChange}
                >
                  <option value="Today">Today</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="This Year">This Year</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="All Times">All Times</option>
                </select>
              </div>

              <div>
                Customer
              </div>

            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
