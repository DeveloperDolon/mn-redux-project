import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Watermark } from '@hirohe/react-watermark';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const DesignSlider = ({ portfolio }) => {
  // Generate unique IDs for navigation buttons
  const prevButtonId = `custom-prev-${Math.random().toString(36).substring(7)}`;
  const nextButtonId = `custom-next-${Math.random().toString(36).substring(7)}`;

  console.log(portfolio);

  return (
    <div style={{ position: "relative" }}>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: `.${prevButtonId}`,
          nextEl: `.${nextButtonId}`,
        }}
        className="mySwiper"
      >
        {portfolio?.map((singlePortfolio, _idx) => (
          <SwiperSlide key={_idx}>
            <Link to={`/design/${singlePortfolio.id}`}>
              <div className="border border-gray-300 mt-2">
                <Watermark text="MNTECH DIGITAL">
                  <img
                    className="w-full h-56 object-cover"
                    src={singlePortfolio?.image}
                    alt=""
                  />
                </Watermark>
                <p data-tooltip-id="my-tooltip" className=" text-sm font-medium px-3 line-clamp-2 my-2">
                  {singlePortfolio?.name}
                </p>
                <ReactTooltip
                  id="my-tooltip"
                  content={singlePortfolio?.name}
                />
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

export default DesignSlider;
