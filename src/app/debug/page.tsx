'use client';

import { useContent } from '@/context/ContentContext';
import { generateSlug, findNewsBySlug } from '@/lib/slugUtils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const { news } = useContent();
  const [debugInfo, setDebugInfo] = useState('Loading context...');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      originalLog(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      if (message.includes('[ContentContext]')) {
        setLogs(prev => [...prev, message]);
      }
    };

    console.error = (...args) => {
      originalError(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      if (message.includes('[ContentContext]')) {
        setLogs(prev => [...prev, '❌ ' + message]);
      }
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    if (news) {
      const info = {
        totalNews: news.length,
        newsItems: news.map(n => ({
          id: n.id,
          title: n.title,
          generatedSlug: generateSlug(n.title),
          testMatch: findNewsBySlug(news, generateSlug(n.title)) ? 'MATCH ✓' : 'NO MATCH ✗'
        }))
      };
      setDebugInfo(JSON.stringify(info, null, 2));
    }
  }, [news]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🐛 Debug: News System</h1>
      
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-lg font-semibold mb-2">📊 Data Status</h2>
        <p className="text-sm">
          <strong>Total news items:</strong> <span className={news && news.length > 0 ? 'text-green-600 font-bold' : 'text-red-600'}>{news?.length || 0}</span>
        </p>
        {news && news.length > 0 && (
          <p className="text-sm text-green-600 mt-2">✓ News data loaded successfully!</p>
        )}
        {news && news.length === 0 && (
          <p className="text-sm text-red-600 mt-2">✗ No news data loaded</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">📋 Console Logs</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-auto max-h-48">
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <div key={i} className="font-mono">{log}</div>
            ))
          ) : (
            <p className="text-gray-500">Waiting for logs...</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">🔍 Debug Info</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
          {debugInfo}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">🔗 Test Links</h2>
        {news && news.length > 0 ? (
          <ul className="space-y-2">
            {news.map((item) => (
              <li key={item.id}>
                <Link 
                  href={`/news/${generateSlug(item.title)}`}
                  className="text-blue-600 hover:underline text-sm font-mono"
                >
                  ➜ {item.title}
                </Link>
                <div className="text-xs text-gray-500 ml-4">/news/{generateSlug(item.title)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">❌ No news items to test</p>
        )}
      </div>

      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-lg font-semibold mb-2">⚠️ If no news appears:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Check console (F12) for errors</li>
          <li>Verify Firebase credentials in .env.local</li>
          <li>Check if 'news' collection exists in Firestore</li>
          <li>Ensure Firestore Rules allow read access</li>
        </ol>
      </div>

      <div>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
