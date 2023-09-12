import { Header } from '@/components';

import {
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="drawer xl:drawer-open">
      <input id="home-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        {/* Page content here */}
        {/* Search bar*/}
        <div className="w-full h-screen flex flex-col justify-center items-center bg-base-100 space-y-8">
          <h1 className="text-2xl font-bold font-poppins">
            Pesquisar freelancers
          </h1>
          <div className="w-full flex flex-col max-w-md space-y-2">
            <div className="relative">
              <input
                type="text"
                name="password"
                className="input input-md bg-base-200 w-full pr-14"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center p-3 btn btn-ghost"
                type="button"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
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
            <a href="/home" className="text-base active">
              <HomeIcon className="h-6 w-6 mr-3" />
              Início
            </a>
          </li>
          <li className="space-y-2">
            <a href="/settings" className="text-base">
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
