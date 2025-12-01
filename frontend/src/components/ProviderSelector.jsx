import React from 'react';

export default function ProviderSelector({ providers, toggleProvider }) {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <label className="flex items-center gap-2"><input type="checkbox" checked={providers.openai} onChange={()=>toggleProvider('openai')} />OpenAI</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={providers.gemini} onChange={()=>toggleProvider('gemini')} />Gemini</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={providers.grok} onChange={()=>toggleProvider('grok')} />Grok</label>
    </div>
  );
}
