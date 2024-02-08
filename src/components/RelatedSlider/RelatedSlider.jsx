import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Watermark } from '@hirohe/react-watermark';

const RelatedSlider = ({ gigs }) => {

  // Generate unique IDs for navigation buttons
  const prevButtonId = `custom-prev-${Math.random().toString(36).substring(7)}`;
  const nextButtonId = `custom-next-${Math.random().toString(36).substring(7)}`;

  return (

    <div style={{ position: "relative" }}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {gigs?.data?.map((singlePortfolio, _idx) => (
          <SwiperSlide key={_idx}>
            <Link to={`/design-description/${singlePortfolio.id}`}>
              <div className="border border-gray-300 mt-2 bg-white">
                <Watermark text="MNTECH DIGITAL">
                  <img
                    className="w-full h-56 object-cover"
                    src={singlePortfolio?.GigsImage[0]?.image}
                    alt=""
                  />
                </Watermark>
                <p className="text-sm font-medium px-3 my-2">
                  {singlePortfolio?.title}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -left-[10px] top-1/2 transform -translate-y-1/2 z-10">
        <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${prevButtonId}`}>
          <MdNavigateBefore className="text-xl" />
        </button>
      </div>

      <div className="absolute -right-[10px] top-1/2 transform -translate-y-1/2 z-10">
        <button className={`custom-swiper-button bg-white border border-gray-300 rounded-full text-webPrimary ${nextButtonId}`}>
          <MdNavigateNext className="text-xl" />
        </button>
      </div>

    </div>
  );
};

export default RelatedSlider;
