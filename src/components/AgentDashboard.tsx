import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentStatus } from "./AgentStatus";
import { ConversationPanel } from "./ConversationPanel";
import { ToolExecutionPanel } from "./ToolExecutionPanel";
import { AWSServicesPanel } from "./AWSServicesPanel";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { Brain, MessageSquare, Wrench, Cloud, BarChart3, Settings } from "lucide-react";

export const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [agentStatus, setAgentStatus] = useState<"active" | "processing" | "idle" | "error">("active");

  // Simulate agent status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ["active", "processing", "idle"] as const;
      setAgentStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "conversation", label: "Agent Chat", icon: MessageSquare },
    { id: "tools", label: "Tool Execution", icon: Wrench },
    { id: "aws", label: "AWS Services", icon: Cloud },
    { id: "metrics", label: "Performance", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-agent-active rounded-full glow"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AWS AI Agent Hub
              </h1>
              <p className="text-muted-foreground">
                Powered by Amazon Bedrock & SageMaker AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AgentStatus status={agentStatus} />
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Always visible status cards */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Agent Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Agents</span>
                <Badge variant="secondary" className="bg-agent-active/20 text-agent-active border-agent-active/30">
                  3
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tasks Completed</span>
                <span className="font-medium text-foreground">847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Response Time</span>
                <span className="font-medium text-foreground">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-medium text-agent-active">98.5%</span>
              </div>
            </div>
          </Card>

          {/* AWS Services Status */}
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-semibold mb-4 text-foreground">AWS Services</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bedrock</span>
                <div className="w-2 h-2 bg-agent-active rounded-full glow"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SageMaker AI</span>
                <div className="w-2 h-2 bg-agent-active rounded-full glow"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lambda</span>
                <div className="w-2 h-2 bg-agent-active rounded-full glow"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">API Gateway</span>
                <div className="w-2 h-2 bg-agent-processing rounded-full glow"></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Panel - Dynamic content based on active tab */}
        <div className="lg:col-span-2">
          {activeTab === "conversation" && <ConversationPanel />}
          {activeTab === "tools" && <ToolExecutionPanel />}
          {activeTab === "aws" && <AWSServicesPanel />}
          {activeTab === "metrics" && <PerformanceMetrics />}
        </div>
      </div>
    </div>
  );
};