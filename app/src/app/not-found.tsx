export default function NotFound() {
  return (
    <main className="grid w-full h-screen place-items-center bg-base-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold font-inter text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold font-poppins sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-base leading-7 font-inter">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/home"
            className="btn btn-sm btn-primary rounded-full font-inter normal-case"
          >
            Página inicial
          </a>
        </div>
      </div>
    </main>
  );
}
