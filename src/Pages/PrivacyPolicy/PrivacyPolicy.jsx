import React from 'react';
import Container from '../Shared/Container';

const PrivacyPolicy = () => {
    return (
        <div className='my-10 w-11/12 mx-auto'>
            <Container>
                <div className='font-montserrat font-medium leading-loose'>
                    <div className='mb-10'>
                        <h2 className="font-montserrat text-[#1C91E4] text-4xl font-semibold my-6">
                            Privacy Policy
                        </h2>

                        <p>Thank you for joining the 'mahfujurrahman535 family We are dedicated to safeguarding your personal data and ensuring your privacy. If you have any questions or inquiries regarding our privacy policy, please feel free to contact us at https://mahfujurrahm535.com/contact.</p>

                        <p className='my-6'>Our belief is that when you use our website or server, you trust us completely with your information and privacy. We place the highest importance on both your personal information and your privacy. Through this policy, we want to make it clear how we collect information, how we use that information, and what rights you have in these matters.</p>

                        <p>We hope that you will carefully read this policy because it is crucial for you. If there is any issue or concern with which you disagree or feel uncomfortable, please contact us immediately. We will also request you to carefully read the following policy, as it will provide you with a clear understanding of our practices.</p>
                    </div>

                    <div className='mb-10'>
                        <h4 className="text-[#1C91E4] text-xl mb-5 font-semibold">What Information Do We Collect:</h4>

                        <div className='border-l-2 border-[#0E97A1] pl-10'>
                            <p className='mb-5'>Our connection with your privacy depends on the nature of your product and service use. We collect various information based on your product or service use. The information we collect may include:</p>

                            <ul className='list-disc px-3 mb-5'>
                                <li>Password collect Social media register Cookies
                                    Personal information provided by you, such as your phone number, email address, name, address, and password.</li>
                                <li className='my-5'>Information related to financial transactions. We collect the necessary information for your purchased products or transactions. For example, credit card numbers and passwords connected to financial transactions.</li>
                                <li>Information related to social media accounts. If you wish to register on our website using your social media account (such as Facebook, Twitter, or others), you can do so.</li>
                            </ul>

                            <p>All the information provided by you must be true, complete, and accurate. If there is any change in this information, you must inform us immediately.</p>
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h4 className="text-[#1C91E4] text-xl mb-5 font-semibold">Automated Data Collection:</h4>

                        <div className='border-l-2 border-[#0E97A1] pl-10'>
                            <p>When you visit our web page or use our site, we collect certain specific information. This information does not help us identify you (such as your name, and where you live). However, it provides us with your device's IP address, operating system, your location, language preferences, and other details of how and when you accessed our site.</p>

                            <p className='mt-5'>This information is primarily required for the security and management of our website. It also helps in internal analysis and report preparation.</p>
                        </div>
                    </div>

                    <div className='border-l-2 border-[#0E97A1] pl-10'>
                        <div>
                            <h6 className="text-lg font-semibold">How We Use Your Information:</h6>
                            <p>We use your information based on your consent and compliance with legal obligations for our business interests.</p>
                        </div>
                        <div className='my-5'>
                            <h6 className="text-lg font-semibold">Do We Use Cookies and Other Tracking Technologies?</h6>
                            <p>Yes, from time to time, we use cookies and other tracking technologies to collect information.</p>
                        </div>
                        <div>
                            <h6 className="text-lg font-semibold">Do We Update Our Privacy Policy?</h6>
                            <p>Yes, we update our policy to ensure compliance with current and relevant laws.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PrivacyPolicy;