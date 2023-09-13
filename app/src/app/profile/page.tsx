import Image from 'next/image';

import { Header } from '@/components';

import Placeholder from '@/assets/img/profile.png';

export default function Profile() {
  return (
    <>
      <Header />
      <div className="h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="flex flex-col bg-base-200 justify-center items-center max-w-xl p-4 rounded-lg space-y-6">
          <div className="flex items-center space-x-20">
            <div className="avatar">
              <div className="rounded-full w-32">
                <Image alt="User Profile Picture" src={Placeholder} />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl font-semibold font-inter lg:text-3xl">
                Bernardo Meirelles
              </h1>
              <h3 className="text-md lg:text-lg font-light font-inter">
                @bernardomrl
              </h3>
              <h5 className="text-sm md:text-md font-medium font-inter opacity-75">
                Desenvolvedor FullStack
              </h5>
            </div>
          </div>
          <div className="flex flex-col items-center-justify-center">
            <h3 className="font-inter">
              Um programador é um arquiteto digital, um mestre da linguagem das
              máquinas e um artista da lógica. Com habilidades que misturam
              criatividade e precisão, esse profissional é responsável por
              traduzir ideias complexas em código, criando assim as bases para o
              funcionamento de aplicativos, sistemas e websites que fazem parte
              do nosso mundo digital.
            </h3>
          </div>
          <button className="btn btn-primary normal-case font-inter w-full">
            Editar Perfil
          </button>
        </div>
      </div>
    </>
  );
}
