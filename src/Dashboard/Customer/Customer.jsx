import Container from "@/Pages/Shared/Container";
import React from "react";

const Customer = () => {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-3 gap-5 my-5 border-2 border-black">
          <div className="col-span-2 ">
            TopDesign
            <div className="text-gray-600">ContactHeader</div>
          </div>
          <div>Base</div>
        </div>
        {/* <div className="grid grid-cols-9 gap-5 my-5 border-2 border-black">
          <div className="col-span-7">TopDesign</div>
          <div className="col-span-2">HomeSidebar</div>
        </div> */}
      </Container>
    </div>
  );
};

export default Customer;
