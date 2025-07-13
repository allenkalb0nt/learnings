'use client';

import React from 'react';
import { AuthStatus, useAuth } from './store/AuthContext';
import { useRouter } from 'next/navigation';
const statusDisplay = (status: AuthStatus | null) => {
  switch (status) {
    case AuthStatus.loading:
      return <p>Loading nigga</p>;
    case AuthStatus.error:
      return <p>Eror</p>;
    case AuthStatus.success:
      return <p>Saksi</p>;
  }
};

const Home = () => {
  const { tite, userId, onLogin, errorMessage, status, onLogout } = useAuth();
  const router = useRouter();
  return (
    <>
      <div>{tite}</div>
      <div>{userId}</div>
      {statusDisplay(status)}
      {userId ? (
        <button
          className="cursor-pointer"
          onClick={() => {
            onLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="cursor-pointer"
          onClick={() => {
            onLogin('test@gmail.com', '123456');
            console.log('click mo nga');
          }}
        >
          Login pre
        </button>
      )}
      <br />
      {userId ? (
        <button className="cursor-pointer" onClick={() => router.push(`profile/${userId}`)}>
          Go to Profile
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
