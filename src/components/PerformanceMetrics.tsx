import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target, 
  Activity,
  Users,
  AlertCircle
} from "lucide-react";

export const PerformanceMetrics = () => {
  const metrics = [
    {
      title: "Response Time",
      value: "1.2s",
      change: "-15%",
      trend: "down",
      icon: Clock,
      description: "Average agent response time",
      target: "< 2s",
      status: "good"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+2.1%",
      trend: "up", 
      icon: Target,
      description: "Task completion success rate",
      target: "> 95%",
      status: "excellent"
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Users interacting with agents",
      target: "Growing",
      status: "good"
    },
    {
      title: "Error Rate",
      value: "0.8%",
      change: "-45%",
      trend: "down",
      icon: AlertCircle,
      description: "Agent execution errors",
      target: "< 2%",
      status: "good"
    },
    {
      title: "Processing Speed",
      value: "847ms",
      change: "-8%",
      trend: "down",
      icon: Zap,
      description: "Average processing time",
      target: "< 1s",
      status: "good"
    },
    {
      title: "Throughput",
      value: "1.2K/min",
      change: "+25%",
      trend: "up",
      icon: Activity,
      description: "Requests processed per minute",
      target: "Growing",
      status: "excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-agent-active/20 text-agent-active border-agent-active/30";
      case "good":
        return "bg-agent-processing/20 text-agent-processing border-agent-processing/30";
      case "warning":
        return "bg-agent-error/20 text-agent-error border-agent-error/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-agent-active" : "text-agent-processing";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-4 bg-gradient-card border-0 shadow-card">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Performance Analytics
        </h3>
        <p className="text-muted-foreground">
          Real-time metrics and KPIs for your AI agent system
        </p>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="p-4 bg-gradient-card border-0 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline" className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{metric.title}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className={`text-sm flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                    <TrendingUp className={`h-3 w-3 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground font-medium">{metric.target}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4">Performance Trends</h4>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Performance charts will be displayed here</p>
            <p className="text-sm text-muted-foreground">Integration with AWS CloudWatch metrics</p>
          </div>
        </div>
      </Card>

      {/* System Health */}
      <Card className="p-4 bg-gradient-card border-0 shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4">System Health</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">CPU Usage</span>
              <span className="text-foreground font-medium">23%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Memory Usage</span>
              <span className="text-foreground font-medium">67%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Network I/O</span>
              <span className="text-foreground font-medium">1.2 GB/s</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active Connections</span>
              <span className="text-foreground font-medium">847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Queue Depth</span>
              <span className="text-foreground font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span className="text-foreground font-medium">99.9%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};