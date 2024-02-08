import { useGetRequirementByIdQuery } from '@/redux/features/requirements/requirementsApi';
import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const ReadProjectRequirements = ({ id }) => {
    const { data: requirementsData, isLoading } = useGetRequirementByIdQuery(id);

    console.log(requirementsData);

    return (
        <div className="requirements-container">
            {
                requirementsData?.data ?

                    <div className="relative overflow-x-auto shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Requirement
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Answer
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Attachment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Which industry do you work in?
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemOne}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Do you have your own/Industry logo?
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemTwo}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            requirementsData?.data?.itemTwoAttachment ? <Link target='_blank' className='flex items-center gap-2' to={`${requirementsData?.data?.itemTwoAttachment}`}>View Attachment <MdOutlineRemoveRedEye size={20} /></Link> : <span className="text-gray-500">No Attachment Found!</span>
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Do you have your own/Industry website?
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemThree}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Do you have any imaginary or specific design ideas?
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemFour}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            requirementsData?.data?.itemFourAttachment ? <Link target='_blank' className='flex items-center gap-2' to={`${requirementsData?.data?.itemFourAttachment}`}>View Attachment <MdOutlineRemoveRedEye size={20} /></Link> : <span className="text-gray-500">No Attachment Found!</span>
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Do you have your specific design size?
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemFive}
                                    </td>
                                </tr>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        You have to give clear information that you need in the design. <br /> (E.g. all texts, all photos, logo, contact info, etc.)
                                    </th>
                                    <td className="px-6 py-4">
                                        {requirementsData?.data?.itemSix}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            requirementsData?.data?.itemSixAttachment ? <Link target='_blank' className='flex items-center gap-2' to={`${requirementsData?.data?.itemSixAttachment}`}>View Attachment <MdOutlineRemoveRedEye size={20} /></Link> : <span className="text-gray-500">No Attachment Found!</span>
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    :
                    <div className="flex items-center justify-center h-60">
                        <span className="text-gray-500 text-xl">No Requirements Found!</span>
                    </div>
            }
        </div>
    );
};

export default ReadProjectRequirements;
