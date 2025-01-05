'use client'

import React from 'react';
import Link from 'next/link';

const userData = {
  name: "Shamiullah Khan",
  walletAddress: "0x1234...5678",
  lessonsCompleted: 15,
  totalLessons: 30,
  tokensEarned: 1250,
  nftCertificates: 2,
  joinDate: "2024-01-01"
};

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-green-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">User Profile</h1>
              <Link href="/" className="text-white hover:text-green-100 transition-colors duration-200">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl font-bold mr-4">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">Joined on {new Date(userData.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Wallet Address</h3>
                <p className="text-gray-600 bg-gray-100 p-2 rounded">{userData.walletAddress}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tokens Earned</h3>
                <p className="text-2xl font-bold text-green-500">{userData.tokensEarned} LQT</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Progress</h3>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Lessons Completed</span>
                <span className="text-green-500 font-semibold">{userData.lessonsCompleted} / {userData.totalLessons}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(userData.lessonsCompleted / userData.totalLessons) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
            <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">NFT Certificates Earned</h4>
                <p className="text-gray-600">Keep learning to earn more!</p>
              </div>
              <div className="text-3xl font-bold text-green-500">{userData.nftCertificates}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
