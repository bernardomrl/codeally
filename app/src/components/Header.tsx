import Image from 'next/image';

import Placeholder from '@/assets/img/profile.png';

export default function Header() {
  return (
    <div className="navbar fixed top-0 z-10 h-12 bg-base-100 justify-between px-4">
      <a
        href="/home"
        className="btn btn-ghost font-bold normal-case font-poppins text-xl"
      >
        <span>
          code<span className="text-primary">ally</span>
        </span>
      </a>
      <div className="flex space-x-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="User Profile Picture" src={Placeholder} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mx-2 my-5 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li className="menu-title">👋 Olá! Bernardo</li>
            <li>
              <a href="/profile" className="font-inter font-medium text-md">
                Perfil
              </a>
            </li>
            <li>
              <a href="/settings" className="font-inter font-medium text-md">
                Configurações
              </a>
            </li>
            <li>
              <a href="/home" className="font-inter font-medium text-md">
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
