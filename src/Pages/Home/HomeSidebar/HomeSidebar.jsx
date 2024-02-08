import React, { useState } from "react";
import AdobeStock from "../../../assets/HomeSidebar/AdobeStock.svg";
import ShutterStock from "../../../assets/HomeSidebar/ShutterStock.svg";
import iStock from "../../../assets/HomeSidebar/iStock.png";
import RF123 from "../../../assets/HomeSidebar/RF123.png";
import Getty from "../../../assets/HomeSidebar/Getty.png";
import Deposit from "../../../assets/HomeSidebar/Deposit.png";
import Vectezzy from "../../../assets/HomeSidebar/Vectezzy.png";
import Dreamstime from "../../../assets/HomeSidebar/Dreamstime.png";
import Alamy from "../../../assets/HomeSidebar/Alamy.png";
import { Link } from "react-router-dom";
import { VscTriangleDown, VscTriangleLeft } from "react-icons/vsc";
import { PiDotsSixBold } from "react-icons/pi";

import Messenger from '../../../assets/socialicon/messenger.png';
import WhatsApp from '../../../assets/socialicon/whatsapp.png';
import Skype from '../../../assets/socialicon/skype.png';
import Gmail from '../../../assets/socialicon/gmail.png';

const HomeSidebar = ({ isTrue }) => {

  const [toggle, setToggle] = useState(true);

  return (
    <div>
      {isTrue && (
        <div className="bg-[#F2F9FF] rounded-lg border border-webPrimary p-5">
          <h5 className="text-lg font-bold text-black border-b border-webPrimary pb-2">
            Mahfuzurrahm535
          </h5>

          <div className="my-3">
            <p className="font-medium mb-1">Avg. Response Time</p>
            <span className="font-bold">1 Hour</span>
          </div>

          <div className="mb-3">
            <p className="font-medium mb-1">Avg. Rating</p>
            <span className="font-bold">5 Stars</span>
          </div>

          <div className="mb-3">
            <p className="font-medium mb-1">On-time Delivery</p>
            <span className="font-bold">100%</span>
          </div>

          <div>
            <p className="font-medium mb-1">Avg. Selling Price</p>
            <span className="font-bold">$32.55</span>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-lg border border-webPrimary">
        <div className="bg-webPrimary text-white rounded-lg border text-center">
          <p className="p-2 text-sm leading-relaxed">
            We have added links to some stock image sites below. You can choose
            images from any of the sites linked below for your design.
          </p>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={AdobeStock}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={ShutterStock}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] object-cover rounded-t-md border border-gray-300"
            src={iStock}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={RF123}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={Getty}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-2 object-cover rounded-t-md border border-gray-300"
            src={Deposit}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={Vectezzy}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={Dreamstime}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>

        <div className="p-1">
          <img
            className="w-full h-[120px] p-5 object-contain rounded-t-md border border-gray-300"
            src={Alamy}
            alt=""
          />

          <div className="text-center rounded-b-md bg-gray-500 text-white py-2">
            <Link>Click Here</Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center my-10">

        {toggle ? <div className="bg-[#F2F9FF] h-24 px-2 py-1 transition-all rounded-l-md duration-500 ease-in-out">
          <div className="flex justify-center items-center flex-col h-full">
            <div className="py-2">
              <p className="text-xs">You can only send text messages</p>
            </div>

            <div className="flex justify-between gap-3 items-center mt-1">
              <div className="w-8 h-8 border-2 border-[#7159A3] p-2 rounded-full">
                <Link target="_blank" to="https://www.facebook.com/messages/t"><img className="w-full" src={Messenger} alt="" /></Link>
              </div>

              <div className="w-8 h-8 border-2 border-[#27A436] p-2 rounded-full">
                <Link><img src={WhatsApp} alt="" /></Link>
              </div>

              <div className="w-8 h-8 border-2 border-[#36AFE1] p-2 rounded-full">
                <Link><img src={Skype} alt="" /></Link>
              </div>

              <div className="w-8 h-8 border-2 border-[#E83F3A] p-2 rounded-full">
                <Link><img src={Gmail} alt="" /></Link>
              </div>
            </div>
          </div>
        </div> : <div></div>}

        <div className={`bg-webPrimary text-white h-24 ${toggle && "rounded-r-md"} transition-all duration-500 ease-in-out`}>
          <div className="flex flex-col justify-center items-center h-full">
            {toggle ? <VscTriangleLeft onClick={() => setToggle(!toggle)} className="cursor-pointer text-4xl transition-all duration-300 ease-in-out" /> : <VscTriangleDown onClick={() => setToggle(!toggle)} className="cursor-pointer text-4xl transition-all duration-300 ease-in-out" />}
            <PiDotsSixBold className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
