// pages/index.js
"use client"


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

const SearchPage = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedSite, setSelectedSite] = useState('dergipark');

    const { user } = useUser();


    // let userAuth: { sessionClaims: { metadata: { Name: any; }; }; };
    useEffect(() => {
        const fetchData = async () => {
            const unsafeMetadata = user?.unsafeMetadata; // Use with caution
            const name = unsafeMetadata?.Name;
            console.log(name);
            const address = unsafeMetadata?.Address;
            console.log(address);
        };

        fetchData();
    }, []);


    const handleSearch = () => {
        // if (query.trim() !== '') {
        //     router.push(`/search?search=${encodeURIComponent(query)}&site=${selectedSite}`);
        // }
        //console.log(userAuth.sessionClaims?.metadata.Name);


    };

    const sendAnApi = async () => {

        // ony works in the backend
        const res = await axios.get("http://localhost:3000/api/pythonx");
        console.log(res.data);
        toast.success("Linked");

    };


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Article Search</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Enter keywords..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500 text-blue-700"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded-r px-4 py-2 ml-1 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Search
                    </button>

                    <button
                        onClick={sendAnApi}
                        className="bg-blue-500 text-white rounded-r px-4 py-2 ml-1 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        FAST API
                    </button>
                </div>
                <div className="flex items-center">
                    <label htmlFor="site-select" className="mr-2">Site:</label>
                    <select
                        id="site-select"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-700"
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                    >
                        <option value="dergipark">Dergi Park</option>
                        <option value="scholar">Google Scholar</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
