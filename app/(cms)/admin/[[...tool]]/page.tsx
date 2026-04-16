'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

// Use client-component entry — avoids NextStudioWithBridge’s `preloadModule()` during render,
// which triggers "flushSync was called from inside a lifecycle method" on React 19 + Turbopack.
const NextStudio = dynamic(
  () => import('next-sanity/studio/client-component').then((mod) => mod.NextStudio),
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

