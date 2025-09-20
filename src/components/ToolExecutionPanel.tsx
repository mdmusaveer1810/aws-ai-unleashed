import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Wrench, 
  Database, 
  Search, 
  Calculator, 
  FileText, 
  Cloud, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play
} from "lucide-react";

interface ToolExecution {
  id: string;
  name: string;
  type: "api" | "database" | "computation" | "aws_service";
  status: "running" | "completed" | "failed" | "queued";
  progress: number;
  startTime: Date;
  duration?: number;
  result?: string;
  error?: string;
}

export const ToolExecutionPanel = () => {
  const [executions, setExecutions] = useState<ToolExecution[]>([
    {
      id: "1",
      name: "CloudWatch Metrics Analysis",
      type: "aws_service",
      status: "completed",
      progress: 100,
      startTime: new Date(Date.now() - 300000),
      duration: 2400,
      result: "Analyzed 847 data points, identified 3 optimization opportunities",
    },
    {
      id: "2",
      name: "Lambda Performance Query",
      type: "database",
      status: "running",
      progress: 65,
      startTime: new Date(Date.now() - 45000),
    },
    {
      id: "3",
      name: "Cost Optimization Calculator",
      type: "computation",
      status: "queued",
      progress: 0,
      startTime: new Date(),
    },
  ]);

  // Simulate tool execution progress
  useEffect(() => {
    const interval = setInterval(() => {
      setExecutions(prev => 
        prev.map(exec => {
          if (exec.status === "running" && exec.progress < 100) {
            const newProgress = Math.min(exec.progress + Math.random() * 15, 100);
            if (newProgress >= 100) {
              return {
                ...exec,
                progress: 100,
                status: "completed" as const,
                duration: Date.now() - exec.startTime.getTime(),
                result: "Process completed successfully",
              };
            }
            return { ...exec, progress: newProgress };
          }
          if (exec.status === "queued") {
            return { ...exec, status: "running" as const, progress: 5 };
          }
          return exec;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getToolIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Search className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "computation":
        return <Calculator className="h-4 w-4" />;
      case "aws_service":
        return <Cloud className="h-4 w-4" />;
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-agent-active" />;
      case "running":
        return <Play className="h-4 w-4 text-agent-processing processing-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-agent-error" />;
      case "queued":
        return <Clock className="h-4 w-4 text-agent-idle" />;
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-agent-active/20 text-agent-active border-agent-active/30";
      case "running":
        return "bg-agent-processing/20 text-agent-processing border-agent-processing/30";
      case "failed":
        return "bg-agent-error/20 text-agent-error border-agent-error/30";
      case "queued":
        return "bg-agent-idle/20 text-agent-idle border-agent-idle/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-[600px] bg-gradient-card border-0 shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Tool Execution Monitor
        </h3>
        <p className="text-sm text-muted-foreground">
          Real-time monitoring of agent tool usage and API integrations
        </p>
      </div>

      {/* Execution List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {executions.map((execution) => (
            <Card key={execution.id} className="p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {getToolIcon(execution.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground truncate">
                      {execution.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(execution.status)}>
                        {getStatusIcon(execution.status)}
                        <span className="ml-1 capitalize">{execution.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Progress value={execution.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground min-w-0">
                        {Math.round(execution.progress)}%
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Started: {execution.startTime.toLocaleTimeString()}</span>
                      {execution.duration && (
                        <span>Duration: {(execution.duration / 1000).toFixed(1)}s</span>
                      )}
                    </div>
                    
                    {execution.result && (
                      <div className="p-2 bg-agent-active/10 rounded text-sm text-agent-active">
                        <FileText className="h-3 w-3 inline mr-1" />
                        {execution.result}
                      </div>
                    )}
                    
                    {execution.error && (
                      <div className="p-2 bg-agent-error/10 rounded text-sm text-agent-error">
                        <AlertCircle className="h-3 w-3 inline mr-1" />
                        {execution.error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};