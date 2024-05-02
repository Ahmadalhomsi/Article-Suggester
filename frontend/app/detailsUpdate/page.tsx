"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function DetailsUpdate() {
    const [userData, setUserData] = useState({
        name: '',
        address: '',
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

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
                userId: userId,
                name: userData.name,
                address: userData.address,
            });
            console.log('User details updated successfully:', response.data);
            toast.success('User details updated successfully!');
            // Redirect or show success message as needed

        } catch (error) {
            console.error('Error updating user details:', error);
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
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                        required
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
