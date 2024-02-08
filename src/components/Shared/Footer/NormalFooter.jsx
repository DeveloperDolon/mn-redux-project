import Container from "@/pages/Shared/Container";
import React from "react";
import FooterTop from "@/components/Shared/Footer/FooterTop";
import FooterPayment from "./FooterPayment";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <div className="py-[32px] font-montserrat bg-[#0C0C0C]">
      <Container className="text-white">
        <FooterTop />
        <FooterPayment />
        <FooterBottom />
      </Container>
    </div>
  );
};

export default Footer;
