// src/components/Message.tsx
import React from 'react';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 shadow-md'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default Message;