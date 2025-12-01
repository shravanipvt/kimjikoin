import React from 'react';
import Header from './components/Header';
import ChatList from './components/ChatList';
import ChatInput from './components/ChatInput';
import ProviderSelector from './components/ProviderSelector';
import useChat from './hooks/useChat';

export default function App() {
  const { messages, input, setInput, sendMessage, loading, toggleProvider, providers, strategy, setStrategy, clear } = useChat();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-rows-[auto,1fr,auto] h-[90vh]">
        <Header onClear={clear} />
        <main className="p-4 overflow-auto" style={{background: 'linear-gradient(180deg,#fbfdff,white)'}}>
          <ChatList messages={messages} />
        </main>

        <footer className="p-4 border-t grid grid-cols-[1fr,auto] gap-3 items-center">
          <div className="flex items-center gap-3">
            <ChatInput value={input} onChange={(v)=>setInput(v)} onSend={sendMessage} loading={loading} />
            <ProviderSelector providers={providers} toggleProvider={toggleProvider} />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <label className="text-xs text-gray-500">Strategy</label>
              <select value={strategy} onChange={(e)=>setStrategy(e.target.value)} className="border rounded px-2 py-1 text-sm">
                <option value="fanout">Fan-out</option>
                <option value="primary">Primary</option>
                <option value="chain">Chain</option>
              </select>
            </div>
            <button onClick={sendMessage} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
