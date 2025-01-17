import { Contact, Home, Mail } from 'lucide-react';
import { env } from 'process';
import React from 'react';
const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-bold text-gray-600">Halaman Tidak ditemukan</h2>
        <p className="text-lg text-gray-500">
          Maaf halaman yang anda cari tidak ada. Mohon check URL
          dan Coba Lagi.
        </p>
        <div className='flex flex-row gap-2 justify-center items-center'>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
          <a href="/"  className="text-white flex">
            <Home />
            <span className="mx-2 hidden md:block">Home</span>
          </a>
        </button>
        <button className="bg-black hover:bg-gray-700 text-white  font-bold py-2 px-4 rounded ">
          <a href={`mailto:${env.MAIL_ADDRESS}?subject=Laporan&body=Saya%20ada%20masalah%20dengan%20halaman%20ini`}  className="text-white flex">
            <Mail />
            <span className="mx-2 hidden md:block">Contact Dev</span>
          </a>
        </button>
        </div>
        
        
      </div>
    </div>
  );
};

export default NotFoundPage;