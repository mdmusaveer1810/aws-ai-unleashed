import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cloud, 
  Database, 
  Cpu, 
  Zap, 
  HardDrive, 
  Shield, 
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

interface AWSService {
  name: string;
  status: "healthy" | "warning" | "error";
  usage: number;
  cost: string;
  description: string;
  icon: any;
  metrics: {
    requests: string;
    latency: string;
    errors: string;
  };
}

export const AWSServicesPanel = () => {
  const services: AWSService[] = [
    {
      name: "Amazon Bedrock",
      status: "healthy",
      usage: 87,
      cost: "$234.56",
      description: "Foundation models for AI agent reasoning",
      icon: Cpu,
      metrics: {
        requests: "12.3K",
        latency: "120ms",
        errors: "0.02%"
      }
    },
    {
      name: "SageMaker AI",
      status: "healthy", 
      usage: 65,
      cost: "$156.78",
      description: "Custom ML models and inference endpoints",
      icon: TrendingUp,
      metrics: {
        requests: "8.7K",
        latency: "95ms",
        errors: "0.01%"
      }
    },
    {
      name: "AWS Lambda",
      status: "warning",
      usage: 92,
      cost: "$89.34",
      description: "Serverless compute for agent functions",
      icon: Zap,
      metrics: {
        requests: "45.2K",
        latency: "250ms",
        errors: "0.15%"
      }
    },
    {
      name: "Amazon S3",
      status: "healthy",
      usage: 43,
      cost: "$23.45",
      description: "Storage for agent data and models",
      icon: HardDrive,
      metrics: {
        requests: "2.1K",
        latency: "45ms",
        errors: "0.00%"
      }
    },
    {
      name: "API Gateway",
      status: "healthy",
      usage: 78,
      cost: "$67.89",
      description: "API endpoints for agent communication",
      icon: Shield,
      metrics: {
        requests: "34.5K",
        latency: "75ms",
        errors: "0.03%"
      }
    },
    {
      name: "DynamoDB",
      status: "healthy",
      usage: 56,
      cost: "$45.67",
      description: "Agent state and conversation storage",
      icon: Database,
      metrics: {
        requests: "18.9K",
        latency: "12ms",
        errors: "0.00%"
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-4 w-4 text-agent-active" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-agent-processing" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-agent-error" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-agent-active/20 text-agent-active border-agent-active/30";
      case "warning":
        return "bg-agent-processing/20 text-agent-processing border-agent-processing/30";
      case "error":
        return "bg-agent-error/20 text-agent-error border-agent-error/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalCost = services.reduce((sum, service) => 
    sum + parseFloat(service.cost.replace('$', '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cloud className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-2xl font-bold text-foreground">${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-agent-active/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-agent-active" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Healthy Services</p>
              <p className="text-2xl font-bold text-foreground">
                {services.filter(s => s.status === "healthy").length}/{services.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-agent-processing/10 flex items-center justify-center">
              <Activity className="h-5 w-5 text-agent-processing" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(services.reduce((sum, s) => sum + s.usage, 0) / services.length)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Services List */}
      <Card className="bg-gradient-card border-0 shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              AWS Services Status
            </h3>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.name} className="p-4 bg-background/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{service.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(service.status)}>
                            {getStatusIcon(service.status)}
                            <span className="ml-1 capitalize">{service.status}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Usage</span>
                          <span className="font-medium">{service.usage}%</span>
                        </div>
                        <Progress value={service.usage} />
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Cost</p>
                            <p className="font-medium text-foreground">{service.cost}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Requests</p>
                            <p className="font-medium text-foreground">{service.metrics.requests}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Latency</p>
                            <p className="font-medium text-foreground">{service.metrics.latency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Error Rate</p>
                            <p className="font-medium text-foreground">{service.metrics.errors}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};