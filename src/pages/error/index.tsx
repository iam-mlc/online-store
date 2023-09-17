import Link from "next/link";
import * as React from "react";

interface IErroPageProps {}

const ErroPage: React.FunctionComponent<IErroPageProps> = ({}) => {
  return (
    <>
      <main>
        <section>
          <div className="w-full h-screen flex justify-center items-center flex-col  gap-20">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
              We are very sorry 😔 there was an error
            </h1>
            <div className="flex flex-col gap-10 md:flex-row">
              <Link
                href={"/"}
                className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center "
              >
                Back to home
              </Link>
              <Link
                href={"/products"}
                className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center "
              >
                See products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ErroPage;
