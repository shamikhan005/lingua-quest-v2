"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAccount, useEnsName, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserProfile = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: ensName } = useEnsName({ address });
  const [userName, setUserName] = useState<string>("");

  // changes
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>('');
  // changes end

  const router = useRouter();

  const handleDisconnectWallet = () => {
    disconnect();
    router.push("/");
  };

  useEffect(() => {
    if (ensName) {
      setUserName(ensName);

      setEditedName(ensName);
    } else if (address) {
      const defaultName = `User ${address.slice(0,6)}...${address.slice(-4)}`;

      setUserName(defaultName);
      setEditedName(defaultName);
    }
  }, [address, ensName]);

  const handleNameSave = () => {
    // Validate and save the edited name
    const trimmedName = editedName.trim();
    if (trimmedName && trimmedName.length <= 50) {
      setUserName(trimmedName);
      setIsEditing(false);
    } else {
      alert('Name must be between 1 and 50 characters');
    }
  };

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxFileSize = 5 * 1024 * 1024;

      if (!validImageTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }

      if (file.size > maxFileSize) {
        alert("File size should be less than 5MB");
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
          <h2 className="text-2xl font-bold mb-4">
            Please connect your wallet
          </h2>
          <w3m-button />
        </div>
      </div>
    );
  }

  const userData = {
    name: userName,
    walletAddress: address || "",
    lessonsCompleted: 0,
    totalLessons: 30,
    tokensEarned: 0,
    nftCertificates: 0,
    joinDate: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-green-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">User Profile</h1>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-white hover:text-green-100 transition-colors duration-200"
                >
                  Back to Home
                </Link>
                <button
                  onClick={handleDisconnectWallet}
                  className="bg-white text-green-500 px-4 py-2 rounded-full hover:bg-green-50 transition-colors duration-300 flex items-center space-x-2 border border-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Disconnect</span>
                </button>
              </div>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl font-bold group-hover:bg-green-200 transition-colors duration-200">
                    {address ? `${address.slice(0, 2)}` : "U"}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
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
          {isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 mr-2 w-full"
                maxLength={50}
              />
              <button 
                onClick={handleNameSave}
                className="text-green-500 hover:text-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-red-500 hover:text-red-600 ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-800 mr-2">
                {userName}
              </h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-green-500 hover:text-green-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          )}
        </div>
              <div>
                <p className="text-sm text-gray-500">
                  Joined on {new Date(userData.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Wallet Address
                </h3>
                <p className="text-gray-600 bg-gray-100 p-2 rounded overflow-hidden text-ellipsis">
                  {address}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Tokens Earned
                </h3>
                <p className="text-2xl font-bold text-green-500">
                  {userData.tokensEarned} LQT
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Learning Progress
            </h3>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Lessons Completed</span>
                <span className="text-green-500 font-semibold">
                  {userData.lessonsCompleted} / {userData.totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (userData.lessonsCompleted / userData.totalLessons) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Achievements
            </h3>
            <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  NFT Certificates Earned
                </h4>
                <p className="text-gray-600">Keep learning to earn more!</p>
              </div>
              <div className="text-3xl font-bold text-green-500">
                {userData.nftCertificates}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;