'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function Signup() {
    try {
      const response: AxiosResponse = await axios.post(
        'http://localhost:8000/auth/register',
        formData
      );

      if (response.status === 201) {
        setFormData({ email: '', username: '', password: '' });
        return 'Conta criada com sucesso.';
      } else {
        throw new Error('Erro ao criar conta.');
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
            console.log(error);
            throw new Error('Erro desconhecido.');
          }
        }
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitPromise = new Promise((resolve, reject) => {
      Signup()
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

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevstate) => !prevstate);
  }

  useEffect(() => {
    themeChange(false);
  });

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 font-inter">
      <CustomToaster />
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
          Criar uma conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Endereço de e-mail</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-md bg-base-200 w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Usuário</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input input-md bg-base-200 w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Senha</span>
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
              Criar conta
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm">
          Já tem uma conta?{' '}
          <Link
            href="/auth/signin"
            className="text-accent link link-hover font-medium"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
