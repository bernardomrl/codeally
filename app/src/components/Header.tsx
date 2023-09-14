'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

import Placeholder from '@/assets/img/profile.png';
import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

export default function Header() {
  const router = useRouter();
  const [getData, setGetData] = useState({
    firstName: ''
  });
  async function getProfile() {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/user/profile/get'
    );

    if (response.status === 200) {
      const data = response.data;

      const extractedData = data.map((item: { first_name: string }) => ({
        firstName: item.first_name
      }));

      if (extractedData.length > 0) {
        setGetData({
          firstName: extractedData[0].firstName
        });
      }
    } else {
      toast.error('Erro ao carregar perfil.');
      router.push('/auth/signin');
    }
  }

  const handleLogout = async () => {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/auth/logout'
    );

    if (response.status === 200) {
      const { success } = response.data;
      router.push('/auth/signin');
      toast.success(success as string);
    } else {
      toast.error('Erro ao fazer logout.');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <CustomToaster />
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
              <li className="menu-title font-medium">
                👋 Olá! <span className="font-bold">{getData.firstName}</span>
              </li>
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
                <a
                  onClick={handleLogout}
                  className="font-inter font-medium text-md"
                >
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
