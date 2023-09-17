import Banner from "@/components/Cards/HomePageCards/Banner";
import * as React from "react";

interface IAboutProps {}

const About: React.FunctionComponent<IAboutProps> = ({}) => {
  const details = {
    title: "About us",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  const images = {
    title: "Company",
    thumbnail: "/images/aboutPage/1.jpg",
  };

  return (
    <main>
      <section>
        <div>
          <Banner details={details} images={images} />
        </div>
      </section>
      <section className="text-gray-600 body-font relative py-[10em]">
        <div className=" mx-auto flex sm:flex-nowrap flex-wrap ">
          <div className="lg:w-full md:w-1/2  overflow-hidden p-10 flex items-end justify-center relative">
            <div className="h-[30em]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d26345.32172214518!2d32.59768101916354!3d-25.829224721801996!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smz!4v1693664473418!5m2!1sen!2smz"
                width="100%"
                height="100%"
                className="absolute inset-0 "
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md ">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">
                  Photo booth tattooed prism, portland taiyaki hoodie neutra
                  typewriter
                </p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a className="text-indigo-500 leading-relaxed">
                  example@email.com
                </a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">123-456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
