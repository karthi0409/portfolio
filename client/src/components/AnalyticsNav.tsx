import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AnalyticsNav() {
  const [location] = useLocation();
  
  // Only show analytics nav when not already on analytics page
  if (location === '/analytics') {
    return (
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            ← Back to Portfolio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <Link href="/analytics">
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </Link>
    </div>
  );
}