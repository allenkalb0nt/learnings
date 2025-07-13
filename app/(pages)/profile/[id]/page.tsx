'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/supabase';
const page = () => {
  const params = useParams();
  const [user, setUser] = useState<any | null>(null);

  const getUser = async () => {
    const { data, error } = await supabase.from('users').select().eq('id', params['id']).single();
    if (error) throw new Error('tanginamo');
    setUser(data);
  };
  useEffect(() => {
    getUser();
  });
  return <>{user ? <div>page: {user['name']}</div> : <div>No user found.</div>}</>;
};

export default page;
