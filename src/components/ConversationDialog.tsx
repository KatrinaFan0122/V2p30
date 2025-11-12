import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

// AI Icon component matching the Nudge icon from Guidelines.md
const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M9.663 17.004C10.133 17.669 10.99 18 12 18s1.867-.331 2.337-.996M12 20.996C17.523 20.996 22 16.519 22 10.996S17.523 1 12 1 2 5.473 2 10.996c0 4.106 2.378 7.636 5.807 9.167"
    />
  </svg>
);

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  typing?: boolean;
}

const conversationFlow = [
  {
    aiQuestion: "我们从几个基本信息开始吧。请问你目前所在的城市是哪里？",
    userAnswer: "上海",
  },
  {
    aiQuestion: "收到！你的工作年限大概是多久呢？",
    userAnswer: "8 年左右",
  },
  {
    aiQuestion: "明白了。那除了我们正在聊的这个创业想法，你手上是否还有其他在同步进行的项目？",
    userAnswer: "还有一个兼职的设计项目",
  },
  {
    aiQuestion: "好的。如果让你为手上的事情排个优先级，这个创业想法大概能排在第几呢？（例如：1。最重要， 2。比较重要， 3。一般）",
    userAnswer: "1。 最重要",
  },
  {
    aiQuestion: "太好了！我已经了解你的基本背景了。你对这个创业想法的投入决心让我印象深刻。接下来，让我们深入探讨一下你的创业策略吧！",
    userAnswer: null, // No user answer, this is the final message
  },
];

export function ConversationDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start the conversation with the first AI message
    if (messages.length === 0) {
      addAIMessage(0);
    }
  }, []);

  const addAIMessage = (stepIndex: number) => {
    if (stepIndex >= conversationFlow.length) return;

    setIsTyping(true);
    
    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'ai',
      content: '',
      typing: true,
    }]);

    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== typingId));
      
      const newMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: conversationFlow[stepIndex].aiQuestion,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      // Check if this is the final message
      if (conversationFlow[stepIndex].userAnswer === null) {
        setShowCompletion(true);
        // Auto-navigate after 3 seconds
        setTimeout(() => {
          alert('正在跳转至"个人创业策略"问卷页...');
          // In a real app, you would navigate to the next page here
        }, 3000);
      } else {
        // Pre-fill the input with the expected answer for demo purposes
        setTimeout(() => {
          setInputValue(conversationFlow[stepIndex].userAnswer || '');
          inputRef.current?.focus();
        }, 500);
      }
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || showCompletion) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // Add next AI message after a brief delay
    setTimeout(() => {
      addAIMessage(nextStep);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Floating Dialog Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#3B82F6]">
        {/* Header with Step Indicator */}
        <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full ai-gradient-fill flex items-center justify-center text-white">
                <AIIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[#1F2937]">Co-Fo</h2>
                <p className="text-sm text-[#9CA3AF]">你的 AI 联合创始人</p>
              </div>
            </div>
            <div className="text-sm text-[#9CA3AF]">
              <span className="text-[#3B82F6]">步骤 1/3:</span> 你的背景信息
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[500px] overflow-y-auto px-6 py-6 bg-white">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'ai' && (
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full ai-gradient-fill flex-shrink-0 flex items-center justify-center text-white">
                      <AIIcon className="w-5 h-5" />
                    </div>
                    <div className="bg-[#F9FAFB] rounded-2xl rounded-tl-sm px-4 py-3 border border-[#E5E7EB]">
                      {message.typing ? (
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <p className="text-[#1F2937]">{message.content}</p>
                      )}
                    </div>
                  </div>
                )}
                {message.role === 'user' && (
                  <div className="bg-[#3B82F6] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p>{message.content}</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#E5E7EB] px-6 py-4 bg-[#F9FAFB]">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={showCompletion ? "对话已完成" : "输入你的回答..."}
              disabled={isTyping || showCompletion}
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-[#D1D5DB] text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || showCompletion}
              className="px-5 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-2">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
}
