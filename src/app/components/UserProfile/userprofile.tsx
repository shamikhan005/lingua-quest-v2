'use client'

import React, {useState, useRef } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import Image from 'next/image';


const UserProfile = () => {

  const { address, isConnected } = useAccount();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxFileSize = 5 * 1024 * 1024; 

      if (!validImageTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, or GIF)');
        return;
      }

      if (file.size > maxFileSize) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
          <w3m-button />
        </div>
      </div>
    )
  }

  const userData = {
    name: "Shamiullah Khan",
    walletAddress: address || '',
    lessonsCompleted: 0,
    totalLessons: 30,
    tokensEarned: 0,
    nftCertificates: 0,
    joinDate: new Date().toISOString()
  };

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
              <div 
                onClick={triggerFileInput}
                className="relative w-20 h-20 rounded-full mr-4 cursor-pointer group overflow-hidden"
              >
                {profilePicture ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={profilePicture}
                      alt="Profile"
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl font-bold group-hover:bg-green-200 transition-colors duration-200">
                    {address ? `${address.slice(0,2)}` : 'U'}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePictureUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {userData.name === "User" ? `User ${address?.slice(0,6)}...${address?.slice(-4)}` : userData.name}
                </h2>
                <p className="text-sm text-gray-500">Joined on {new Date(userData.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Wallet Address</h3>
                <p className="text-gray-600 bg-gray-100 p-2 rounded overflow-hidden text-ellipsis">{address}</p>
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

