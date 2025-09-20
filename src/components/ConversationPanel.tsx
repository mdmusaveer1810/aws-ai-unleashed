import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Brain, Zap, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  tools?: string[];
  reasoning?: string;
}

export const ConversationPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "AWS AI Agent initialized with Bedrock and SageMaker AI connectivity.",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      type: "user",
      content: "Analyze the performance metrics from our Lambda functions and suggest optimizations.",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      type: "agent",
      content: "I'll analyze your Lambda performance metrics. Based on the data from CloudWatch, I found several optimization opportunities:\n\n1. Memory allocation can be optimized for functions with < 50% utilization\n2. Cold start times can be reduced by implementing provisioned concurrency\n3. Three functions show timeout patterns that suggest async operations could be optimized",
      timestamp: new Date(Date.now() - 180000),
      tools: ["CloudWatch API", "Lambda Analytics", "Cost Calculator"],
      reasoning: "Analyzed CloudWatch metrics, identified patterns in execution times and memory usage, cross-referenced with cost optimization best practices.",
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsProcessing(true);

    // Simulate agent processing
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "I'm processing your request using Amazon Bedrock's reasoning capabilities. Let me analyze the data and provide you with actionable insights.",
        timestamp: new Date(),
        tools: ["Bedrock Claude", "SageMaker AI", "AWS API"],
        reasoning: "Analyzing user request, gathering relevant data from AWS services, applying machine learning models for optimization recommendations.",
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const MessageIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />;
      case "agent":
        return <Bot className="h-4 w-4 text-primary" />;
      default:
        return <Brain className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="h-[600px] bg-gradient-card border-0 shadow-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Agent Conversation
        </h3>
        <p className="text-sm text-muted-foreground">
          Interact with your AI agent powered by AWS Bedrock
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : message.type === "agent"
                    ? "bg-gradient-primary text-primary-foreground agent-pulse"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <MessageIcon type={message.type} />
                </div>
              </div>
              
              <div className={`max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                <div className={`p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.tools && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {message.reasoning && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                      <strong>Reasoning:</strong> {message.reasoning}
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center agent-pulse">
                <Bot className="h-4 w-4 text-primary-foreground processing-spin" />
              </div>
              <div className="bg-secondary p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Agent is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask your AI agent anything..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isProcessing}
            className="bg-background"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isProcessing || !newMessage.trim()}
            className="bg-gradient-primary shadow-glow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};