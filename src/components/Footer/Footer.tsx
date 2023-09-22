import * as React from "react";
import UnorderedList from "../UnorderedList/UnorderedList";
import NextLink from "next/link";
import toURL from "@/utils/toURL";
import {
  BsFillChatLeftTextFill,
  BsFillTelephoneFill,
  BsWhatsapp,
  BsFacebook,
} from "react-icons/bs";
import * as Separator from "@radix-ui/react-separator";
import { year } from "@/utils/currentDate";

interface IFooterProps {}

function Footer<IFooterProps>({}) {
  const soliciaIconSize = "lg:w-5 lg:h-auto md:w-5 md:h-auto sm:w-4 sm:h-auto";

  const navNames = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about-us",
    },
    {
      title: "Products",
      path: "/products",
    },
    {
      title: "Location",
      path: "/location",
    },
  ];
  const navItems = navNames.map((item) => {
    return {
      label: item.title,
      component: <NextLink href={item.path}>{item.title}</NextLink>,
    };
  });
  const socialLinks = [
    {
      label: "Whatsapp",
      component: (
        <NextLink href={"/"} className="">
          <BsFillChatLeftTextFill className={`${soliciaIconSize}`} />
        </NextLink>
      ),
    },
    {
      label: "Facebook",
      component: (
        <NextLink href={"/"} className="">
          <BsFillTelephoneFill className={`${soliciaIconSize}`} />
        </NextLink>
      ),
    },
    {
      label: "Phone",
      component: (
        <NextLink href={"/"} className="">
          <BsWhatsapp className={`${soliciaIconSize}`} />
        </NextLink>
      ),
    },
    {
      label: "SMS",
      component: (
        <NextLink href={"/"} className="">
          <BsFacebook className={`${soliciaIconSize}`} />
        </NextLink>
      ),
    },
  ];
  return (
    <footer className=" bg-gray-200 lg:p-12 md:p-12 sm:p-8 relative bottom-0 w-full ">
      <div className="flex flex-col justify-center align-items gap-8">
        <div className="flex justify-center">
          <div>LOGO</div>
        </div>
        <div>
          <UnorderedList
            items={navItems}
            listClassName="flex lg:flex-row md:flex-row sm:flex-col gap-6 justify-center"
            itemClassName="sm:flex sm:justify-center"
          ></UnorderedList>
        </div>
        <div className="">
          <FooterSeparator />
          <div className="my-2">
            <UnorderedList
              items={socialLinks}
              listClassName="flex flex-row gap-10 justify-center"
              itemClassName=""
            ></UnorderedList>
          </div>
          <FooterSeparator />
        </div>
        <div className="flex justify-center">
          <div className="text-center">
            &#169; {year}, Chápitine, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterSeparator = ({}) => {
  return (
    <Separator.Root
      className="h-px bg-black lg:w-[70%] md:w-[70%] sm:w-full mx-auto"
      orientation="horizontal"
    />
  );
};

export default Footer;
