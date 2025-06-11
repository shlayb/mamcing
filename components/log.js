'use client';
import { Poppins } from 'next/font/google';
import { useEffect, useState, useCallback, use } from 'react';
import Link from 'next/link';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { set, getDatabase, ref, onValue } from 'firebase/database';
import Table from './table';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

var nomer = 1;

export default function Log() {
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
    const todoRef = ref(db, 'data/profile/ciko/log');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold py-12">Lihat Mam</h1>
      <div className={`flex flex-col justify-center min-h-screen bg-gray-200 ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-2">{data && Object.keys(data).map((key, index) => <Table key={key} nomer={index + 1} waktu={key} gram={data[key]} />)}</div>
      </div>
    </div>
  );
}
