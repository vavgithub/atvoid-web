'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { 
    ssr: false, 
    loading: () => (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0a', 
        color: '#fff' 
      }}>
        Loading Studio…
      </div>
    ) 
  }
);

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0a', 
        color: '#fff' 
      }}>
        Loading Studio…
      </div>
    );
  }

  return <NextStudio config={config} />;
}

