import React from "react";
import { Link } from "react-router-dom";

const GigCard = ({data}) => {
  console.log(data)
  return (
    <Link
      to={`/design-description/${data.id}`}
      key={data.id}
      className="border border-gray-300 shadow"
    >
      <div className="w-full h-60">
        {data?.GigsImage && (
          <img
            src={data?.GigsImage[0]?.image}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h2 className="px-3 line-clamp-2 font-medium mt-3">
        {data?.title}
      </h2>
    </Link>
  );
};

export default GigCard;
