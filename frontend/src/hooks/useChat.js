import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

export default function useChat() {
  const [messages, setMessages] = useState([{
    id: 'sys-1',
    role: 'system',
    text: "Hi — I'm Kimjikoin, your multi-model AI companion. Ask me anything!",
    ts: Date.now()
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState({ openai: true, gemini: true, grok: true });
  const [strategy, setStrategy] = useState('fanout');

  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages, loading]);

  function addMessage(m) {
    setMessages(prev => [...prev, { ...m, id: `${m.role}-${Date.now()}` }]);
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input.trim(), ts: Date.now() };
    addMessage(userMsg);
    setInput('');
    const placeholderId = `assistant-typing-${Date.now()}`;
    addMessage({ id: placeholderId, role: 'assistant', text: 'Thinking...', ts: Date.now(), meta:{loading:true}});
    setLoading(true);

    try {
      const body = {
        prompt: userMsg.text,
        strategy,
        providers: Object.keys(providers).filter(p=>providers[p]),
        conversation: messages.slice(-12).map(m=>({ role:m.role, content:m.text }))
      };
      const res = await api.post('/api/ai', body);
      // remove placeholder
      setMessages(ms => ms.filter(m => !(m.meta && m.meta.loading)));
      if (res.combined) {
        addMessage({ role:'assistant', text: res.combined, ts: Date.now(), meta:{combined:true} });
      } else if (Array.isArray(res.results)) {
        res.results.forEach(r => addMessage({ role:'assistant', text:`[${r.provider}] ${r.text}`, ts: Date.now(), meta:{provider: r.provider}}));
      } else {
        addMessage({ role:'assistant', text: 'Sorry — no response from server.', ts: Date.now() });
      }
    } catch (err) {
      setMessages(ms => ms.filter(m => !(m.meta && m.meta.loading)));
      addMessage({ role:'assistant', text: `Error: ${err.message}`, ts: Date.now(), meta:{error:true} });
    } finally {
      setLoading(false);
    }
  }

  function toggleProvider(p) { setProviders(prev => ({ ...prev, [p]: !prev[p] })); }
  function clear() { setMessages([{ id:'sys-1', role:'system', text: "Hi — I'm Kimjikoin, your multi-model AI companion. Ask me anything!", ts:Date.now()}]); }

  return { messages, input, setInput, sendMessage, loading, toggleProvider, providers, strategy, setStrategy, clear, endRef };
}
