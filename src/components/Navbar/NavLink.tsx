import NextLink, { LinkProps } from 'next/link';
import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';

interface NavLinkProps extends LinkProps  {
    href: Url;
    children: string | React.ReactNode;
    className?: string;
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({href, ...props}) => {
    const router = useRouter()
    const isActive = router.asPath === (typeof href === 'string' ? href : href.pathname)

  return (
    <NextLink href={href} passHref legacyBehavior>
        <NavigationMenu.Link active={isActive} {...props}/>
    </NextLink>
  );
};

export default NavLink;