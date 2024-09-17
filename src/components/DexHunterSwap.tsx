"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import '@dexhunterio/swaps/lib/assets/style.css';

// Dynamically import the Swap component to avoid SSR issues.
const Swap = dynamic(() => import('@dexhunterio/swaps'), { ssr: false });

const DexHunterSwap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-transparent border-2 border-white px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-300 fixed top-15 left-10 text-sm"
        style={{ borderRadius: '0px', top: '74px' }}
      >
        DexHunter Swap
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <Swap
              orderTypes={["SWAP", "LIMIT"]}
              defaultToken="5d16cc1a177b5d9ba9cfa9793b07e60f1fb70fea1f8aef064415d114494147"
              colors={{
                background: "#0E0F12",
                containers: "#191B23",
                subText: "#88919E",
                mainText: "#FFFFFF",
                buttonText: "#FFFFFF",
                accent: "#007DFF",
              }}
              theme="dark"
              width="400"
              partnerCode="snake_pool6164647231713938366d657a393467333935653673667234306c75306b776e717678306165376d66787168656c663875773432637a6b71787a67343068373933647135717477726377346b6c37743632337179777a76726a676d30796a78727a736e763935376ada39a3ee5e6b4b0d3255bfef95601890afd80709"
              partnerName="snake_pool"
              displayType="FULL"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DexHunterSwap;
