import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashCursor from "@/components/SplashCursor";
import AnalyticsNav from "@/components/AnalyticsNav";
import { usePageTracking } from "@/hooks/useAnalytics";
import { initEmailJS } from "@/lib/emailjs";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  // Track page views automatically
  usePageTracking();
  
  return (
    <>
      <AnalyticsNav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/analytics" component={Analytics} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize EmailJS with your public key
    initEmailJS();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SplashCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
