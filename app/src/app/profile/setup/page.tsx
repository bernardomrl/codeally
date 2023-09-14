'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

import Profile from '@/assets/json/profile.json';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { themeChange } from 'theme-change';

axios.defaults.withCredentials = true;

interface FormData {
  username: string;
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  language: string;
  experience?: string;
  competence?: string;
  planguage?: string;
  framework?: string;
}

export default function ProfileSetup() {
  const router = useRouter();
  const [redirect, setRedirect] = useState('');
  const [getData, setGetData] = useState({
    email: '',
    username: '',
    accountType: 0
  });

  async function getProfile() {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/user/profile/get'
    );

    if (response.status === 200) {
      const data = response.data;

      if (data.length > 0) {
        setGetData({
          email: data[0].email,
          username: data[0].username,
          accountType: data[0].account_type
        });
      }
    } else {
      toast.error('Erro ao carregar perfil.');
    }
  }

  useEffect(() => {
    themeChange(false);
    getProfile();
  }, []);

  const [userFormData, setUserFormData] = useState({
    username: getData.username,
    about: '',
    firstName: '',
    lastName: '',
    email: getData.email,
    country: Profile.country[0].value,
    language: Profile.language[0].value
  });

  const [freelancerFormData, setFreelancerFormData] = useState({
    competence: Profile.competencie[0].value,
    planguage: Profile.programmingLanguage[0].value,
    framework: Profile.framework[0].value,
    experience: Profile.experience[0].value
  });

  const handleUserFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFreelancerFormChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFreelancerFormData({ ...freelancerFormData, [name]: value });
  };

  const updateProfile = async () => {
    try {
      let formData: FormData;

      if (getData.accountType === 1) {
        formData = {
          ...userFormData,
          ...freelancerFormData
        };
      } else {
        formData = {
          ...userFormData
        };
      }

      const response: AxiosResponse = await axios.post(
        'http://localhost:8000/user/profile/update',
        formData
      );

      if (response.status === 200) {
        const { success } = response.data;

        setRedirect('/home');

        return success as string;
      } else {
        throw new Error('Erro ao atualizar perfil.');
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
                  className="textarea textarea-md bg-base-200 w-full sm:text-sm sm:leading-6"
                  value={userFormData.about}
                  onChange={handleUserFormChange}
                  required
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
                  className="input input-md bg-base-200 w-full"
                  value={userFormData.firstName}
                  onChange={handleUserFormChange}
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="label">
                  <span className="label-text">Sobrenome</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="input input-md bg-base-200 w-full"
                  value={userFormData.lastName}
                  onChange={handleUserFormChange}
                  required
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
                  value={userFormData.country}
                  onChange={handleUserFormChange}
                  required
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
                  value={userFormData.language}
                  onChange={handleUserFormChange}
                  required
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
          {getData.accountType === 1 ? (
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
                      value={freelancerFormData.experience}
                      onChange={handleFreelancerFormChange}
                    >
                      <option disabled>Escolha sua experiência</option>
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
                      name="planguage"
                      className="select select-md bg-base-200 w-full max-w-xs"
                      value={freelancerFormData.planguage}
                      onChange={handleFreelancerFormChange}
                    >
                      <option disabled>
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
                      value={freelancerFormData.framework}
                      onChange={handleFreelancerFormChange}
                    >
                      <option disabled>Escolha seu framework</option>
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
                      value={freelancerFormData.competence}
                      onChange={handleFreelancerFormChange}
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
    </>
  );
}
