import {
  Button, Card, CardHeader, CardTitle, CardDescription, CardContent,
  Avatar, Badge, Switch, Select, Tabs, TabsList, TabsTrigger, TabsContent,
  ProgressBar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Checkbox, Alert, Separator, Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  LineChart, ActivityFeed, ActivityItem, ActivityAvatar, ActivityContent, ActivityText, ActivityTime,
} from "@labanaat/ui";
import { CodeBlock, K, S, C } from "./code-block";
import { Reveal } from "./reveal";
import { Glow } from "./glow";
import { ThemeCompare } from "./theme-compare";
import { SiteFooter } from "./site-footer";
import { KanbanShowcase, FilterBuilderShowcase } from "./advanced-showcase";

const stack = ["React 19", "TypeScript", "Tailwind CSS", "Radix Primitives"];

const stats = [
  { value: "47", label: "components" },
  { value: "16", label: "built on Radix primitives" },
  { value: "31", label: "composed from scratch or a purpose-fit library" },
  { value: "0", label: "required config to start" },
];

const painPoints = [
  {
    title: "Rebuilding the same 30 components",
    body: "Every new product starts with a button, a dialog, a dropdown — built from scratch, styled by hand, accessibility bolted on later if at all. Labanaat starts you past that point, with the boring 80% already solved correctly.",
  },
  {
    title: "A design system that fights your brand",
    body: "Most libraries hardcode their look and dare you to override it with !important. Labanaat has no opinion about your brand — every color, radius, and shadow is a variable you own, from day one, not after a painful migration.",
  },
  {
    title: "Accessibility as an afterthought",
    body: "Keyboard traps, missing focus states, unlabeled icon buttons — the usual result of bolting a11y on at the end. Here it's part of the component's definition of done, with a CI pipeline that runs the full axe-core sweep on every change, not audited once a year.",
  },
  {
    title: "Documentation that lies about the API",
    body: "Docs that drift from the real props the moment someone ships a fix. Every component page here renders the actual, currently-published component — if the docs show it, that's what you get when you install it.",
  },
];

const workflow = [
  {
    step: "1. Install",
    body: "One package, scoped entry points per component so your bundler only ships what you import.",
    code: (
      <>
        $ npm install <S>@labanaat/ui</S>
      </>
    ),
  },
  {
    step: "2. Import",
    body: "No provider soup, no config file. Import the stylesheet once, then components as you need them.",
    code: (
      <>
        <K>import</K> {"{ Button }"} <K>from</K> <S>"@labanaat/ui/button"</S>;
      </>
    ),
  },
  {
    step: "3. Theme it",
    body: "Override the tokens that matter to you. Everything else — hover states, focus rings, dark mode — follows automatically.",
    code: (
      <>
        <K>--ui-primary</K>: <S>#e11d48</S>;
      </>
    ),
  },
];

