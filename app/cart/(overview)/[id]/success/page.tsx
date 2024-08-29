'use client';
// success page for submitting order 

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';

const SuccessPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-top pt-10 min-h-screen bg-tertiary bg-opacity-30 text-white p-6 mt-2 rounded-lg">
      <h1 className="text-5xl font-bold mb-4 text-primary">Success!</h1>
      <div
        className={`flex-col text-center transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-xl italic ">Payment processed successfully.</p>
        <p className="text-xl italic ">Order Submitted.</p>
      </div>
      <div className="mt-4 text-center">
        <Link href={`/cart/${id}`} className="">
        <button className="bg-primary m-2 p-4 rounded text-white flex justify-center items-center w-50">
          <ArrowLeftIcon className="w-8 mr-2" />
          Back to cart
        </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;