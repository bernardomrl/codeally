'use client';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { CustomToaster } from '@/components';

// import DefaultUserImg from '@/assets/img/profile.png';
import Profile from '@/assets/json/profile.json';
import { AxiosResponse } from 'axios';
import { themeChange } from 'theme-change';

export default function ProfileSetup() {
  const [formData, setFormData] = useState({
    username: '',
    about: '',
    fname: '',
    lname: '',
    email: '',
    country: '',
    language: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <CustomToaster />
      <form className="max-w-2xl mx-auto my-10 p-4 font-inter">
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
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                />
                <label htmlFor="username" className="label">
                  <span className="label-text text-xs opacity-50 text-accent">
                    codeally.com.br/
                    <span className="font-bold">{formData.username}</span>
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
              {/* <div className="col-span-full flex flex-col justify-center">
                <label htmlFor="photo" className="label">
                  <span className="label-text">Foto de perfil</span>
                </label>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="avatar flex align-center justify-center">
                    <div className="w-12 rounded-full">
                      <Image
                        src={DefaultUserImg}
                        alt="Avatar"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-xs rounded-full btn-secondary"
                    type="button"
                    onClick={() => {
                      const modal = document.getElementById('modal');
                      if (modal instanceof HTMLDialogElement) {
                        modal.showModal();
                      }
                    }}
                  >
                    Alterar
                  </button>
                </div>
              </div> */}
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
                  name="fname"
                  value={formData.fname}
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
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="label">
                  <span className="label text">Endereço de e-mail</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-md bg-base-200 w-full"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="country" className="label">
                  <span className="label-text">País</span>
                </label>
                <select
                  name="country"
                  className="select select-md bg-base-200 w-full max-w-xs"
                  defaultValue={'DEFAULT'}
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option disabled value={'DEFAULT'}>
                    Escolha seu país
                  </option>
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
                  defaultValue={'DEFAULT'}
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option disabled value={'DEFAULT'}>
                    Escolha seu idioma
                  </option>
                  {Profile.language.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* <div className="divider"></div>
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
                <span className="label-text">Linguagem de programação</span>
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
        </div> */}
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
