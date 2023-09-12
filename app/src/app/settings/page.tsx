import { Header } from '@/components';

import {
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  return (
    <div className="drawer xl:drawer-open">
      <input id="home-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label htmlFor="home-drawer" className="drawer-overlay"></label>
        <ul className="menu menu-lg p-4 w-80 min-h-full bg-base-200 font-inter font-medium justify-between">
          <li className="space-y-2">
            <a className="normal-case text-xl font-poppins font-bold mb-4">
              <span>
                code<span className="text-primary">ally</span>
              </span>
            </a>
            <a href="/home" className="text-base">
              <HomeIcon className="h-6 w-6 mr-3" />
              Início
            </a>
          </li>
          <li className="space-y-2">
            <a href="/settings" className="text-base active">
              <Cog6ToothIcon className="h-6 w-6 mr-3" />
              Configurações
            </a>
            <a href="/" className="text-base">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
              Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
