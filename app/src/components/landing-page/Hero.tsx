import Link from 'next/link';

export default function Hero() {
  return (
    <div
      className="h-screen w-full flex justify-center items-center p-5"
      id="about"
    >
      <div className="sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <div className="text-center font-inter">
          <h1 className="text-4xl font-bold font-poppins sm:text-6xl">
            Transforme bugs em sucesso
          </h1>
          <p className="mt-6 text-lg">
            Conectamos você a freelancers altamente qualificados, facilitando o
            processo de encontrar a correspondência perfeita, tornando seu
            projeto mais eficiente e produtivo.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/signup"
              className="btn btn-md normal-case btn-primary rounded-full"
            >
              Começar agora
            </Link>
            <a href="#" className="link link-hover">
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
