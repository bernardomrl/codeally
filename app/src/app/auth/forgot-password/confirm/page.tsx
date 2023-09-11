'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { themeChange } from 'theme-change';

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevstate) => !prevstate);
  }

  function togglePasswordConfirmVisibility() {
    setIsPasswordConfirmVisible((prevstate) => !prevstate);
  }

  useEffect(() => {
    themeChange(false);
  });

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl font-poppins font-bold self-center"
        >
          <span>
            code<span className="text-primary">ally</span>
          </span>
        </Link>
        <h2 className="mt-10 text-center text-2xl font-poppins font-bold">
          Alterar senha
        </h2>
        <p className="mt-10 text-center text-sm text-cod-gray-500">
          Defina uma senha forte para manter sua conta segura.
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" method="POST">
          <div>
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="input input-md bg-base-200 w-full pr-14"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center p-3 btn btn-ghost"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Confirmar senha</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordConfirmVisible ? 'text' : 'password'}
                className="input input-md bg-base-200 w-full pr-14"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center p-3 btn btn-ghost"
                type="button"
                onClick={togglePasswordConfirmVisibility}
              >
                {isPasswordConfirmVisible ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Alterar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
