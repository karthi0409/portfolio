import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertPageViewSchema, 
  insertContactSubmissionSchema, 
  insertAnalyticsEventSchema 
} from "@shared/schema";

function getClientIP(req: any): string {
  return req.ip || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         req.headers['x-forwarded-for']?.split(',')[0] ||
         'unknown';
}

function getBrowserInfo(userAgent: string) {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
}

function getDeviceInfo(userAgent: string) {
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'Mobile';
  if (/Tablet|iPad/.test(userAgent)) return 'Tablet';
  return 'Desktop';
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics tracking endpoints
  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const data = insertPageViewSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
        ipAddress: getClientIP(req),
        referrer: req.headers.referer || null,
        browser: getBrowserInfo(req.headers['user-agent'] || ''),
        device: getDeviceInfo(req.headers['user-agent'] || ''),
      });

      const pageView = await storage.createPageView(data);
      res.json({ success: true, id: pageView.id });
    } catch (error) {
      console.error('Error tracking page view:', error);
      res.status(400).json({ error: 'Invalid page view data' });
    }
  });

  app.post("/api/analytics/contact", async (req, res) => {
    try {
      const data = insertContactSubmissionSchema.parse({
        ...req.body,
        ipAddress: getClientIP(req),
      });

      const submission = await storage.createContactSubmission(data);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error('Error tracking contact submission:', error);
      res.status(400).json({ error: 'Invalid contact data' });
    }
  });

  app.post("/api/analytics/event", async (req, res) => {
    try {
      const data = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.createAnalyticsEvent(data);
      res.json({ success: true, id: event.id });
    } catch (error) {
      console.error('Error tracking analytics event:', error);
      res.status(400).json({ error: 'Invalid event data' });
    }
  });

  // Analytics dashboard endpoints
  app.get("/api/analytics/overview", async (req, res) => {
    try {
      const [pageViewsStats, trafficStats, contactStats] = await Promise.all([
        storage.getPageViewsStats(),
        storage.getTrafficStats(),
        storage.getContactStats(),
      ]);

      res.json({
        pageViews: pageViewsStats,
        traffic: trafficStats,
        contacts: contactStats,
      });
    } catch (error) {
      console.error('Error fetching analytics overview:', error);
      res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
  });

  app.get("/api/analytics/pageviews", async (req, res) => {
    try {
      const stats = await storage.getPageViewsStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching page views:', error);
      res.status(500).json({ error: 'Failed to fetch page views data' });
    }
  });

  app.get("/api/analytics/traffic", async (req, res) => {
    try {
      const stats = await storage.getTrafficStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching traffic stats:', error);
      res.status(500).json({ error: 'Failed to fetch traffic data' });
    }
  });

  app.get("/api/analytics/contacts", async (req, res) => {
    try {
      const stats = await storage.getContactStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      res.status(500).json({ error: 'Failed to fetch contact data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
