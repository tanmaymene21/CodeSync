import React from 'react';
import { Homeui } from '../ui/Homeui';
import { Typewriter } from './Typewriter';
import { GetStarted } from './GetStarted';

export function Home() {
  return (
    <Homeui>
      <div className="absolute z-50 inset-0 flex justify-center items-center text-white px-4 text-center">
        <div className="">
          <Typewriter className="" />
          <p className="text-gray-300/75 text-2xl">
            Collaborate, share, enhance code in real time.
          </p>
          <GetStarted />
        </div>
      </div>
    </Homeui>
  );
}
