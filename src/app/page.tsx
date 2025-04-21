// src/app/page.tsx
'use client';

import ChatInterface from '@/components/home_components/ChatInterface';
import { useChatLogic } from '@/components/home_components/ChatLogic';
import LoadingIndicator from '@/components/home_components/loadingIndicator';

const Home = () => {
  const {
    input,
    setInput,
    messages,
    isLoading,
    user,
    messagesEndRef,
    sendMessage,
    handleKeyPress
  } = useChatLogic();

  if (!user) {
    return <LoadingIndicator />;
  }

  return (
    <ChatInterface
      input={input}
      setInput={setInput}
      messages={messages}
      isLoading={isLoading}
      messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
      sendMessage={sendMessage}
      handleKeyPress={handleKeyPress}
    />
  );
};

export default Home;