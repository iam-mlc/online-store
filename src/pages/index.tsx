import { Inter } from "next/font/google";
import CategoryTabs from "@/components/Tabs/CategoryTabs/CategoryTabs";
import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import Accordion from "@/components/Accordion/Accordion";
import BackgroundImage from "@/components/BackgroundImage";
import { Cart, Location, User } from "@/components/Icons";
import Link from "next/link";
import ProductsBanner from "@/components/ProductsBanner";
import { useFetchProducts } from "@/hooks/useFetchProducts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const url = "https://dummyjson.com/products";
  const { categories, isError, isLoading, getCategory, products } =
    useFetchProducts(url);
  const smartphones = getCategory("smartphones");
  const laptops = getCategory("laptops");

  const details = [
    {
      title:
        "Interdum velit euismod in pellentesque massa placerat duis ultricies lacus",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis egestas maecenas.",
    },
    {
      title:
        "Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius sit.",
    },
    {
      title:
        "Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus mauris a diam maecenas.",
    },
    {
      title: "Dolor sit amet consectetur adipiscing elit ut aliquam purus sit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel.",
    },
    {
      title:
        "Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames ac.",
    },
  ];

  const faq = [
    {
      question: "Is this a real product?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "What is this product?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <>
      <main className="">
        <section className="relative md:pb-[10em] overflow-hidden">
          <HeroSection />
        </section>
        <section className="relative lg:p-[15em] md:px-4 py-[10em] px-[2em] my-36 md:my-0">
          <div className="flex flex-col items-center gap-20">
            <h2 className="lg:text-5xl text-3xl font-bold text-center text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h2>
            <Link
              href={`/about-us`}
              className="text-[0.8] md:text-base font-bold py-2 md:px-8 px-4 rounded-full inline-block text-white text-center  bg-gray-500 w-fit "
            >
              Learn More
            </Link>
          </div>
          <BackgroundImage src={"/images/homePage/design/12.jpg"} />
        </section>
        <section className="relative w-full m-auto py-[12em] ">
          <CategoryTabs data={categories} />
        </section>
        <section className="relative lg:p-[15em] md:px-4 py-[10em] px-[2em] my-36 md:my-0">
          <div className="flex flex-col gap-20">
            <h2 className="lg:text-5xl text-3xl font-bold text-center text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h2>
            <div className="flex md:flex-row gap-10 md:justify-evenly flex-col items-center">
              <RoundedLink icon={<Cart />} href="/products" title="Shop now" />
              <RoundedLink icon={<User />} href="/about-us" title="About us" />
              <RoundedLink icon={<Location />} href="/" title="Location" />
            </div>
            <BackgroundImage src={"/images/homePage/design/12.jpg"} />
          </div>
        </section>
        <section className="relative py-[10em] flex flex-col gap-28 ">
          <ProductsBanner
            copywriteMessage={details}
            isReversed={true}
            data={smartphones ? smartphones.items : undefined}
          />
          <ProductsBanner
            copywriteMessage={details}
            data={laptops ? laptops.items : undefined}
          />
        </section>
        <section className="flex flex-col gap-10">
          <h2 className="lg:text-4xl text-3xl font-bold text-center px-10 md:px-0">
            Frequently Asked Questions
          </h2>
          <div className="md:px-16 px-2">
            <Accordion data={faq} title="Homepage-FAQs" />
          </div>
        </section>
      </main>
    </>
  );
}

interface RoundedLinkProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const RoundedLink: React.FC<RoundedLinkProps> = ({ title, icon, href }) => {
  return (
    <>
      <Link className="inline-block" href={href}>
        <div className="md:w-[10em] md:h-[10em] w-[7em] h-[7em] rounded-full bg-white ">
          <div className="relative top-[50%] left-[50%] w-fit transform translate-y-[-50%] translate-x-[-50%]">
            <div className="w-[25%] m-auto">{icon}</div>
            <p className="text-center mt-4 font-bold md:text-xl">{title}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
