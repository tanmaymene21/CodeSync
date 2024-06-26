import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useAuth0 } from '@auth0/auth0-react';
import { Profile } from '../Navbar/Profile';
import logo from '../../assets';

export const Navbarui = ({ navItems, className }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'flex max-w-full mx-16 px-5 absolute top-10 inset-x-0 border border-white/[0.2] rounded-full bg-black bg-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-2 justify-between items-center backdrop-blur-lg',
          className,
        )}
      >
        <Link
          to={'/'}
          className="text-white flex text-3xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transform transition-all duration-500 ease-in-out"
        >
          CodeSync
        </Link>

        <div className="flex space-x-4">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                'relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300',
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <div>
          {!isAuthenticated ? (
            <button
              className="border text-sm font-medium relative border-neutral-200 border-white/[0.2]  text-white px-4 py-2 rounded-full mr-3"
              onClick={() => loginWithRedirect()}
            >
              <span>Login</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          ) : (
            <Profile />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
