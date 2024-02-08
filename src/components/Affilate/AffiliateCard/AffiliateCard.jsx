import React from "react";
import Top from "../Top/Top";
import Middle from "../Middle/Middle";

const AffiliateCard = () => {
  return (
    <div className="grid grid-cols-3 w-full">
      <div className="col-span-2 p-4 m-4 ">
        <Top />
        <Middle />
      </div>

      <div className="px-10 py-5 m-4 bg-[#F2F9FF]">
        <ul className="list-disc space-y-5">
          <li className="text-sm text-justify">You must first create a link to start
            working as an affiliate, you can create the link with the URL of any page of our
            Bank Balance Payment Withdraw website, (try to create the link with the URL of the home page or any design), You will create your affiliate link from this
            page with that URL.
          </li>

          <li className="text-sm text-justify">You can share this affiliate link with your friends or relatives or bring new clients by
            sharing this link on your social media or your website.
          </li>

          <li className="text-sm text-justify">Your friends or relatives or any of your clients should come to our website through the affiliate link you have created, and sign up, then $5 will be added to your affiliate profile as soon as the client purchases something from our website.
          </li>

          <li className="text-sm text-justify">If any client comes through your link, that client must sign up on our website within 30 days of his first click and must purchase something.</li>
        </ul>
      </div>
    </div>
  );
};

export default AffiliateCard;
