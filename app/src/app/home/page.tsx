'use client';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';

import { Layout } from '@/components';

import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const competences = [
  { id: 1, name: 'Desenvolvedor Front-End', value: 'Desenvolvedor-FrontEnd' },
  { id: 2, name: 'Desenvolvedor Back-End', value: 'Desenvolvedor-BackEnd' },
  { id: 3, name: 'Desenvolvedor FullStack', value: 'Desenvolvedor-FullStack' },
  { id: 4, name: 'Desenvolvedor Mobile', value: 'Desenvolvedor-Mobile' }
];

interface Competence {
  id: number;
  name: string;
  value: string;
}

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(competences[0]);
  const [query, setQuery] = useState('');

  const filteredSearch =
    query === ''
      ? competences
      : competences.filter((competence) =>
          competence.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleClick = () => {
    const query = encodeURIComponent(selected.value);
    router.push(`/home/results?s=${query}`);
  };

  return (
    <Layout>
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-10">
        <h1 className="font-semibold font-poppins text-2xl">
          Pesquisar Freelancers
        </h1>
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 w-full max-w-md">
              <label htmlFor="" className="label">
                <span className="label-text text-left">
                  Digite a competência que deseja encontrar
                </span>
              </label>
              <div className="rounded-lg w-full relative">
                <Combobox.Input
                  className="input input-md bg-base-200 w-full"
                  displayValue={(competence: Competence) => competence.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-4 max-h-60 w-full overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredSearch.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 ">
                      Nada encontrado.
                    </div>
                  ) : (
                    filteredSearch.map((competence) => (
                      <Combobox.Option
                        key={competence.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-base-300' : ''
                          }`
                        }
                        value={competence}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {competence.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-primary'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <button
            className="btn btn-md btn-primary w-full max-w-md text-white font-inter"
            onClick={handleClick}
          >
            Pesquisar
          </button>
        </div>
      </div>
    </Layout>
  );
}
