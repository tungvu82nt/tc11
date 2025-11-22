import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface WarningSignCardProps {
  title: string;
  description: string;
  delay?: number;
}

const WarningSignCard = ({ title, description, delay = 0 }: WarningSignCardProps) => {
  return (
    <Card 
      className="h-full overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-l-accent animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary animate-pulse" />
          <Badge variant="outline" className="text-xs font-normal animate-fade-in">
            Dấu hiệu
          </Badge>
        </div>
        <CardTitle className="text-xl text-foreground hover:text-accent transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-muted-foreground hover:text-foreground transition-colors duration-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default WarningSignCard;
