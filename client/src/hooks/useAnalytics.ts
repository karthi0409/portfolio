import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// Generate a unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Get or create session ID from sessionStorage
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

export function usePageTracking() {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);
}

export async function trackPageView(page: string) {
  try {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
}

export async function trackContactSubmission(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await fetch('/api/analytics/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.warn('Failed to track contact submission:', error);
  }
}

export async function trackEvent(eventType: string, eventData?: any) {
  try {
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        eventData,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    console.warn('Failed to track event:', error);
  }
}