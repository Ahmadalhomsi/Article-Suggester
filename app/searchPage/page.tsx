// pages/index.js
"use client"


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

interface Article {
    name: string[];
    title: string[];
    abstract: string[];
    keywords: string[];
}

const SearchPage = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedSite, setSelectedSite] = useState('dergipark');
    const [recommendations, setRecommendations] = useState<Article[]>([]);

    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/getDataset");
                if (res.data.length > 0) {
                    const articles: Article[] = res.data[0].name.map((_: any, index: string | number) => {
                        console.log(res.data[0].name[index]); // Print name
                        return {
                            name: res.data[0].name[index],
                            title: res.data[0].title[index],
                            abstract: res.data[0].abstract[index],
                            keywords: res.data[0].keywords[index],
                        };
                    });
                    setRecommendations(articles);
                }
                toast.success("Linked");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        // Split the entered keywords into an array
        const enteredKeywords = query.split(';');
    
        // Filter articles based on matching keywords
        const filteredArticles = recommendations.filter(article =>
            enteredKeywords.some(keyword =>
                article.keywords.includes(keyword.trim())
            )
        );
    
        // Update state to display filtered articles
        setRecommendations(filteredArticles);
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center w-full max-w-screen-md px-4">
                <h1 className="text-3xl font-bold mb-6">Article Search</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Enter keywords..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 min-w-0 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500 text-blue-700"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded-r px-6 py-2 ml-1 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="site-select" className="mr-2">Site:</label>
                    <select
                        id="site-select"
                        className="px-6 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-700"
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
                <div className="grid grid-cols-fr md:grid-cols-3fr gap-4">
                    {recommendations.map((article, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <p className="font-bold text-blue-500">Index: {index}</p>
                            <p className="font-bold">Name: {article.name}</p>
                            <p className="font-bold">Title: {article.title}</p>
                            <p className="font-bold">Keywords: {article.keywords}</p>
                            <p>Abstract: {article.abstract}</p>
                            {/* You can add more fields here */}
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
};

export default SearchPage;
