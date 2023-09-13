'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

export default function SignIn() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevstate) => !prevstate);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [redirect, setRedirect] = useState('');

  axios.defaults.withCredentials = true;

  async function SignIn() {
    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:8000/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { success, redirect } = response.data;

        setFormData({ login: '', password: '' });

        redirect ? setRedirect(redirect as string) : setRedirect('');

        return success as string;
      } else {
        throw new Error('Erro ao fazer login.');
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
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitPromise = new Promise((resolve, reject) => {
      SignIn()
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
  }

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
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 font-inter">
      <CustomToaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
        <Link
          href="#"
          className="btn btn-ghost normal-case text-xl font-poppins font-bold self-center"
        >
          <span>
            code<span className="text-primary">ally</span>
          </span>
        </Link>
        <h2 className="mt-10 text-center text-2xl font-poppins font-bold">
          Faça login na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Usuário ou endereço de e-mail</span>
            </label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              className="input input-md bg-base-200 w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Senha</span>
              <span className="label-text-alt">
                {' '}
                <Link
                  href="/auth/forgot-password"
                  className="text-accent link link-hover"
                >
                  Esqueceu sua senha?
                </Link>
              </span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
            <button type="submit" className="btn btn-primary w-full mt-4">
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm">
          Não tem uma conta?{' '}
          <Link
            href="/auth/signup"
            className="text-accent link link-hover font-medium"
          >
            Crie uma
          </Link>
        </p>
      </div>
    </div>
  );
}
