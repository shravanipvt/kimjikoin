import React from 'react';

export default function Header({ onClear }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">K</div>
        <div>
          <div className="font-semibold">Kimjikoin</div>
          <div className="text-xs text-gray-500">Multi-model AI companion — OpenAI • Gemini • Grok</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onClear} className="text-sm px-3 py-1 rounded-md border">New chat</button>
      </div>
    </header>
  );
}
