import Footer from "@/Pages/Shared/Footer/Footer";
import Header from "@/Pages/Shared/Header/Header";
import Loading from "@/components/Loading/Loading";
import HomeFooter from "@/components/Shared/HomeFooter/HomeFooter";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { VscTriangleDown, VscTriangleLeft } from "react-icons/vsc";
import { PiDotsSixBold } from "react-icons/pi";
import Messenger from '../assets/socialicon/messenger.png';
import WhatsApp from '../assets/socialicon/whatsapp.png';
import Skype from '../assets/socialicon/skype.png';
import Gmail from '../assets/socialicon/gmail.png';
import Draggable from 'react-draggable';

const Root = () => {
  const [preloader, setPreloader] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to store x and y positions
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const inboxPage = location.pathname === "/inbox";
  const projectPage = location.pathname.includes("/project-page");

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setPreloader(false);
    }, 1600);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  if (preloader) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <Outlet />

      {/* <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        onDrag={handleDrag}
        grid={[25, 25]}
        scale={1}
      >
        <div>
          <div className="w-20 handle">
            {toggle ? (
              <div className="bg-[#F2F9FF] h-24 px-2 py-1 transition-all rounded-l-md duration-500 ease-in-out">
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
              </div>
            ) : null}

            <div className={`bg-webPrimary text-white h-24 ${toggle && "rounded-r-md"} transition-all duration-500 ease-in-out`}>
              <div className="flex flex-col justify-center items-center h-full">
                {toggle ? <VscTriangleLeft onClick={() => setToggle(!toggle)} className="cursor-pointer text-4xl transition-all duration-300 ease-in-out" /> : <VscTriangleDown onClick={() => setToggle(!toggle)} className="cursor-pointer text-4xl transition-all duration-300 ease-in-out" />}
                <PiDotsSixBold className="text-4xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </Draggable> */}

      {isHomePage ? (
        <HomeFooter />
      ) : inboxPage ? null : projectPage ? null : (
        <Footer />
      )}

      <div>
        <ScrollToTop
          style={{ borderRadius: "50%" }}
          width="20"
          height="20"
          smooth
        />
      </div>
    </div>
  );
};

export default Root;
