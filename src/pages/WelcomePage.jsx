import React from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const { connectWallet } = useWallet();
  const navigate = useNavigate();

  const handleConnect = async () => {
    await connectWallet();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-600 via-blue-400 to-neutral-400 px-6 overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center backdrop-blur-lg transition-all duration-500 ease-in-out transform hover:scale-105">
        {/* Title with Glow */}
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-2xl animate__animated animate__fadeIn animate__delay-1s hover:text-orange-500 transition-all duration-500 ease-in-out">
          Welcome to <span className="text-orange-500 neon-text">TrustPay</span>
        </h1>

        {/* Signal bar */}
        <div className="flex justify-center space-x-[3px] mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`bg-green-400 w-[4px] rounded ${
                bar === 1 ? 'h-2' : bar === 2 ? 'h-3' : bar === 3 ? 'h-4' : 'h-5'
              } animate-pulse`}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8 leading-relaxed tracking-wide drop-shadow-md animate__animated animate__fadeIn animate__delay-2s">
          A secure and decentralized escrow platform for seamless transactions.
          <br />
          Join us to secure your next transaction with ease and confidence.
        </p>

        {/* 3D Cube Animation */}
        <div className="mb-8 animate__animated animate__fadeIn animate__delay-3s">
          <div className="w-20 h-20 mx-auto cube3D">
            <div className="cube">
              <div className="side front" />
              <div className="side back" />
              <div className="side left" />
              <div className="side right" />
              <div className="side top" />
              <div className="side bottom" />
            </div>
          </div>
        </div>

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white px-8 py-4 rounded-3xl text-xl font-semibold shadow-xl hover:scale-110 hover:shadow-2xl transform animate__animated animate__fadeIn animate__delay-4s"
        >
          🔐 Connect to MetaMask
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
