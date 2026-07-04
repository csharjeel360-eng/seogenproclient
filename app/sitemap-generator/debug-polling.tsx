import React, { useEffect } from 'react';

export default function DebugPolling() {
  useEffect(() => {
    async function testPoll() {
      try {
        const response = await fetch('http://localhost:3000/api/saas/sitemap/status/57', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        console.log('[DebugPolling] success', data);
      } catch (err) {
        console.error('[DebugPolling] failed', err);
      }
    }
    testPoll();
  }, []);

  return <div>Debug polling loaded</div>;
}
