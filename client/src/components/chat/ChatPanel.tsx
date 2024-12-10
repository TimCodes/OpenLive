import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createMockWebSocket } from '@/lib/websocket';
import { ChatMessage, mockEmotes } from '@/lib/mock-data';

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [showEmotes, setShowEmotes] = useState(false);
  const [emoteFilter, setEmoteFilter] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = createMockWebSocket();
    ws.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => ws.close();
  }, []);

  const filteredEmotes = Object.entries(mockEmotes)
    .filter(([name]) => name.toLowerCase().includes(emoteFilter.toLowerCase()))
    .slice(0, 5);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36),
      user: 'You',
      message: input,
      timestamp: new Date(),
      color: '#FFFFFF'
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const formatMessage = (message: string) => {
    return message.split(' ').map((word, i) => {
      const emote = mockEmotes[word as keyof typeof mockEmotes];
      return emote ? (
        <span key={i} className="text-2xl">{emote}</span>
      ) : (
        <span key={i}>{word} </span>
      );
    });
  };

  return (
    <div className="w-96 flex flex-col h-full bg-zinc-900 border-l border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-semibold">Stream Chat</h2>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span style={{ color: msg.color }} className="font-medium">
              {msg.user}:
            </span>{' '}
            <span className="text-sm">{formatMessage(msg.message)}</span>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t border-zinc-800">
        <div className="relative">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                const lastWord = e.target.value.split(' ').pop() || '';
                if (lastWord.startsWith(':')) {
                  setEmoteFilter(lastWord.substring(1));
                  setShowEmotes(true);
                } else {
                  setShowEmotes(false);
                }
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message"
            />
            <Button onClick={handleSend}>Chat</Button>
          </div>
          
          {showEmotes && filteredEmotes.length > 0 && (
            <div className="absolute bottom-full mb-2 w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden">
              {filteredEmotes.map(([name, emote]) => (
                <button
                  key={name}
                  className="flex items-center gap-2 w-full p-2 hover:bg-zinc-800 text-left"
                  onClick={() => {
                    const words = input.split(' ');
                    words[words.length - 1] = name;
                    setInput(words.join(' ') + ' ');
                    setShowEmotes(false);
                    inputRef.current?.focus();
                  }}
                >
                  <span className="text-2xl">{emote}</span>
                  <span className="text-sm">{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
