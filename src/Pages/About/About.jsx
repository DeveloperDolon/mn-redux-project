import React from "react";
import Container from "../Shared/Container";
import { Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
const About = () => {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <Container>
        <div className="font-montserrat leading-loose">
          <div className="mb-10">
            <h2 className="text-[#1C91E4] text-4xl mb-5 font-bold">About</h2>
            <p>
              What design are you looking for today? Home Messages Notifications
              Contact Join Dashboard Designs Companies Price List Project About
              About We are a team of graphic designers. We are located in
              Sylhet, Bangladesh. We have worked with many online marketplaces
              since 2016 with graphics design. And we've been successful in
              those marketplaces. Now we have created this site in 2023. We want
              to help many businesses worldwide improve their business through
              marketing design based on our experience.
            </p>
          </div>

          <div className="mb-10">
            <h4 className="text-[#1C91E4] text-xl mb-5 font-semibold">
              What kind of designs do we like to create?
            </h4>

            <div className="border-l-2 border-[#0E97A1] pl-10">
              <p className="mb-5">
                We like to create all kinds of business advertising designs.
                Print design and social media post design. Most of the designs
                we create.
              </p>

              <ul className="grid font-montserrat grid-cols-2 gap-1 mt-1">
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Door Hanger Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Postcard Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Flyer Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Rack Card Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Poster Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Business Card Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Brochure Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Social Media Post Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Facebook Cover Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Billboard Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Yard Sign Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Roll-up Banner Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Sidewalk Sign Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Trade Show Banner Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Menu Design </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Magazine Cover Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Magazine Ads Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">Book Cover Design</span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">
                    Podcast Cover Design
                  </span>
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="text-[#1C91E4] mr-2" />
                  <span className="font-medium text-md">And Much More</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-[#1C91E4] text-xl mb-5 font-semibold">
              Why should you choose us for your design?
            </h4>

            <div className="border-l-2 border-[#0E97A1] pl-10">
              <p>
                We create every design for a specific business. Due to this the
                contents of each of our designs are of the right quality. After
                the business owners/customers see our designs, they no longer
                have to worry about the content of the designs. The business
                owner/customer can choose any design from the many designs
                created by us and easily edit that design with their own
                information through us. Or the business owner/customer can
                create a new design through us with some ideas from these
                designs. Also, if the business owner/customer already has a
                design idea of his own. However, we make designs according to
                their own ideas.
              </p>

              <p className="my-10">
                (
                <Link
                  className="text-blue-500 font-semibold underline"
                  to="/designs"
                >
                  Click here
                </Link>
                to see which businesses we have already created designs for.)
              </p>
              <p>
                Also, we can design for any business other than the businesses
                we have already designed for. For that, the business
                owner/customer must give us their design information.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[#1C91E4] text-xl mb-5 font-semibold">
              What are our future plans?
            </h4>

            <div className="border-l-2 border-[#0E97A1] pl-10">
              <p>
                Our main goal is to create advertising designs for different
                types of businesses. We have already created many types of
                advertising designs. We will create more different types of
                advertising designs in the coming days. So that the advertising
                work of businesses becomes easier through our designs.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
