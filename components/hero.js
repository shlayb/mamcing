import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function Hero() {
  return (
    <div className={`w-screen h-screen my-10 ${poppins.className}`}>
      <div className="flex items-center space-x-10 justify-center h-full text-white max-md:flex-col max-md:px-8 max-md:space-x-0 max-md:items-center max-md:py-30">
        <Image src="/cats.png" alt="Hero Image" width={300} height={600} className="rounded-lg mb-8 max-md:w-[150px]" style={{ maxWidth: '100%', height: 'auto' }} />
        <div className="flex flex-col items-start space-y-0 max-md:items-center max-md:text-center">
          <h1 className="text-9xl text-black font-bold max-md:text-5xl">MAMCING</h1>
          <h1 className="text-6xl text-black font-semibold mt-[-10px] max-md:text-2xl max-md:mt-0">Kasih mam si kucing</h1>
          <div className="flex justify-center my-4 py-5">
            <Link href="/#Kasihmam" className="p-5 px-10 rounded-full text-center border-slate-800 border-[1px] bg-gradient-to-r from-cyan-500 to-blue-500 max-md:p-3 max-md:px-4 ">
              <button className="text-xl max-md:text-md">Kasih Mam!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
