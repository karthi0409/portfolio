import { 
  type User, 
  type InsertUser, 
  type PageView, 
  type InsertPageView,
  type ContactSubmission,
  type InsertContactSubmission,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  pageViews,
  contactSubmissions,
  analyticsEvents,
  users
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, gte } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Analytics methods
  createPageView(pageView: InsertPageView): Promise<PageView>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  
  // Analytics dashboard queries
  getPageViewsStats(): Promise<{
    totalViews: number;
    uniqueVisitors: number;
    topPages: Array<{ page: string; views: number }>;
    recentViews: PageView[];
  }>;
  
  getTrafficStats(): Promise<{
    totalViews: number;
    dailyViews: Array<{ date: string; views: number }>;
    topCountries: Array<{ country: string | null; views: number }>;
    topBrowsers: Array<{ browser: string | null; views: number }>;
    topDevices: Array<{ device: string | null; views: number }>;
  }>;
  
  getContactStats(): Promise<{
    totalSubmissions: number;
    recentSubmissions: ContactSubmission[];
    dailySubmissions: Array<{ date: string; submissions: number }>;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createPageView(pageView: InsertPageView): Promise<PageView> {
    const [view] = await db
      .insert(pageViews)
      .values(pageView)
      .returning();
    return view;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [sub] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return sub;
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [evt] = await db
      .insert(analyticsEvents)
      .values(event)
      .returning();
    return evt;
  }

  async getPageViewsStats() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Total views
    const [{ count: totalViews }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(pageViews);

    // Unique visitors (by sessionId)
    const [{ count: uniqueVisitors }] = await db
      .select({ count: sql<number>`cast(count(distinct session_id) as int)` })
      .from(pageViews);

    // Top pages
    const topPages = await db
      .select({
        page: pageViews.page,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .groupBy(pageViews.page)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    // Recent views
    const recentViews = await db
      .select()
      .from(pageViews)
      .orderBy(desc(pageViews.timestamp))
      .limit(10);

    return {
      totalViews: totalViews || 0,
      uniqueVisitors: uniqueVisitors || 0,
      topPages: topPages || [],
      recentViews: recentViews || [],
    };
  }

  async getTrafficStats() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Total views
    const [{ count: totalViews }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(pageViews);

    // Daily views for last 7 days
    const dailyViews = await db
      .select({
        date: sql<string>`date(timestamp)`,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, sevenDaysAgo))
      .groupBy(sql`date(timestamp)`)
      .orderBy(sql`date(timestamp)`);

    // Top countries
    const topCountries = await db
      .select({
        country: pageViews.country,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(sql`country IS NOT NULL`)
      .groupBy(pageViews.country)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    // Top browsers
    const topBrowsers = await db
      .select({
        browser: pageViews.browser,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(sql`browser IS NOT NULL`)
      .groupBy(pageViews.browser)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    // Top devices
    const topDevices = await db
      .select({
        device: pageViews.device,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(sql`device IS NOT NULL`)
      .groupBy(pageViews.device)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    return {
      totalViews: totalViews || 0,
      dailyViews: dailyViews || [],
      topCountries: topCountries || [],
      topBrowsers: topBrowsers || [],
      topDevices: topDevices || [],
    };
  }

  async getContactStats() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Total submissions
    const [{ count: totalSubmissions }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(contactSubmissions);

    // Recent submissions
    const recentSubmissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.timestamp))
      .limit(10);

    // Daily submissions for last 7 days
    const dailySubmissions = await db
      .select({
        date: sql<string>`date(timestamp)`,
        submissions: sql<number>`cast(count(*) as int)`,
      })
      .from(contactSubmissions)
      .where(gte(contactSubmissions.timestamp, sevenDaysAgo))
      .groupBy(sql`date(timestamp)`)
      .orderBy(sql`date(timestamp)`);

    return {
      totalSubmissions: totalSubmissions || 0,
      recentSubmissions: recentSubmissions || [],
      dailySubmissions: dailySubmissions || [],
    };
  }
}

export const storage = new DatabaseStorage();
