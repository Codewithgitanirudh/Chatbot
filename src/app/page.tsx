// src/app/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingIndicator from '@/components/home_components/loadingIndicator';
import Message from '@/components/home_components/message';
import Header from '@/components/home_components/header';
import InputArea from '@/components/home_components/inputArea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Home = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth?mode=signin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) {
    return <LoadingIndicator />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow max-w-4xl w-full mx-auto pt-20 pb-24 px-4">
        <div className="space-y-4 mt-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>👋 Hi! I'm your AI assistant. How can I help you today?</p>
            </div>
          )}

          {messages.map((message, index) => (
            <Message key={index} role={message.role} content={message.content} />
          ))}

          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <InputArea
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isLoading={isLoading}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Home;