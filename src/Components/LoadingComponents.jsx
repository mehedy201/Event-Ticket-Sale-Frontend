import React from 'react';

const LoadingComponents = () => {
    return (
        <div>
            <div className="animate-pulse space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
            <br />
            <div className="animate-pulse space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
            <br />
            <div className="animate-pulse space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default LoadingComponents;