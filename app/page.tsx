import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello World!</h1>
      <Image
        src="/images/nextjs.svg"
        alt="Next.js logo"
        width={300}
        height={300}
      />
    </main>
  );
}
