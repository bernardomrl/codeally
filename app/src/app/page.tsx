'use client';
import { useState, useEffect } from 'react';

import {
  navigation,
  Header,
  Hero,
  Feature,
  Pricing,
  Footer
} from '@/components/landing-page';

import { themeChange } from 'theme-change';

export default function Index() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    themeChange(false);
  });

  return (
    <div className="drawer drawer-end">
      <input
        id="landing-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">
        {/* Componentes da Página */}
        <Header />
        <Hero />
        <Feature />
        <Pricing />
        <Footer />
      </div>
      <div className="drawer-side z-50 lg:hidden">
        <label htmlFor="landing-drawer" className="drawer-overlay"></label>
        <ul className="menu menu-lg p-4 w-80 min-h-full bg-base-200 space-y-2">
          <li className="menu-title font-poppins font-bold text-xl">
            codeally
          </li>
          {navigation.slice(0, 3).map((item) => (
            <li key={item.name}>
              <a
                href={item.anchor}
                className="font-semibold"
                onClick={closeDrawer}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </a>
            </li>
          ))}
          <div className="divider"></div>
          {navigation.slice(3, 5).map((item) => (
            <li key={item.name}>
              <a
                href={item.anchor}
                className="font-semibold"
                onClick={closeDrawer}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
