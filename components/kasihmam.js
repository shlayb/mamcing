'use client';
import { Poppins } from 'next/font/google';
import { useEffect, useState, useCallback, use } from 'react';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { set, getDatabase, ref, onValue } from 'firebase/database';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function KasihMam() {
  const [selectedName, setSelectedName] = useState('');
  const [data, setdata] = useState({});
  const [beratKucing, setBeratKucing] = useState('');
  const [umurKucing, setUmurKucing] = useState('');
  const [Sekalimam, setSekalimam] = useState('');

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
    const todoRef = ref(db, 'data/profile/ciko');
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      setdata(data);
    });
  }, [db, setdata]);

  useEffect(() => {
    readDB();
    if (typeof window !== 'undefined') {
      // Analytics initialized but not used in this component
      getAnalytics(app);
    }
  }, [readDB, app]);

  useEffect(() => {
    if (data) {
      data &&
        Object.keys(data).map((key) => {
          if (key === 'Berat') {
            setBeratKucing(data[key]);
          }
          if (key === 'Umur') {
            setUmurKucing(data[key]);
          }
          if (key === 'Sekalimam') {
            setSekalimam(data[key]);
          }
        });
    }
  }, [data]);

  const handleNameChange = (name) => {
    setSelectedName(name);
    localStorage.setItem('selectedName', name); // cache the selected name
  };
  const HandleChange = (e, key) => {
    const inputValue = e.target.value;
    if (beratKucing && umurKucing) {
      if (umurKucing < 4) {
        set(ref(db, `data/profile/ciko/Sekalimam`), (((18 * beratKucing) / 1000) * 2) / 2);
      } else if (umurKucing >= 4 && umurKucing < 12) {
        set(ref(db, `data/profile/ciko/Sekalimam`), (((18 * beratKucing) / 1000) * 1.5) / 2);
      } else if (umurKucing >= 12) {
        set(ref(db, `data/profile/ciko/Sekalimam`), (18 * beratKucing) / 2000);
      }
    }
    set(ref(db, `data/profile/ciko/${key}`), inputValue);
  };
  return (
    <div className={`w-screen h-screen my-20 max-md:my-10 ${poppins.className}`}>
      <h1 className="text-4xl font-bold text-center text-black">Setting Mam</h1>
      <div className="flex flex-col space-y-2 items-center justify-center h-full text-white max-md:px-8">
        {data &&
          Object.keys(data)
            .filter((key) => key !== 'log' && key !== 'jamMam' && key !== 'Sekalimam' && key !== 'undefined')
            .map((key) => (
              <form
                key={key}
                className="grid-cols-2 items-center space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  HandleChange(e, key);
                }}
              >
                <label htmlFor={`Berat-${key}`} className="block mb-2 text-lg font-medium text-gray-700">
                  {key}
                </label>
                <input
                  id={`Berat-${key}`}
                  placeholder={data[key]}
                  defaultValue={data[key]}
                  name={key}
                  className="px-10 py-2 border text-black border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      HandleChange(e, key);
                    }
                  }}
                />
              </form>
            ))}
        <p className="text-lg text-gray-700">Sekali Makan: {Sekalimam} Gram </p>
      </div>
      {/* debug berat dan umur */}
    </div>
  );
}
