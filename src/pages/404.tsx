import Link from 'next/link';
import * as React from 'react';

interface INotFountProps {
}

const NotFount: React.FunctionComponent<INotFountProps> = ({}) => {
  return (
    <main>
    <section>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-20">
        <div className='flex flex-col gap-5 text-center'>
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold">
              404 🤔
            </h1>
            <h2 className='font-bold text-lg px-4'>This page was not found</h2>
        </div>
        <div className="flex flex-col gap-10 md:flex-row">
          <Link
            href={"/"}
            className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center text-sm md:text-base"
          >
            Back to home
          </Link>
          <Link
            href={"/products"}
            className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center text-sm md:text-base"
          >
            See products
          </Link>
        </div>
      </div>
    </section>
    </main>
  );
};

export default NotFount;
