import Image from 'next/image';

import DefaultUserImg from '@/assets/img/profile.png';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className="navbar absolute top-0 w-full xl:w-[calc(100vw-20rem)] bg-base-200 flex justify-between z-50">
      <div className="flex-none">
        <label htmlFor="home-drawer" className="btn btn-ghost xl:hidden">
          <Bars3BottomLeftIcon className="inline-block w-6 h-6 stroke-current" />
        </label>
      </div>
      <div>
        <a
          href="/profile"
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <Image src={DefaultUserImg} alt="Avatar" width={200} height={200} />
          </div>
        </a>
      </div>
    </div>
  );
}
