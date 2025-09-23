"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Paperclip, Send, Bot, User, X } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function AI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Merhaba! Size nasıl yardımcı olabilirim?",
      role: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if ((!inputValue.trim() && !attachedFile) || isSending) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || (attachedFile ? `Dosya gönderildi: ${attachedFile.name}` : ""),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setAttachedFile(null);
    setIsSending(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: attachedFile 
          ? "Dosyanızı aldım. Ne hakkında yardımcı olabilirim?" 
          : "Bu bir demo yanıtıdır. Gerçek bir AI entegrasyonu için backend bağlantısı gereklidir.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsSending(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer" title="AI Assistant">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2 shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            <Bot className="text-white" size={24} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[420px] h-[550px] flex flex-col p-0 rounded-xl overflow-hidden border border-gray-200 shadow-2xl" 
        align="end"
        side="top"
        sideOffset={10}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1.5">
                <Bot className="text-white" size={18} />
              </div>
              <h4 className="font-semibold text-gray-800">AI Assistant</h4>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        
        {/* Messages area with gradient background */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-gray-50 p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  message.role === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none" 
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 mt-0.5">
                      <Bot className="text-white" size={14} />
                    </div>
                  )}
                  {message.role === "user" && (
                    <User className="text-white flex-shrink-0 mt-0.5" size={14} />
                  )}
                  <div className="text-sm">{message.content}</div>
                </div>
                <div 
                  className={`text-xs mt-2 ${
                    message.role === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          {attachedFile && (
            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded-lg">
              <Paperclip className="text-gray-500" size={16} />
              <span className="text-sm truncate flex-1">{attachedFile.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                onClick={removeAttachedFile}
              >
                <X size={14} />
              </Button>
            </div>
          )}
          
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                className="min-h-12 resize-none pr-12 pl-4 py-3 rounded-2xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                disabled={isSending}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 bottom-2 h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={handleFileAttach}
                disabled={isSending}
              >
                <Paperclip size={16} />
              </Button>
            </div>
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md"
              onClick={handleSend}
              disabled={isSending || (!inputValue.trim() && !attachedFile)}
            >
              <Send size={16} className="text-white" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-2 text-center">
            AI assistant, yazılım geliştirme konularında size yardımcı olabilir
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}