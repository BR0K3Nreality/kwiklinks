import React from 'react';
import ShortenUrl from './components/ShortenUrl';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ShortenUrl />
    </div>
  );
};

export default Home;
