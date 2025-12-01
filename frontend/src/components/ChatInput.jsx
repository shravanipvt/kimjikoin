import React from 'react';

export default function ChatInput({ value, onChange, onSend, loading }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <textarea
        rows={1}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        onKeyDown={(e)=>{ if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } }}
        placeholder="Ask Kimjikoin anything..."
        className="w-full p-3 rounded-lg border resize-none"
      />
    </div>
  );
}
