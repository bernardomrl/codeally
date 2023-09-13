'use client';
import { useEffect, useState } from 'react';

import { navigation } from '@/components/landing-page';

import {
  Bars3BottomRightIcon,
  SwatchIcon,
  ChevronDownIcon
} from '@heroicons/react/20/solid';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar fixed w-full h-max bottom-0 md:top-0 lg:top-0 bg-base-100 z-40 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0px_-5px_8px_0px_#00000024] md:shadow-md lg:shadow-lg'
          : 'shadow-none'
      }`}
    >
      <div className="navbar-start">
        <a
          href="#"
          className="btn btn-ghost normal-case text-xl font-poppins font-bold"
        >
          <span>
            code<span className="text-primary">ally</span>
          </span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="join">
          {...navigation.slice(0, 3).map((item, index) => (
            <a
              key={index}
              href={item.anchor}
              className="btn btn-md btn-ghost join-item normal-case font-inter"
            >
              {item.name}
            </a>
          ))}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        <ul className="join hidden lg:flex">
          {...navigation.slice(3).map((item, index) => (
            <a
              key={index}
              href={item.anchor}
              className="btn btn-md btn-ghost join-item normal-case font-inter"
            >
              {item.name}
            </a>
          ))}
        </ul>
        <details className="dropdown dropdown-end dropdown-top md:dropdown-bottom lg:dropdown-bottom">
          <summary className="btn btn-md btn-ghost normal-case">
            <SwatchIcon className="h-5 w-5" />
            <ChevronDownIcon className="h-5 w-5" />
          </summary>
          <ul className="p-2 shadow menu dropdown-content m-4 z-1 bg-base-200 rounded-box w-52">
            <li>
              <a data-set-theme="dark" className="font-inter font-medium">
                <div className="badge badge-info badge-xs rounded-full mr-2"></div>
                Dark
              </a>
            </li>
            <li>
              <a data-set-theme="light" className="font-inter font-medium">
                <div className="badge badge-success badge-xs rounded-full mr-2"></div>
                Light
              </a>
            </li>
            <li>
              <a data-set-theme="dracula" className="font-inter font-medium">
                <div className="badge badge-warning badge-xs rounded-full mr-2"></div>
                Dracula
              </a>
            </li>
            <li>
              <a data-set-theme="winter" className="font-inter font-medium">
                <div className="badge badge-neutral badge-xs rounded-full mr-2"></div>
                Winter
              </a>
            </li>
          </ul>
        </details>
        <label
          htmlFor="landing-drawer"
          className="btn btn-ghost flex lg:hidden"
        >
          <Bars3BottomRightIcon className="h-5 w-5" />
        </label>
      </div>
    </div>
  );
}
