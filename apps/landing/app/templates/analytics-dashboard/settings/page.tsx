"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@labanaat/ui/card";
import { Input } from "@labanaat/ui/input";
import { Select } from "@labanaat/ui/select";
import { Switch } from "@labanaat/ui/switch";
import { Button } from "@labanaat/ui/button";
import { Separator } from "@labanaat/ui/separator";

export default function SettingsPage() {
  return (
    <div className="ui-flex ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Settings</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Workspace preferences.</p>
      </div>

      <Card className="ui-max-w-xl">
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>General details about this workspace.</CardDescription>
        </CardHeader>
        <CardContent className="ui-flex ui-flex-col ui-gap-4">
          <Input label="Workspace name" defaultValue="Pulse Analytics" />
          <Select label="Timezone" defaultValue="utc" options={[{ value: "utc", label: "UTC" }, { value: "est", label: "Eastern Time" }, { value: "pst", label: "Pacific Time" }]} />
          <Separator />
          <Switch label="Weekly summary email" description="A digest of key metrics every Monday." defaultChecked />
          <Switch label="Usage alerts" description="Notify when a metric moves more than 20% in a day." />
          <div className="ui-flex ui-justify-end">
            <Button>Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
