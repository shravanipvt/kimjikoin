import React from 'react';

function Bubble({ m }) {
  const isUser = m.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'} max-w-[75%] p-3 rounded-xl`}>
        <div className="text-sm whitespace-pre-wrap">{m.text}</div>
        <div className="text-xs text-gray-400 mt-1">{new Date(m.ts).toLocaleString()}</div>
      </div>
    </div>
  );
}

export default function ChatList({ messages=[] }) {
  return (
    <div className="space-y-4">
      {messages.map(m => <Bubble key={m.id} m={m} />)}
      <div id="messages-end" />
    </div>
  );
}
