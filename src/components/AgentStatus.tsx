import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentStatusProps {
  status: "active" | "processing" | "idle" | "error";
}

export const AgentStatus = ({ status }: AgentStatusProps) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-agent-active/20 text-agent-active border-agent-active/30",
      dotClass: "bg-agent-active",
    },
    processing: {
      label: "Processing",
      className: "bg-agent-processing/20 text-agent-processing border-agent-processing/30",
      dotClass: "bg-agent-processing processing-spin",
    },
    idle: {
      label: "Idle",
      className: "bg-agent-idle/20 text-agent-idle border-agent-idle/30",
      dotClass: "bg-agent-idle",
    },
    error: {
      label: "Error",
      className: "bg-agent-error/20 text-agent-error border-agent-error/30",
      dotClass: "bg-agent-error",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("flex items-center gap-2", config.className)}>
      <div className={cn("w-2 h-2 rounded-full", config.dotClass)}></div>
      {config.label}
    </Badge>
  );
};