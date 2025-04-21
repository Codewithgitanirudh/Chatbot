'use client';
import { Message as MessageType } from './ChatLogic';
import LoadingIndicator from './loadingIndicator';
import Message from './message';
import Header from './header';
import InputArea from './inputArea';

interface ChatInterfaceProps {
  input: string;
  setInput: (value: string) => void;
  messages: MessageType[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  sendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInterface = ({
  input,
  setInput,
  messages,
  isLoading,
  messagesEndRef,
  sendMessage,
  handleKeyPress
}: ChatInterfaceProps) => {
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

export default ChatInterface;