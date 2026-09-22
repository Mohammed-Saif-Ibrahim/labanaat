import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Checkbox } from "../components/checkbox";
import { Button } from "../components/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Spinner } from "../components/spinner";
import { Textarea } from "../components/textarea";
import { EmptyState } from "../components/empty-state";
import { Pagination } from "../components/pagination";
import { DatePicker } from "../components/date-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/tabs";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../components/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "../components/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../components/popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../components/tooltip";
import { ToastProvider, ToastRegistry, ToastViewport, ToastItem } from "../components/toast";
import { Input } from "../components/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/accordion";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/table";
import { Slider } from "../components/slider";
import { Combobox } from "../components/combobox";
import { Skeleton } from "../components/skeleton";
import { Badge } from "../components/badge";
import { Avatar } from "../components/avatar";
import { Alert } from "../components/alert";
import { ProgressBar } from "../components/progress-bar";
import { Switch } from "../components/switch";
import { RadioGroup } from "../components/radio-group";
import { Select } from "../components/select";
import { Separator } from "../components/separator";
import { Stepper, StepperItem } from "../components/stepper";
import {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
} from "../components/timeline";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "../components/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/sidebar";
import { Metric, MetricLabel, MetricValue, MetricDelta } from "../components/metric";
import { Calendar } from "../components/calendar";
import { FilterBuilder } from "../components/filter-builder";
import { Kanban } from "../components/kanban";
import {
  ActivityFeed,
  ActivityItem,
  ActivityContent,
  ActivityText,
} from "../components/activity-feed";
import { FileManager } from "../components/file-manager";
/**
 * Cross-component accessibility sweep. Interactive components with
 * overlay/portal behavior (Dialog, Drawer, Popover, Tooltip, DropdownMenu,
 * Toast) are covered by their own behavior tests instead, since jsdom's
 * lack of real layout makes portal-based positioning assertions unreliable
 * here.
 */
describe("accessibility (axe)", () => {
  it("Checkbox with label has no violations", async () => {
    const { container } = render(
      <Checkbox label="Accept terms" description="Required to continue" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Button has no violations", async () => {
    const { container } = render(<Button>Continue</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Input with label/description/error has no violations", async () => {
    const { container } = render(<Input label="Email" description="Work email preferred" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Accordion has no violations", async () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Breadcrumbs has no violations", async () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Table has no violations", async () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada Lovelace</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Slider has no violations", async () => {
    const { container } = render(<Slider label="Volume" defaultValue={[50]} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Combobox has no violations", async () => {
    const { container } = render(
      <Combobox label="Fruit" options={[{ value: "a", label: "Apple" }]} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Skeleton (decorative) has no violations", async () => {
    const { container } = render(<Skeleton className="ui-h-4 ui-w-32" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Badge has no violations", async () => {
    const { container } = render(<Badge>New</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Avatar has no violations", async () => {
    const { container } = render(<Avatar name="Ada Lovelace" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Alert has no violations", async () => {
    const { container } = render(
      <Alert variant="warning" title="Heads up">
        Your session expires soon.
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ProgressBar has no violations", async () => {
    const { container } = render(<ProgressBar value={40} label="Upload progress" showValue />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Switch with label has no violations", async () => {
    const { container } = render(<Switch label="Enable notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("RadioGroup has no violations", async () => {
    const { container } = render(
      <RadioGroup
        label="Plan"
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
        ]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Select has no violations", async () => {
    const { container } = render(
      <Select label="Country" options={[{ value: "us", label: "United States" }]} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Separator has no violations", async () => {
    const { container } = render(<Separator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Stepper has no violations", async () => {
    const { container } = render(
      <Stepper currentStep={1}>
        <StepperItem index={0} title="Account" />
        <StepperItem index={1} title="Billing" />
        <StepperItem index={2} title="Confirm" isLast />
      </Stepper>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Timeline has no violations", async () => {
    const { container } = render(
      <Timeline>
        <TimelineItem isLast>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Deploy completed</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Navbar has no violations", async () => {
    const { container } = render(
      <Navbar>
        <NavbarBrand>Labanaat</NavbarBrand>
        <NavbarContent>
          <NavbarItem href="/docs" active>
            Docs
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Sidebar has no violations", async () => {
    const { container } = render(
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton active>Overview</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Metric has no violations", async () => {
    const { container } = render(
      <Metric>
        <MetricLabel>Monthly recurring revenue</MetricLabel>
        <MetricValue>$4,820</MetricValue>
        <MetricDelta direction="up">+12%</MetricDelta>
      </Metric>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Calendar has no violations", async () => {
    const { container } = render(<Calendar defaultMonth={new Date(2026, 0, 1)} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("FilterBuilder has no violations", async () => {
    const { container } = render(
      <FilterBuilder
        fields={[{ value: "name", label: "Name" }]}
        conditions={[{ id: "1", field: "name", operator: "eq", value: "" }]}
        onConditionsChange={() => {}}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Kanban has no violations", async () => {
    const { container } = render(
      <Kanban
        columns={[{ id: "todo", title: "To do", items: [{ id: "1", title: "Design review" }] }]}
        onColumnsChange={() => {}}
        getItemId={(t: { id: string }) => t.id}
        renderItem={(t: { title: string }) => t.title}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ActivityFeed has no violations", async () => {
    const { container } = render(
      <ActivityFeed>
        <ActivityItem>
          <ActivityContent>
            <ActivityText>Ada Lovelace invited Grace Hopper</ActivityText>
          </ActivityContent>
        </ActivityItem>
      </ActivityFeed>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("FileManager has no violations", async () => {
    const { container } = render(
      <FileManager
        items={[{ id: "1", name: "Reports", type: "folder" }]}
        path={["Home"]}
        onPathChange={() => {}}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Card has no violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
        </CardHeader>
        <CardContent>7 of 10 seats used</CardContent>
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Spinner has no violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Textarea has no violations", async () => {
    const { container } = render(<Textarea label="Bio" description="Tell us about yourself." />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("EmptyState has no violations", async () => {
    const { container } = render(
      <EmptyState title="No members yet" description="Invite your first teammate." />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Pagination has no violations", async () => {
    const { container } = render(<Pagination page={2} totalPages={5} onPageChange={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("DatePicker has no violations", async () => {
    const { container } = render(
      <DatePicker label="Start date" description="When your subscription begins." />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tabs has no violations", async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Account</TabsTrigger>
          <TabsTrigger value="b">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Account settings</TabsContent>
        <TabsContent value="b">Billing details</TabsContent>
      </Tabs>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Dialog has no violations (rendered open, so the sweep covers the modal content, not just the closed trigger)", async () => {
    const { container } = render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>Send an invitation by email.</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Drawer has no violations (rendered open)", async () => {
    const { container } = render(
      <Drawer open>
        <DrawerContent>
          <DrawerTitle>Edit member</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("DropdownMenu has no violations (rendered open)", async () => {
    const { container } = render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 45000);

  it("Popover has no violations (rendered open)", async () => {
    const { container } = render(
      <Popover open>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent>Filter options here.</PopoverContent>
      </Popover>
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 45000);

  it("Tooltip has no violations (rendered open)", async () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful detail</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 45000);

  it("Toast has no violations (rendered open)", async () => {
    const { container } = render(
      <ToastProvider>
        <ToastRegistry>
          <ToastItem open title="Saved" description="Your changes were saved." />
        </ToastRegistry>
        <ToastViewport />
      </ToastProvider>
    );
    expect(await axe(container)).toHaveNoViolations();
  }, 45000);
});
