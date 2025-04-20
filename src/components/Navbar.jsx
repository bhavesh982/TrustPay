import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const { account, connectWallet } = useWallet();
  const location = useLocation();
  const hideLinks = location.pathname === '/welcome';

  return (
    <nav className="bg-[#0f0c29] text-white p-4 flex justify-between items-center shadow-lg border-b border-cyan-400">
      <div className="flex gap-6 items-center">
        <h1 className="text-2xl font-extrabold tracking-wide flex items-center neon-glow">
          <FaWallet className="mr-2 text-3xl transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          TrustPay
          {/* Signal Bar */}
          <div className="flex ml-3 space-x-[2px] mt-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`bg-green-400 rounded w-[3px] ${
                  level === 1 ? 'h-1' : level === 2 ? 'h-2' : level === 3 ? 'h-3' : 'h-4'
                } animate-pulse`}
              />
            ))}
          </div>
        </h1>

        {!hideLinks && (
          <>
            <Link
              to="/"
              className="hover:underline font-medium hover:text-cyan-400 transition duration-150"
            >
              Create Escrow
            </Link>
            <Link
              to="/dashboard"
              className="hover:underline font-medium hover:text-cyan-400 transition duration-150"
            >
              Dashboard
            </Link>
          </>
        )}
      </div>

      <div>
        {account ? (
          <span className="text-sm bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-1 rounded-md font-semibold shadow-md animate-pulse">
            {/* {account.slice(0, 6)}...{account.slice(-4)} */}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition duration-200"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
