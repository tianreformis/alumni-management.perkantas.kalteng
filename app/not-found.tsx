import { Home } from 'lucide-react';
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
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <a href="/"  className="text-white">
            <Home />
          </a>
        </button>
        
      </div>
    </div>
  );
};

export default NotFoundPage;