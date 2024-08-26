import Link from 'next/link';
import VirnikaLogoLockup from './icons/virnika-logo-lockup';

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between text-lg font-semibold">
        <Link className="text-primary uppercase text-3xl flex items-center" href={'/'}>
          <VirnikaLogoLockup />
        </Link>
      </header>
    </>
  );
}