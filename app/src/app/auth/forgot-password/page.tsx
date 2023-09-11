'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function sendEmailRequest() {
    try {
      const response: AxiosResponse = await axios.post(
        'http://localhost:8000/auth/reset-password',
        formData
      );

      if (response.status === 200) {
        setFormData({ email: '' });
        return 'E-mail enviado.';
      } else {
        throw new Error('Erro ao enviar e-mail, tente novamente mais tarde.');
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
      sendEmailRequest()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error.message);
        });
    });

    toast.promise(submitPromise, {
      loading: 'Enviando...',
      success: (message) => message as string,
      error: (error) => error as string
    });
  }

  useEffect(() => {
    themeChange(false);
  }, []);

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
          Recuperar senha
        </h2>
        <p className="mt-10 text-center text-sm text-cod-gray-500">
          Enviaremos um e-mail com um link para redefinir sua senha.
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <button type="submit" className="btn btn-primary w-full mt-4">
              Enviar e-mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
