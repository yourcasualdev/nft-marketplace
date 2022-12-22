import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';

export default function Home() {
  const { loading } = useGlobalContext();

  

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div>
      <h1>Deneme</h1>
    </div>
  )
}
