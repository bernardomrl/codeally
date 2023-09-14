'use client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CustomToaster } from '@/components';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevstate) => !prevstate);
  }

  function togglePasswordConfirmVisibility() {
    setIsPasswordConfirmVisible((prevstate) => !prevstate);
  }

  const [redirect, setRedirect] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePasswords = async () => {
    const token = searchParams.get('token');

    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:8000/auth/password-reset/confirm?token=${token}`,
        formData
      );

      if (response.status === 200) {
        const { success } = response.data;

        setRedirect('/auth/signin');

        return success as string;
      } else {
        throw new Error('Erro ao trocar senha.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          throw new Error(error.response.data.error);
        } else {
          try {
            throw error;
          } catch {
            throw new Error('Erro desconhecido.');
          }
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitPromise = new Promise((resolve, reject) => {
      changePasswords()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error.message);
        });
    });

    toast.promise(submitPromise, {
      loading: 'Carregando...',
      success: (message) => message as string,
      error: (error) => error as string
    });
  };

  useEffect(() => {
    themeChange(false);

    if (redirect && redirect !== '') {
      const redirectTimer = setTimeout(() => {
        router.push(redirect);
      }, 2000);
      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [redirect, router]);

  return (
    <>
      <CustomToaster />
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="input input-md bg-base-200 w-full pr-14"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
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
    </>
  );
}
