"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DetailsUpdate() {
    const [userData, setUserData] = useState({
        name: '',
        gender: '',
        birthDate: '',
        fieldsOfInterest: ''
    });

    const data = useUser();
    const user = data.user;
    let name: string;
    let gender: string;
    let birthDate: string;
    let fieldsOfInterest: string;

    const userId = user?.id;

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const unsafeMetadata = user?.unsafeMetadata; // Use with caution
            console.log(user);

            name = unsafeMetadata?.Name as string;
            gender = unsafeMetadata?.Gender as string; // Assuming you have a field named Gender in metadata
            birthDate = unsafeMetadata?.BirthDate as string; // Assuming you have a field named BirthDate in metadata
            fieldsOfInterest = unsafeMetadata?.FieldsOfInterest as string; // Assuming you have a field named FieldsOfInterest in metadata

            setUserData({ name, gender, birthDate, fieldsOfInterest });
            console.log("User Data: ");
            console.log({ name, gender, birthDate, fieldsOfInterest });


        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/detailsUpdate', {
                userId,
                name: userData.name,
                gender: userData.gender,
                birthDate: userData.birthDate,
                fieldsOfInterest: userData.fieldsOfInterest
            });
            console.log('User details updated successfully:', response.data);
            toast.success('User details updated successfully!');
            // Redirect or show success message as needed

            router.push('/searchPage'); // Replace '/another-page' with the desired page URL



        } catch (error) {
            console.log('Error updating user details:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Update User Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={''}
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="birthDate" className="block text-gray-700 font-bold mb-2">
                        Birth Date
                    </label>
                    <input
                        type="text"
                        id="birthDate"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fieldsOfInterest" className="block text-gray-700 font-bold mb-2">
                        Fields of Interest
                    </label>
                    <input
                        type="text"
                        id="fieldsOfInterest"
                        name="fieldsOfInterest"
                        value={userData.fieldsOfInterest}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Update Details
                </button>
            </form>
        </div>
    );
}
