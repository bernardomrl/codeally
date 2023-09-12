import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-100 space-y-8">
      <h1 className="text-2xl font-bold font-poppins">Pesquisar freelancers</h1>
      <div className="w-full flex flex-col max-w-md space-y-2">
        <div className="relative">
          <input
            type="text"
            name="password"
            className="input input-md bg-base-200 w-full pr-14"
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center p-3 btn btn-ghost"
            type="button"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        {/* <label htmlFor="" className="label">
          <span className="label-text">Pesquisas restantes: 4</span>
        </label> */}
      </div>
    </div>
  );
}
