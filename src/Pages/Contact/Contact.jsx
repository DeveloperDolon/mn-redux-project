import React from "react";

import ContactHeader from "./ContactHeader";
import ContactFrom from "./ContactFrom";

const Contact = () => {
  return (
    <div className="flex justify-center flex-col items-center my-6 w-full">
      <ContactHeader />
      <div className="w-1/2">
        <ContactFrom />
      </div>
    </div>
  );
};

export default Contact;
