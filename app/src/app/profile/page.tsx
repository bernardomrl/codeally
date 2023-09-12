import Image from 'next/image';

import { Header } from '@/components';

import ProfileImg from '@/assets/img/profile.png';
import {
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  return (
    <div className="drawer xl:drawer-open">
      <input id="home-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        {/* Page content here */}
        <main className="profile-page bg-base-300">
          <section className="relative block" style={{ height: '500px' }}>
            <div className="absolute top-0 w-full h-full bg-center bg-cover bg-primary" />
          </section>
          <section className="relative py-16">
            <div className="container mx-auto px-4 rounded-md shadow">
              <div className="relative flex flex-col min-w-0 break-words bg-base-100 w-full mb-6 shadow-xl rounded-2xl -mt-64 p-8">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <Image
                          alt="..."
                          src={ProfileImg}
                          className="shadow-xl bg-primary rounded-full h-auto align-middle border-none absolute -m-15 -ml-20 lg:-m-16"
                          style={{ maxWidth: '150px' }}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="btn btn-primary m:mr-2 mb-1"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                        >
                          Editar perfil
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 pt-8 lg:pt-0 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide">
                            22
                          </span>
                          <span className="text-sm ">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide">
                            10
                          </span>
                          <span className="text-sm ">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide">
                            89
                          </span>
                          <span className="text-sm ">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 ">
                      Bernardo Meirelles
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg"></i>{' '}
                      Minas Gerais, Brasil
                    </div>
                    <div className="mb-2 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg"></i>
                      Desenvolvedor Fullstack
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="mt-10 py-10 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-primary link link-hover"
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="home-drawer" className="drawer-overlay"></label>
        <ul className="menu menu-lg p-4 w-80 min-h-full bg-base-200 font-inter font-medium justify-between">
          <li className="space-y-2">
            <a className="normal-case text-xl font-poppins font-bold mb-4">
              <span>
                code<span className="text-primary">ally</span>
              </span>
            </a>
            <a href="/home" className="text-base">
              <HomeIcon className="h-6 w-6 mr-3" />
              Início
            </a>
          </li>
          <li className="space-y-2">
            <a href="/settings" className="text-base">
              <Cog6ToothIcon className="h-6 w-6 mr-3" />
              Configurações
            </a>
            <a href="/" className="text-base">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
              Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