export default function LandingPage() {
  return (
    <>
    <main>
      {/* ---------------- Hero ---------------- */}
      <section className="ui-relative ui-overflow-hidden ui-border-b ui-border-[var(--ui-border)]">
        <div aria-hidden="true" className="ui-pointer-events-none ui-absolute ui-inset-0 ui-z-0 ui-overflow-hidden">
          <div
            className="ui-absolute ui--top-32 ui-left-1/2 ui-h-[36rem] ui-w-[64rem] ui--translate-x-1/2 ui-rounded-full ui-opacity-[0.15] ui-blur-3xl"
            style={{ background: "radial-gradient(ellipse at center, var(--ui-primary), transparent 70%)" }}
          />
        </div>

        <div className="ui-relative ui-z-10 ui-mx-auto ui-grid ui-max-w-5xl ui-grid-cols-1 ui-gap-12 ui-px-6 ui-pb-28 ui-pt-28 lg:ui-grid-cols-2 lg:ui-items-center lg:ui-pt-36">
          <div>
            <div className="ui-mb-5 ui-flex ui-flex-wrap ui-items-center ui-gap-2 ui-text-[13px] ui-text-[var(--ui-fg-muted)]">
              {stack.map((s, i) => (
                <span key={s} className="ui-flex ui-items-center ui-gap-2">
                  {i > 0 && <span aria-hidden="true" className="ui-h-1 ui-w-1 ui-rounded-full ui-bg-[var(--ui-border)]" />}
                  {s}
                </span>
              ))}
            </div>
            <h1 className="ui-text-5xl ui-font-semibold ui-leading-[1.05] ui-tracking-tight ui-text-[var(--ui-fg)] sm:ui-text-6xl">
              Building blocks for
              <br />
              <span style={{ color: "var(--ui-primary)" }}>modern React interfaces.</span>
            </h1>
            <p className="ui-mt-6 ui-max-w-md ui-text-[var(--ui-text-lg)] ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              Labanaat UI is a modern, accessible React component library
              designed for building production-ready interfaces — 47
              components, one consistent way to use them, and a token system
              that makes it genuinely yours.
            </p>
            <div className="ui-mt-8 ui-flex ui-flex-wrap ui-items-center ui-gap-3">
              <Button size="lg" asChild>
                <a href="/docs/components">Browse the docs</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/labanaat/labanaat-ui">View source</a>
              </Button>
            </div>
            <div className="ui-mt-5 ui-inline-flex ui-items-center ui-gap-2 ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-px-3 ui-py-2 ui-font-mono ui-text-[13px] ui-text-[var(--ui-fg)]">
              <span className="ui-text-[var(--ui-fg-muted)]">$</span> npm install @labanaat/ui
            </div>
          </div>

          <div>
            <Card
              className="ui-border-[var(--ui-border)] ui-shadow-[var(--ui-shadow-xl)] ui-backdrop-blur-xl"
              style={{ backgroundColor: "color-mix(in srgb, var(--ui-bg) 80%, transparent)" }}
            >
              <CardHeader>
                <CardTitle>Workspace settings</CardTitle>
                <CardDescription>Live components rendered on this page — not a screenshot.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ui-flex ui-flex-col ui-gap-5">
                  <div className="ui-flex ui-items-center ui-gap-3">
                    <Avatar name="Ada Lovelace" size="sm" />
                    <div className="ui-flex-1">
                      <div className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-fg)]">Ada Lovelace</div>
                      <div className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">ada@example.com</div>
                    </div>
                    <Badge variant="primary">Owner</Badge>
                  </div>
                  <Select
                    label="Default role for new members"
                    defaultValue="member"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "member", label: "Member" },
                    ]}
                  />
                  <Switch label="Require two-factor authentication" defaultChecked />
                  <Button className="ui-w-full">Invite member</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <Reveal>
        <section className="ui-border-b ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
          <div className="ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-16">
            <p className="ui-mb-8 ui-max-w-md ui-text-[var(--ui-fg-muted)]">
              Numbers you can check against the repository yourself — nothing
              here is a marketing estimate.
            </p>
            <div className="ui-grid ui-grid-cols-2 ui-gap-8 sm:ui-grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="ui-font-mono ui-text-3xl ui-font-medium ui-text-[var(--ui-fg)]">{s.value}</div>
                  <div className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ---------------- What this replaces ---------------- */}
      <section className="ui-relative ui-overflow-hidden">
        <Glow position="top-right" />
        <div className="ui-relative ui-z-10 ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-max-w-xl ui-text-4xl ui-font-semibold ui-leading-tight ui-tracking-tight ui-text-[var(--ui-fg)]">
              The parts of every project nobody wants to rebuild.
            </h2>
            <p className="ui-mt-4 ui-max-w-lg ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              None of this is glamorous work, which is exactly why it keeps
              getting skipped, rushed, or copy-pasted from the last project.
              Labanaat exists so your team spends its time on the product,
              not on reinventing a dropdown.
            </p>
          </Reveal>
          <div className="ui-mt-14 ui-grid ui-grid-cols-1 ui-gap-10 md:ui-grid-cols-2">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div>
                  <div className="ui-mb-4 ui-h-px ui-w-10" style={{ background: "var(--ui-primary)" }} aria-hidden="true" />
                  <h3 className="ui-mb-2 ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)]">{p.title}</h3>
                  <p className="ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Component wall (bento) ---------------- */}
      <section className="ui-relative ui-overflow-hidden ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
        <Glow position="bottom-left" />
        <div className="ui-relative ui-z-10 ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
              47 components. One consistent way to use them.
            </h2>
            <p className="ui-mt-4 ui-max-w-lg ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              A sample of what's in the box — every piece below is a real,
              live instance of the library, sharing the same accent color
              you pick in the header, not a static mockup or screenshot.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="ui-mt-14 ui-grid ui-grid-cols-2 ui-gap-4 md:ui-grid-cols-4 md:ui-grid-rows-2">
              <div className="ui-col-span-2 ui-row-span-2 ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Table</span>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="ui-flex ui-items-center ui-gap-2"><Avatar name="Ada Lovelace" size="sm" />Ada Lovelace</TableCell>
                      <TableCell><Badge variant="success">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="ui-flex ui-items-center ui-gap-2"><Avatar name="Grace Hopper" size="sm" />Grace Hopper</TableCell>
                      <TableCell><Badge variant="warning">Invited</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Separator className="ui-my-4" />
                <ProgressBar value={7} max={10} label="Seats used" showValue />
              </div>

              <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Button</span>
                <div className="ui-flex ui-flex-col ui-gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
              </div>

              <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Badge</span>
                <div className="ui-flex ui-flex-wrap ui-gap-1.5">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                </div>
              </div>

              <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Accordion</span>
                <Accordion type="single" collapsible defaultValue="a">
                  <AccordionItem value="a">
                    <AccordionTrigger className="ui-py-1.5 ui-text-[var(--ui-text-sm)]">Refunds</AccordionTrigger>
                    <AccordionContent className="ui-text-[var(--ui-text-xs)]">Within 30 days, no questions asked.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="ui-col-span-2 ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Tabs</span>
                <Tabs defaultValue="a">
                  <TabsList>
                    <TabsTrigger value="a">Account</TabsTrigger>
                    <TabsTrigger value="b">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="a"><p className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Manage your account settings.</p></TabsContent>
                  <TabsContent value="b"><p className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">View and update billing details.</p></TabsContent>
                </Tabs>
              </div>

              <div className="ui-col-span-2 ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Form controls</span>
                <div className="ui-flex ui-flex-col ui-gap-3">
                  <Checkbox label="Email notifications" defaultChecked />
                  <Switch label="Public profile" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="ui-mt-6">
              <Alert variant="neutral" title="This is one page.">
                Every component on this section — table, buttons, badges, accordion, tabs, form controls — is imported straight from{" "}
                <code className="ui-rounded-[var(--ui-radius-sm)] ui-bg-[var(--ui-bg-muted)] ui-px-1.5 ui-py-0.5 ui-font-mono ui-text-[13px]">@labanaat/ui</code>.
              </Alert>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Advanced components ---------------- */}
      <section className="ui-relative ui-overflow-hidden ui-border-t ui-border-[var(--ui-border)]">
        <div className="ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
              It's not just buttons and badges.
            </h2>
            <p className="ui-mt-4 ui-max-w-lg ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              Drag-and-drop boards, charts, query builders, activity
              feeds — the same design system, the same tokens, the same
              accessibility bar. Drag a card below; it's a real board,
              not a screenshot.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="ui-mt-14 ui-flex ui-flex-col ui-gap-4">
              <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-6">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Kanban</span>
                <KanbanShowcase />
              </div>

              <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-6">
                <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">Chart</span>
                <LineChart
                  data={[
                    { month: "Jan", revenue: 4200 },
                    { month: "Feb", revenue: 3800 },
                    { month: "Mar", revenue: 5200 },
                    { month: "Apr", revenue: 4900 },
                    { month: "May", revenue: 6100 },
                    { month: "Jun", revenue: 5800 },
                  ]}
                  xKey="month"
                  series={[{ key: "revenue" }]}
                  height={300}
                  showLegend={false}
                />
              </div>

              <div className="ui-grid ui-grid-cols-1 ui-gap-4 md:ui-grid-cols-2">
                <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                  <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">FilterBuilder</span>
                  <FilterBuilderShowcase />
                </div>

                <div className="ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-p-5">
                  <span className="ui-mb-4 ui-block ui-text-[var(--ui-text-xs)] ui-font-medium ui-uppercase ui-tracking-wide ui-text-[var(--ui-fg-muted)]">ActivityFeed</span>
                  <ActivityFeed>
                    <ActivityItem>
                      <ActivityAvatar><Avatar name="Ada Lovelace" size="sm" /></ActivityAvatar>
                      <ActivityContent>
                        <ActivityText><strong>Ada Lovelace</strong> invited <strong>Grace Hopper</strong></ActivityText>
                        <ActivityTime>2 hours ago</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                    <ActivityItem>
                      <ActivityAvatar><Avatar name="Alan Turing" size="sm" /></ActivityAvatar>
                      <ActivityContent>
                        <ActivityText><strong>Alan Turing</strong> created project <strong>Enigma</strong></ActivityText>
                        <ActivityTime>5 hours ago</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  </ActivityFeed>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="ui-mt-6">
              <Alert variant="neutral" title="Same rules apply.">
                Kanban ships real keyboard drag support via dnd-kit's keyboard sensor, DataGrid and Chart aren't shown here but follow the exact same pattern — see the full{" "}
                <a href="/docs/components" className="ui-text-[var(--ui-primary)] hover:ui-underline">component catalog</a>.
              </Alert>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Templates ---------------- */}
      <section className="ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
        <div className="ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
              See what you can actually build with it.
            </h2>
            <p className="ui-mt-4 ui-max-w-lg ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              Not component demos — three full, real applications, each
              built entirely from this library. Every page is live: open
              one, click around, drag things, view the source.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="ui-mt-14 ui-grid ui-grid-cols-1 ui-gap-6 md:ui-grid-cols-3">
              {[
                {
                  slug: "analytics-dashboard",
                  name: "Analytics Dashboard",
                  description: "A metrics-first SaaS dashboard — charts, a sortable table, top-line KPIs.",
                  accent: "var(--ui-primary)",
                },
                {
                  slug: "project-board",
                  name: "Project Board",
                  description: "A real drag-and-drop Kanban board, a guided new-project flow, an activity log.",
                  accent: "var(--ui-success)",
                },
                {
                  slug: "team-workspace",
                  name: "Team Workspace",
                  description: "A file browser, a booking calendar, and instant search via a command palette.",
                  accent: "var(--ui-warning)",
                },
              ].map((t) => (
                <a
                  key={t.slug}
                  href={`/templates/${t.slug}`}
                  className="ui-group ui-flex ui-flex-col ui-overflow-hidden ui-rounded-[var(--ui-radius-lg)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-transition-shadow hover:ui-shadow-[var(--ui-shadow-lg)]"
                >
                  <div
                    className="ui-h-28 ui-w-full"
                    style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${t.accent} 22%, transparent), color-mix(in srgb, ${t.accent} 6%, transparent))` }}
                  />
                  <div className="ui-flex ui-flex-1 ui-flex-col ui-p-5">
                    <h3 className="ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)] group-hover:ui-text-[var(--ui-primary)]">
                      {t.name}
                    </h3>
                    <p className="ui-mt-2 ui-flex-1 ui-text-[var(--ui-text-sm)] ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                      {t.description}
                    </p>
                    <span className="ui-mt-4 ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-primary)]">
                      Open template →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="ui-mt-8 ui-text-center">
              <a href="/templates" className="ui-text-[var(--ui-text-sm)] ui-font-medium ui-text-[var(--ui-primary)] hover:ui-underline">
                Browse all templates →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Feature: tokens ---------------- */}
      <section>
        <div className="ui-mx-auto ui-grid ui-max-w-5xl ui-grid-cols-1 ui-gap-10 ui-px-6 ui-py-36 lg:ui-grid-cols-2 lg:ui-items-center">
          <Reveal>
            <div>
              <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
                Every value is a design token.
              </h2>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Color, spacing, radius, typography, shadow, and motion all
                resolve to a CSS variable defined once. Rebrand a whole app
                by overriding a handful of variables — no component code
                changes, no rebuild.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                The color picker in the header above isn't decoration — it
                calls the exact same <code className="ui-font-mono ui-text-[13px] ui-text-[var(--ui-fg)]">applyTokenOverrides()</code>{" "}
                function you'd call in your own app. Twelve presets ship
                built in, and nothing stops you from passing your own hex
                values instead.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Even the neutral surfaces — card backgrounds, dividers,
                subtle fills — pick up a faint wash of whatever accent is
                active, via <code className="ui-font-mono ui-text-[13px] ui-text-[var(--ui-fg)]">color-mix()</code>, so a
                theme change feels coherent instead of like one button
                changed color on an otherwise gray page.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <CodeBlock>
{`:root {`}<br />
{"  "}<K>--ui-primary</K>: <S>#7c3aed</S>;<br />
{"  "}<K>--ui-radius-md</K>: <S>0.375rem</S>;<br />
{`}`}<br />
<br />
<C>{`// every component picks this up automatically`}</C><br />
&lt;Button&gt;Continue&lt;/Button&gt;
            </CodeBlock>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Feature: accessibility ---------------- */}
      <section className="ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
        <div className="ui-mx-auto ui-grid ui-max-w-5xl ui-grid-cols-1 ui-gap-10 ui-px-6 ui-py-36 lg:ui-grid-cols-2 lg:ui-items-center">
          <Reveal className="lg:ui-order-2">
            <div>
              <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
                Accessible by default, verified automatically.
              </h2>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Keyboard navigation, focus trapping, and correct ARIA roles
                are built into every interactive component — not bolted on.
                Every component ships with axe-core assertions, not just a
                claim in the docs.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Complex patterns — Dialog, Select, Combobox, Tabs — use Radix
                Primitives internally for behavior that's been battle-tested
                across thousands of production apps, wrapped in the
                library's own styling and API.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Where no accessible primitive existed — Combobox has none in
                Radix today — it's implemented directly against the WAI-ARIA
                1.2 pattern rather than reaching for an unmaintained
                dependency just to check a box.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <CodeBlock>
{`import { axe } from `}<S>"vitest-axe"</S>;<br />
<br />
<K>it</K>(<S>"has no violations"</S>, <K>async</K> () =&gt; {`{`}<br />
{"  "}<K>const</K> {`{ container }`} = render(&lt;Combobox /&gt;);<br />
{"  "}expect(<K>await</K> axe(container)).toHaveNoViolations();<br />
{`});`}
            </CodeBlock>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Testing rigor ---------------- */}
      <section className="ui-relative ui-overflow-hidden">
        <Glow position="top" />
        <div className="ui-relative ui-z-10 ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <div className="ui-grid ui-grid-cols-1 ui-gap-10 lg:ui-grid-cols-2 lg:ui-items-center">
            <Reveal>
              <div>
                <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
                  Not "should work." Verified on every change.
                </h2>
                <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                  36 of 47 components have a dedicated behavior test file,
                  and the full library runs through a cross-component
                  accessibility sweep against axe-core covering 40 — the
                  same commands wired into a CI pipeline that runs on every
                  pull request, not just before a release. Every component
                  has at least one of the two; closing the remaining gap
                  between the two sets is the next priority.
                </p>
                <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                  Interaction-heavy components get interaction-heavy tests —
                  the Slider suite, for example, simulates real keyboard
                  drags and asserts the displayed value actually updates
                  live, for both single and range selection.
                </p>
                <dl className="ui-mt-6 ui-grid ui-grid-cols-2 ui-gap-4">
                  <div>
                    <dt className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">Test files</dt>
                    <dd className="ui-font-mono ui-text-xl ui-text-[var(--ui-fg)]">38</dd>
                  </div>
                  <div>
                    <dt className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">Assertions</dt>
                    <dd className="ui-font-mono ui-text-xl ui-text-[var(--ui-fg)]">189</dd>
                  </div>
                  <div>
                    <dt className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">a11y-swept components</dt>
                    <dd className="ui-font-mono ui-text-xl ui-text-[var(--ui-fg)]">40</dd>
                  </div>
                  <div>
                    <dt className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">Type coverage</dt>
                    <dd className="ui-font-mono ui-text-xl ui-text-[var(--ui-fg)]">100%</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <CodeBlock>
{`$ pnpm test`}<br />
<br />
<S>{` ✓ src/components/button/Button.test.tsx (5 tests)`}</S><br />
<S>{` ✓ src/components/slider/Slider.test.tsx (4 tests)`}</S><br />
<S>{` ✓ src/components/combobox/Combobox.test.tsx (3 tests)`}</S><br />
<S>{` ✓ src/components/calendar/Calendar.test.tsx (11 tests)`}</S><br />
<S>{` ✓ src/test/accessibility.a11y.test.tsx (27 tests)`}</S><br />
<br />
<C>{` Test Files  38 passed (38)`}</C><br />
<C>{`      Tests  189 passed (189)`}</C>
              </CodeBlock>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Theme comparison ---------------- */}
      <section className="ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
        <div className="ui-mx-auto ui-max-w-5xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
              One component. Both themes. No extra work.
            </h2>
            <p className="ui-mt-4 ui-max-w-lg ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
              Both cards below render simultaneously, independent of the
              toggle in the header, using the exact hex values the current
              accent resolves to in each theme — including the swatches
              underneath, so there's nothing to take on faith.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="ui-mt-14">
              <ThemeCompare />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Feature: composition ---------------- */}
      <section>
        <div className="ui-mx-auto ui-grid ui-max-w-5xl ui-grid-cols-1 ui-gap-10 ui-px-6 ui-py-36 lg:ui-grid-cols-2 lg:ui-items-center">
          <Reveal>
            <div>
              <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
                Compose the parts you need.
              </h2>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Card, Dialog, Drawer, and Accordion expose subcomponents
                instead of a wall of configuration props. Read the JSX, know
                the layout — no prop-hunting through documentation to find
                the one flag that changes the footer alignment.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                It's the same philosophy end to end: components describe
                structure, tokens describe appearance, and neither one leaks
                into deciding things the other should own.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <CodeBlock>
