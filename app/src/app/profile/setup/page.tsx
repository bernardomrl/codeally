'use client';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

// import DefaultUserImg from '@/assets/img/profile.png';
import Profile from '@/assets/json/profile.json';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

axios.defaults.withCredentials = true;

interface FormData {
  firstName: string;
  lastName: string;
  about: string;
  country: string;
  language: string;
  [key: string]: string;
}

export default function ProfileSetup() {
  const router = useRouter();
  const [getAccountType, setGetAccountType] = useState(0);
  const [getData, setGetData] = useState({
    username: '',
    email: ''
  });
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    about: '',
    country: '',
    language: ''
  });

  if (getAccountType === 1) {
    formData.experience = '';
    formData.programmingLanguage = '';
    formData.framework = '';
    formData.competence = '';
    formData.accountType = '1';
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getProfile = async () => {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/user/profile/get/'
    );
    setGetData(response.data);
    setGetAccountType(response.data.account_type);
  };

  const [redirect, setRedirect] = useState('');

  async function updateProfile() {
    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:8000/user/profile/update`,
        formData
      );

      if (response.status === 200) {
        const { success } = response.data;

        setRedirect('/home');

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
      updateProfile()
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
    getProfile();

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
      <form
        className="max-w-2xl mx-auto my-10 p-4 font-inter"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div>
            <h2 className="font-semibold font-poppins">Perfil</h2>
            <p className="mt-2 text-sm">
              Essas informações serão exibidas publicamente, portanto, tenha
              cuidado com o que você compartilha.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 max-w-xs">
                <label htmlFor="username" className="label">
                  <span className="label-text">Usuário</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={getData.username}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                  disabled
                />
                <label htmlFor="username" className="label">
                  <span className="label-text text-xs opacity-50 text-accent">
                    codeally.com.br/profile/
                    <span className="font-bold">{getData.username}</span>
                  </span>
                </label>
              </div>
              <div className="col-span-full">
                <label htmlFor="username" className="label">
                  <span className="label-text">Sobre</span>
                </label>
                <textarea
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={handleInputChange}
                  className="textarea textarea-md bg-base-200 w-full sm:text-sm sm:leading-6"
                />
                <label htmlFor="username" className="label">
                  <span className="label-text text-xs">
                    Fale um pouco sobre você
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <h2 className="font-semibold font-poppins">Informações Pessoais</h2>
            <p className="mt-2 text-sm">
              Mantenha todas as suas informações atualizadas.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="label">
                  <span className="label-text">Sobrenome</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="label">
                  <span className="label-text">Endereço de e-mail</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={getData.email}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                  disabled
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="country" className="label">
                  <span className="label-text">País</span>
                </label>
                <select
                  name="country"
                  className="select select-md bg-base-200 w-full max-w-xs"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option disabled>Escolha seu país</option>
                  {Profile.country.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="language" className="label">
                  <span className="label-text">Idioma</span>
                </label>
                <select
                  name="language"
                  className="select select-md bg-base-200 w-full max-w-xs"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option disabled>Escolha seu idioma</option>
                  {Profile.language.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {getAccountType === 1 ? (
            <>
              <div className="divider"></div>
              <div>
                <h2 className="font-semibold font-poppins">
                  Experiência Profissional
                </h2>
                <p className="mt-2 text-sm">
                  Mostre seus conhecimentos e habilidades.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="experience" className="label">
                      <span className="label-text">Experiencia</span>
                    </label>
                    <select
                      name="experience"
                      className="select select-md bg-base-200 w-full max-w-xs"
                      defaultValue={'DEFAULT'}
                    >
                      <option disabled value={'DEFAULT'}>
                        Escolha sua experiência
                      </option>
                      {Profile.experience.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="programmingLanguage" className="label">
                      <span className="label-text">
                        Linguagem de programação
                      </span>
                    </label>
                    <select
                      name="programmingLanguage"
                      className="select select-md bg-base-200 w-full max-w-xs"
                      defaultValue={'DEFAULT'}
                    >
                      <option disabled value={'DEFAULT'}>
                        Escolha sua linguagem de programação
                      </option>
                      {Profile.programmingLanguage.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="framework" className="label">
                      <span className="label-text">Framework</span>
                    </label>
                    <select
                      name="framework"
                      className="select select-md bg-base-200 w-full max-w-xs"
                      defaultValue={'DEFAULT'}
                    >
                      <option disabled value={'DEFAULT'}>
                        Escolha seu framework
                      </option>
                      {Profile.framework.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="competence" className="label">
                      <span className="label-text">Competência</span>
                    </label>
                    <select
                      name="competence"
                      className="select select-md bg-base-200 w-full max-w-xs"
                      defaultValue={'DEFAULT'}
                    >
                      <option disabled value={'DEFAULT'}>
                        Escolha sua competência
                      </option>
                      {Profile.competencie.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div>
                <h2 className="font-semibold font-poppins">Links sociais</h2>
                <p className="mt-2 text-sm">
                  Divulgue o seu trabalho pela plataforma.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="" className="label">
                      <span className="label-text">LinkedIn</span>
                    </label>
                    <input
                      type="text"
                      className="input input-md bg-base-200 w-full"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="" className="label">
                      <span className="label-text">Github</span>
                    </label>
                    <input
                      type="text"
                      className="input input-md bg-base-200 w-full"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="" className="label">
                      <span className="label-text">Codepen</span>
                    </label>
                    <input
                      type="text"
                      className="input input-md bg-base-200 w-full"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="divider"></div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="btn btn-md btn-primary w-full max-w-xs"
          >
            Salvar
          </button>
        </div>
      </form>
      {/* Modal pra alterar foto */}
      <dialog id="modal" className="modal">
        <div className="modal-box shadow-md">
          <div className="max-w-xl">
            <h1 className="text-lg font-poppins font-semibold pb-4">
              Alterar foto de perfil
            </h1>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary btn-sm rounded-full font-inter">
                Voltar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
