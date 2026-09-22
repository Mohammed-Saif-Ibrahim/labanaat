import { Card, CardHeader, CardTitle, CardContent } from "@labanaat/ui/card";
import { Metric, MetricLabel, MetricValue, MetricDelta } from "@labanaat/ui/metric";
import { LineChart, BarChart } from "@labanaat/ui/chart";
import { Badge } from "@labanaat/ui/badge";
import { Avatar } from "@labanaat/ui/avatar";

const revenueData = [
  { month: "Jan", revenue: 18200, users: 1240 },
  { month: "Feb", revenue: 19800, users: 1390 },
  { month: "Mar", revenue: 21100, users: 1510 },
  { month: "Apr", revenue: 20400, users: 1470 },
  { month: "May", revenue: 24300, users: 1680 },
  { month: "Jun", revenue: 27900, users: 1920 },
];

const channelData = [
  { channel: "Organic", visits: 4200 },
  { channel: "Referral", visits: 1800 },
  { channel: "Social", visits: 2600 },
  { channel: "Paid", visits: 3100 },
];

const topCustomers = [
  { name: "Grace Hopper", plan: "Enterprise", mrr: "$1,240" },
  { name: "Alan Turing", plan: "Growth", mrr: "$680" },
  { name: "Katherine Johnson", plan: "Enterprise", mrr: "$1,240" },
];

export default function AnalyticsOverviewPage() {
  return (
    <div className="ui-flex ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Overview</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Last updated a few minutes ago.</p>
      </div>

      <div className="ui-grid ui-grid-cols-1 ui-gap-4 sm:ui-grid-cols-2 lg:ui-grid-cols-4">
        <Card><CardContent className="ui-pt-6">
          <Metric>
            <MetricLabel>Monthly recurring revenue</MetricLabel>
            <MetricValue>$27,900</MetricValue>
            <MetricDelta direction="up">+14.8% vs last month</MetricDelta>
          </Metric>
        </CardContent></Card>
        <Card><CardContent className="ui-pt-6">
          <Metric>
            <MetricLabel>Active users</MetricLabel>
            <MetricValue>1,920</MetricValue>
            <MetricDelta direction="up">+14.3%</MetricDelta>
          </Metric>
        </CardContent></Card>
        <Card><CardContent className="ui-pt-6">
          <Metric>
            <MetricLabel>Churn rate</MetricLabel>
            <MetricValue>2.1%</MetricValue>
            <MetricDelta direction="down">-0.4pts</MetricDelta>
          </Metric>
        </CardContent></Card>
        <Card><CardContent className="ui-pt-6">
          <Metric>
            <MetricLabel>Avg. session</MetricLabel>
            <MetricValue>6m 42s</MetricValue>
            <MetricDelta direction="neutral">No change</MetricDelta>
          </Metric>
        </CardContent></Card>
      </div>

      <div className="ui-grid ui-grid-cols-1 ui-gap-4 lg:ui-grid-cols-3">
        <Card className="lg:ui-col-span-2">
          <CardHeader><CardTitle>Revenue &amp; users</CardTitle></CardHeader>
          <CardContent>
            <LineChart data={revenueData} xKey="month" series={[{ key: "revenue", label: "Revenue" }, { key: "users", label: "Users" }]} height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Traffic by channel</CardTitle></CardHeader>
          <CardContent>
            <BarChart data={channelData} xKey="channel" series={[{ key: "visits" }]} height={280} showLegend={false} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Top customers</CardTitle></CardHeader>
        <CardContent>
          <div className="ui-flex ui-flex-col ui-divide-y ui-divide-[var(--ui-border)]">
            {topCustomers.map((c) => (
              <div key={c.name} className="ui-flex ui-items-center ui-gap-3 ui-py-3 first:ui-pt-0 last:ui-pb-0">
                <Avatar name={c.name} size="sm" />
                <span className="ui-flex-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{c.name}</span>
                <Badge variant={c.plan === "Enterprise" ? "primary" : "neutral"}>{c.plan}</Badge>
                <span className="ui-w-16 ui-text-right ui-font-mono ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{c.mrr}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
