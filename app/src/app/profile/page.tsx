import { Header } from '@/components';

export default function Profile() {
  return (
    <>
      <Header />
      <div className="p-16">
        <div className="p-8 bg-base-200 shadow mt-24 rounded-md">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {' '}
            <div className="flex flex-row justify-between">
              {' '}
              <div>
                {' '}
                <p className="font-bold text-whitetext-xl p-2">
                  <svg
                    className="fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                  >
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                  </svg>
                </p>{' '}
                <p className="text-base-400">Linkedin</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className="font-bold text-base-700 text-xl p-2">
                  <svg
                    className="w-30 h-30 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </p>{' '}
                <p className="text-base-400">E-mail</p>{' '}
              </div>{' '}
              <div>
                {' '}
                <p className="font-bold text-base-700 text-xl p-2">
                  <svg
                    className="w-7 h-7 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>{' '}
                <p className="text-base-400">Telefone</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className="relative">
              {' '}
              <div className="w-48 h-48 bg-base-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-max h-max fill-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>{' '}
            </div>{' '}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-primary hover:bg-secondary shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {' '}
                Editar
              </button>{' '}
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-accent shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {' '}
                Inativar
              </button>{' '}
            </div>{' '}
          </div>{' '}
          <div className="mt-20 text-center border-b border-white/50 pb-12">
            {' '}
            <h1 className="text-4xl font-medium text-base-700">
              Jéssica Jones,{' '}
              <span className="font-light text-base-500">27</span>
            </h1>{' '}
            <p className="font-light text-base-600 mt-3">
              Belo Horizonte, Brasil
            </p>{' '}
            <p className="mt-8 text-base-500">Engenharia da Computação</p>{' '}
            <p className="mt-2 text-base-500">UFMG</p>{' '}
          </div>{' '}
          <div className="m-10 flex flex-col justify-center">
            {' '}
            <p className="text-base-600 text-center font-light max-w-max">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              egestas orci et urna scelerisque, sit amet condimentum nunc
              euismod. Nullam id tortor leo. Nulla eget mauris ultrices ex
              pellentesque dictum ac in elit. Donec in viverra nunc, vitae
              vulputate metus. Nulla vulputate quis neque nec posuere. Sed
              dictum sollicitudin massa.
            </p>{' '}
          </div>
        </div>
      </div>
    </>
  );
}
