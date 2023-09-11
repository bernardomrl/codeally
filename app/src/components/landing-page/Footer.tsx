export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200/50 text-base-content flex justify-center mb-16 md:mb-0 lg:mb-0">
      <div className="flex justify-between items-start w-full max-w-6xl">
        <aside className="flex flex-col space-y-4">
          <a
            href="#"
            className="btn btn-ghost normal-case text-xl font-poppins font-bold"
          >
            <span>
              code<span className="text-primary">ally</span>
            </span>
          </a>
          <p>
            {new Date().getFullYear()} &copy; CodeAlly
            <br />
            Todos os direitos reservados.
          </p>
        </aside>
        <nav className="flex flex-col justify-center space-y-2">
          <header className="footer-title">Serviços</header>
          <a className="link link-hover">Planos</a>
          <a className="link link-hover">Segurança</a>
        </nav>
        <nav className="flex flex-col justify-center space-y-2">
          <header className="footer-title">Empresa</header>
          <a className="link link-hover">Sobre Nós</a>
          <a className="link link-hover">Contato</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav className="flex flex-col justify-center space-y-2">
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Termos de Serviço</a>
          <a className="link link-hover">Política de Privacidade</a>
          <a className="link link-hover">Política de Cookies</a>
        </nav>
      </div>
    </footer>
  );
}