&lt;Card&gt;<br />
{"  "}&lt;Card.Header&gt;<br />
{"    "}&lt;Card.Title&gt;Plan&lt;/Card.Title&gt;<br />
{"  "}&lt;/Card.Header&gt;<br />
{"  "}&lt;Card.Content&gt;<br />
{"    "}&lt;ProgressBar value={"{7}"} max={"{10}"} /&gt;<br />
{"  "}&lt;/Card.Content&gt;<br />
&lt;/Card&gt;
            </CodeBlock>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Workflow ---------------- */}
      <section className="ui-border-t ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg-subtle)]">
        <div className="ui-mx-auto ui-max-w-7xl ui-px-6 ui-py-36">
          <Reveal>
            <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
              From install to themed, in three steps.
            </h2>
          </Reveal>
          <div className="ui-mt-14 ui-grid ui-grid-cols-1 ui-gap-10 md:ui-grid-cols-3">
            {workflow.map((w, i) => (
              <Reveal key={w.step} delay={i * 120}>
                <div>
                  <h3 className="ui-mb-2 ui-text-[var(--ui-text-lg)] ui-font-semibold ui-text-[var(--ui-fg)]">{w.step}</h3>
                  <p className="ui-mb-4 ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">{w.body}</p>
                  <CodeBlock>{w.code}</CodeBlock>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="ui-relative ui-overflow-hidden ui-border-t ui-border-[var(--ui-border)]">
        <Glow position="center" />
        <Reveal>
          <div className="ui-relative ui-z-10 ui-mx-auto ui-grid ui-max-w-5xl ui-grid-cols-1 ui-items-center ui-gap-10 ui-px-6 ui-py-36 lg:ui-grid-cols-2">
            <div>
              <h2 className="ui-text-4xl ui-font-semibold ui-tracking-tight ui-text-[var(--ui-fg)]">
                Start with the components you need today.
              </h2>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                Every component ships its own entry point, so you only
                bundle what you import — 47 components, one consistent
                way to reach for any of them, from a Button to a full
                DataGrid.
              </p>
              <p className="ui-mt-4 ui-max-w-md ui-leading-relaxed ui-text-[var(--ui-fg-muted)]">
                No config file to write before your first component
                renders, no design tokens to define from scratch — pick
                an accent color and start building.
              </p>
              <div className="ui-mt-8 ui-flex ui-flex-wrap ui-gap-3">
                <Button size="lg" asChild>
                  <a href="/docs/components">Browse the catalog</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/labanaat/labanaat-ui">View source</a>
                </Button>
              </div>
            </div>
            <CodeBlock>
{`$ npm install `}<S>@labanaat/ui</S><br />
<br />
<K>import</K> {`{ Button }`} <K>from</K> <S>"@labanaat/ui/button"</S>;<br />
<K>import</K> <S>"@labanaat/ui/styles.css"</S>;<br />
<br />
<C>{`// that's it — no provider, no config`}</C><br />
&lt;Button&gt;Get started&lt;/Button&gt;
            </CodeBlock>
          </div>
        </Reveal>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
