import React from "react";
import Container from "../Shared/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TermsConditions = () => {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <Container>
        <Tabs defaultValue="account">
          <TabsList className="flex justify-between items-center bg-transparent w-full">
            <TabsTrigger
              className="font-montserrat data-[state=active]:text-[#1C91E4] data-[state=active]:underline text-black data-[state=active]:shadow-none text-4xl font-semibold"
              value="account"
            >
              Terms & Conditions
            </TabsTrigger>
            <TabsTrigger
              className="font-montserrat text-4xl data-[state=active]:text-[#1C91E4] data-[state=active]:underline text-black data-[state=active]:shadow-none font-semibold"
              value="password"
            >
              Refund Policy
            </TabsTrigger>
          </TabsList>
          <div className="border-b-2 shadow-sm mt-8"></div>
          <TabsContent value="account">
            <h2 className="font-montserrat text-[#1C91E4] text-4xl font-semibold my-6">
              Terms & Conditions
            </h2>

            <div className="font-montserrat text-base leading-loose">
              <ul className="list-disc mb-5 px-3">
                <li>
                  To contact us or purchase any of our designs you must first
                  create an account. You can create an account for FREE. You
                  must keep your account email/username password secure.
                </li>

                <li className="my-5">
                  We require customers to pay in advance to purchase any design
                  or start a project for any design.
                </li>

                <li>
                  We have a few options to start the project, You can start the
                  project through any option:
                </li>
              </ul>

              <ol className="ml-5 mb-5">
                <li>
                  <span className="font-bold">1.</span> You can start by
                  clicking "Project" from the top bar or footer.
                </li>
                <li>
                  <span className="font-bold">2.</span> You can start by
                  clicking "Start Project" from the Price List page, or Design
                  Description page.
                </li>
                <li>
                  <span className="font-bold">3.</span> You can first collect
                  your favorite designs in the cart list then you can start the
                  project for your favorite designs from the cart list. (You can
                  start a project from a cart list for one design, or you can
                  start a project from a cart list for multiple designs.)
                </li>
                <li>
                  <span className="font-bold">4.</span> You can start the
                  project through a custom offer from the inbox.
                </li>
              </ol>

              <ul className="list-disc mb-5 px-3">
                <li>
                  The requirements page must be completed when starting a
                  customer project, as we will create the customer's design
                  according to these requirements.
                </li>

                <li className="my-3">
                  You will need to provide us with your specific information so
                  that we can create your design.
                </li>

                <li>How we will work on the project:</li>
              </ul>

              <div className="ml-5 mb-5">
                <p className="font-bold text-lg">Start work</p>
                <p>
                  After completing the customer requirement page we will start
                  the design work.
                </p>

                <div className="my-5">
                  <p className="font-bold text-lg">First concept</p>
                  <p>
                    The customer gives us the time to create his design, we will
                    create it and show it to him within that time. (Then, if the
                    customer feels the need to change something in this design,
                    then we will correct the changes if the customer informs us
                    about the changes.)
                  </p>
                </div>

                <p className="font-bold text-lg">Final delivery</p>
                <p>
                  After the design work is completed we will deliver the final
                  file according to the package selected by the customer.
                </p>
              </div>

              <ul className="list-disc px-3">
                <li className="mb-5">
                  The customer must make all changes/revisions before we send
                  the final file, no changes/revisions will be accepted after we
                  send the final file.
                </li>

                <li className="mb-5">
                  If there are any errors on our part after sending the final
                  file, we will only correct those errors. If there is an error
                  on the part of the customer, the customer must start a new
                  project to correct the error.
                </li>

                <li className="mb-5">
                  We don't give the customer two options to choose from when
                  creating a new design. We only provide one design option. If
                  the customer doesn't like the first design, we will create a
                  second design for the customer. But we will delete the first
                  design while creating the second design. If the customer
                  decides to accept the first design after seeing the second
                  design. Then the customer will not get the first design from
                  us. We won't create the first design a second time. So if the
                  customer likes the first design, it should be accepted
                  immediately.
                </li>

                <li className="mb-5">
                  You can only use our designs for your personal or business
                  purposes.
                </li>

                <li className="mb-5">You can't resell our designs.</li>

                <li className="mb-5">
                  We don't provide any Images. You must provide us with images
                  to use in your design.
                </li>

                <li className="mb-5">
                  We will only create the design. We do not print any designs.
                  You have to get your design printed from another print
                  shop/company.
                </li>

                <li className="mb-5">
                  If you like one of our designs, and you want to start a
                  project for this design, please take a look at the design
                  description before starting the project.
                </li>

                <li className="mb-5">
                  No complaints will be accepted after project completion.
                </li>

                <li>You cannot cancel the project without any reason.</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <h2 className="font-montserrat text-[#1C91E4] text-4xl font-semibold my-6">
              Refund Policy
            </h2>

            <div className="font-montserrat text-base leading-loose">
              <ul className="list-disc px-3">
                <li className="custom-marker">
                  If you accidentally start a project, you must notify us within
                  5 hours of starting the project. We will be happy to refund
                  you.
                </li>
                <li className="custom-marker my-5">
                  If you don't like the design we created, you should let us
                  know before we send the final file. We will gladly refund you.
                  However, refunds will not be accepted after we have sent the
                  final file.
                </li>
                <li className="custom-marker">
                  After you start a project, we will not provide additional
                  services to you if you ask us for additional services beyond
                  the package of the project. You will not be eligible for a
                  refund based on this issue.
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default TermsConditions;
