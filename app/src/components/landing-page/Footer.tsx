export default function Footer() {
  return (
    <footer className="footer footer-center font-inter p-4 bg-base-200 text-base-content mb-16 md:mb-0 lg:mb-0">
      <aside>
        <p>
          Codeally © {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </aside>
    </footer>
  );
}
