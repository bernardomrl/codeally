'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Layout } from '@/components';

import Placeholder from '@/assets/img/profile.png';
import axios, { AxiosResponse } from 'axios';

export default function Profile() {
  const [getData, setGetData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    accountType: 0,
    competence: '',
    about: ''
  });
  async function getProfile() {
    const response: AxiosResponse = await axios.get(
      'http://localhost:8000/user/profile/get'
    );

    if (response.status === 200) {
      const data = response.data;

      const extractedData = data.map(
        (item: {
          first_name: string;
          last_name: string;
          username: string;
          account_type: number;
          competence: string;
          about: string;
        }) => ({
          firstName: item.first_name,
          lastName: item.last_name,
          username: item.username,
          accountType: item.account_type,
          competence: item.competence,
          about: item.about
        })
      );

      if (extractedData.length > 0) {
        setGetData({
          firstName: extractedData[0].firstName,
          lastName: extractedData[0].lastName,
          username: extractedData[0].username,
          accountType: extractedData[0].accountType,
          competence: extractedData[0].competence,
          about: extractedData[0].about
        });
      }
    } else {
      toast.error('Erro ao carregar perfil.');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="relative shadow rounded-xl w-5/6 md:w-5/6 bg-base-200 lg:w-4/6 xl:w-3/6 px-4 pb-4">
          <div className="flex justify-center">
            <Image
              src={Placeholder}
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white"
            />
          </div>

          <div className="mt-16 flex flex-col space-y-4 items-center">
            <h1 className="font-bold text-center text-3xl font-poppins">
              {`${getData.firstName} ${getData.lastName}`}
            </h1>
            <span className="text-md font-inter text-center">
              @{getData.username}
            </span>
            <div className="flex justify-evenly w-full max-w-xs text-center text-sm font-inter font-medium">
              <span className="badge badge-md badge-primary text-white">
                {getData.accountType === 1
                  ? 'Freelancer'
                  : getData.accountType === 0
                  ? 'Usuário'
                  : ''}
              </span>
              {getData.accountType === 1 ? (
                <span className="badge badge-md badge-primary text-white">
                  {getData.competence}
                </span>
              ) : null}
            </div>
            <p>
              <span></span>
            </p>
            <div className="self-center">
              <a
                href="/profile/setup"
                className="btn btn-sm btn-primary rounded-full text-white w-max-w-sm font-inter normal-case"
              >
                Editar Perfil
              </a>
            </div>
            <div className="w-full px-10 py-4 text-center">
              <h3 className="text-md font-base font-inter">{getData.about}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
