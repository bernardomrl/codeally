'use client';
import { Fragment, useState } from 'react';

import { Header } from '@/components';

import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' }
];

export default function Home() {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      <Header />
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-10">
        <h1 className="font-semibold font-poppins text-2xl">
          Pesquisar Freelancers
        </h1>
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
                displayValue={(person) => person.name}
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
                {filteredPeople.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 ">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-base-300' : ''
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
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
      </div>
    </>
  );
}
