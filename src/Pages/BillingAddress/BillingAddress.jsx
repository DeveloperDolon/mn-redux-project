import React, { useEffect, useRef, useState } from 'react';
import Container from '../Shared/Container';
import { useForm } from 'react-hook-form';
import UserImg from "../../assets/user.png";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase/firebase.config';
import { useSelector } from 'react-redux';
import { useGetCustomerByIdQuery, useUpdateCustomerByIdMutation } from '@/redux/features/customer/customer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BillingAddress = () => {

    const { email } = useSelector((state) => state.userSlice);
    const { data: customerData, isLoading } = useGetCustomerByIdQuery(email);
    const [updateCustomerByBillngAddress] = useUpdateCustomerByIdMutation();

    console.log(customerData?.data);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState("");
    const [imagePercent, setImagePercent] = useState(0);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("");
    const [language, setLanguage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch('country.json')
            .then(res => res.json())
            .then(resData => setCountries(resData))
    }, [])

    useEffect(() => {
        if (image) {
            handleImageupload(image);
        }
    }, [image]);

    useEffect(() => {
        const selectedCountryData = countries.find(country => country.name === selectedCountry);
        if (selectedCountryData) {
            setSelectedCity(selectedCountryData?.capital);
            setCountryCode(selectedCountryData?.code.toLowerCase());
            setPhoneNumberPrefix(selectedCountryData?.dialling_code);
            setLanguage(selectedCountryData?.language?.name)
        }
    }, [selectedCountry, countries]);

    const handleImageupload = image => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");

                setImagePercent(Math.round(progress));
            },
            error => {
                // Handle any errors that occur during the upload.
                console.error(error);
            },
            () => {
                // When the upload is complete, get the image URL.
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async imageUrl => {
                        setImageURL(imageUrl);
                    })
                    .catch(error => {
                        // Handle any errors getting the download URL.
                        console.error("Error getting download URL:", error);
                    });
            }
        );
    };

    const onSubmit = (data) => {

        const id = customerData?.data?.id;
        
        const updateCustomer = {
            name: data?.fullName,
            email: data?.email,
            image: imageURL,
            userName: data?.username,
            address: data?.address,
            country: data?.country,
            countryCode,
            city: data?.city,
            number: data?.phoneNumber,
            industryName: data?.industryName
        }

        updateCustomerByBillngAddress({id, data: updateCustomer})
        .then(() => {
            toast.success('Update Successfully!')
            navigate('/customer-profile');
        })
    };

    return (
        <div className='font-montserrat my-10 w-3/5 mx-auto'>
            <Container>
                <div className='shadow'>
                    <div className='bg-[#1C91E4] px-5 py-4'>
                        <h4 className='text-white font-medium'>Billing Address</h4>
                    </div>
                    <div className='p-5'>
                        {/* Image Input */}
                        <div>
                            <div className="flex justify-center items-center">
                                <img
                                    onClick={() => fileRef.current.click()}
                                    src={imageURL ? imageURL : UserImg}
                                    alt="profile"
                                    className="h=24 w-24 self-center cursor-pointer rounded-full object-cover"
                                />
                                <input
                                    onChange={e => setImage(e.target.files[0])}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    ref={fileRef}
                                />
                            </div>

                            {
                                imagePercent ? <p className='text-green-500 font-semibold text-center mt-3 text-sm'>{`Upload is ${imagePercent}% done`}</p> : ""
                            }
                        </div>

                        {/* Full Name Field */}
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Full Name"
                                {...register('fullName', { required: 'Full Name is required' })}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
                        </div>

                        {/* Username Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={customerData?.data?.userName || ""}
                                {...register('username')}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username.message}</span>}
                        </div>

                        {/* Industry Name Field */}
                        <div className="mb-4">
                            <label htmlFor="industryName" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Industry Name</label>
                            <input
                                type="text"
                                id="industryName"
                                placeholder="Industry Name"
                                {...register('industryName', { required: 'Industry Name is required' })}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.industryName && <span className="text-red-500 text-xs mt-1">{errors.industryName.message}</span>}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {/* Country Field (Select) */}
                            <div className="mb-4">
                                <label htmlFor="country" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Country</label>
                                <select
                                    id="country"
                                    {...register('country')}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full border border-gray-300 h-10 px-3 py-2 outline-none"
                                >
                                    <option value="">Select Country</option>
                                    {countries?.map((country, index) => (
                                        <option key={index} value={country?.name}>
                                            {country?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>}
                            </div>

                            {/* City Field (Select) */}
                            <div className="mb-4">
                                <label htmlFor="city" className="block mb-1 ml-2 text-xs md:text-sm font-medium">City</label>

                                <input
                                    type="text"
                                    id="city"
                                    placeholder="City"
                                    value={selectedCity}
                                    {...register('city')}
                                    className="w-full border border-gray-300 h-10 px-3 py-2 outline-none"
                                />

                                {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Address"
                                {...register('address', { required: 'Address is required' })}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={customerData?.data?.email || ""}
                                placeholder="Email"
                                {...register('email', { pattern: /^\S+@\S+$/i })}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.type === 'required' ? 'Email is required' : 'Invalid email format'}</span>}
                        </div>

                        {/* Phone Number Field */}
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Phone Number</label>
                            <div className="flex items-center">
                                {phoneNumberPrefix && <span className="border border-r-0 border-gray-300 px-3 py-2 bg-gray-200">{phoneNumberPrefix}</span>}
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    {...register('phoneNumber', { required: 'Phone Number is required' })}
                                    className="w-full border border-gray-300 px-3 py-2 outline-none"
                                />
                            </div>
                            {errors.phoneNumber && <span className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</span>}
                        </div>

                        {/* Language Field */}
                        <div className="mb-4">
                            <label htmlFor="language" className="block mb-1 ml-2 text-xs md:text-sm font-medium">Language</label>
                            <input
                                type="text"
                                id="language"
                                placeholder="Language"
                                value={language}
                                {...register('language')}
                                className="w-full border border-gray-300 px-3 py-2 outline-none"
                            />
                            {errors.language && <span className="text-red-500 text-xs mt-1">{errors.language.message}</span>}
                        </div>

                        {/* Save Changes Button */}
                        <div className='text-center'>
                            <button onClick={handleSubmit(onSubmit)} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold w-2/4 py-2 rounded-full'>Save Changes</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BillingAddress;