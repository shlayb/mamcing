'use client';
import { Poppins } from 'next/font/google';
import { useEffect, useState, useCallback, use } from 'react';
import Link from 'next/link';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { set, getDatabase, ref, onValue } from 'firebase/database';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function Mam() {
  const [beratMam, setBeratMam] = useState();
  const [data, setdata] = useState();
  const firebaseConfig = {
    apiKey: 'AIzaSyBJEIXP0OO3-1oQTvCZZfZ2Gz-9WF8d8j4',
    authDomain: 'mamcing-5c348.firebaseapp.com',
    databaseURL: 'https://mamcing-5c348-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'mamcing-5c348',
    storageBucket: 'mamcing-5c348.firebasestorage.app',
    messagingSenderId: '989386896351',
    appId: '1:989386896351:web:48f3e02c6214f21c568a6a',
    measurementId: 'G-PCC7XG26YM',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const readDB = useCallback(() => {
    const todoRef = ref(db, 'data/kasihmam');
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      setdata(data);
    });
  }, [db, setdata]);

  useEffect(() => {
    readDB();
    // Initialize Firebase Analytics
    if (typeof window !== 'undefined') {
      const analytics = getAnalytics(app);
    }
  }, [readDB, app]);

  const handleBeratMamChange = (e) => {
    setBeratMam(e.target.value);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-200 ${poppins.className}`}>
      <h1 className="text-4xl font-bold mb-32">Kasih Mam</h1>
      <div className="flex flex-col items-center space-y-2">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="beratMam" className="block mb-2 text-lg font-medium text-gray-700">
            Berat Mam (gr):
          </label>
          <input id="beratMam" type="text" value={beratMam} placeholder="Masukan Berat mam" onChange={handleBeratMamChange} className="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </form>
        <div className="mt-4">
          <button
            onClick={() => {
              if (beratMam && beratMam !== 'default') {
                const kasihmamRef = ref(db, 'data/kasihmam');
                set(kasihmamRef, beratMam)
                  .then(() => {
                    alert('Data berhasil diupload!');
                    setBeratMam(''); // Reset input after successful upload
                  })
                  .catch((error) => {
                    console.error('Error uploading data: ', error);
                    alert('Gagal mengupload data. Silakan coba lagi.');
                  });
              } else {
                alert('Mohon masukkan berat mam terlebih dahulu!');
              }
            }}
            className="aspect-square w-48 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            KASIH MAM
          </button>
        </div>
      </div>
    </div>
  );
}
