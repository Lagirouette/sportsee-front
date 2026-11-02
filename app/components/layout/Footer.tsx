export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-8 py-4 text-xs">
        <p>©Sportsee <span className="ml-2">Tous droits réservés</span></p>
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-primary">Conditions générales</a>
          <a href="#" className="hover:text-primary">Contact</a>
          <img src="/logo-icon.svg" alt="" className="h-4 w-auto" />
        </nav>
      </div>
    </footer>
  );
}