"use client";

import * as React from "react";
import { Stepper, StepperItem } from "@labanaat/ui/stepper";
import { Card, CardContent } from "@labanaat/ui/card";
import { Input } from "@labanaat/ui/input";
import { Textarea } from "@labanaat/ui/textarea";
import { RadioGroup } from "@labanaat/ui/radio-group";
import { Button } from "@labanaat/ui/button";

const steps = ["Details", "Template", "Invite team"];

export default function NewProjectPage() {
  const [step, setStep] = React.useState(0);
  const isLast = step === steps.length - 1;

  return (
    <div className="ui-mx-auto ui-flex ui-max-w-2xl ui-flex-col ui-gap-8">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">New project</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">A few steps and your board is ready.</p>
      </div>

      <Stepper currentStep={step}>
        {steps.map((label, i) => (
          <StepperItem key={label} index={i} title={label} isLast={i === steps.length - 1} />
        ))}
      </Stepper>

      <Card>
        <CardContent className="ui-flex ui-flex-col ui-gap-4 ui-pt-6">
          {step === 0 && (
            <>
              <Input label="Project name" placeholder="e.g. Mobile redesign" />
              <Textarea label="Description" placeholder="What's this project about?" rows={3} />
            </>
          )}
          {step === 1 && (
            <RadioGroup
              label="Starting template"
              defaultValue="blank"
              options={[
                { value: "blank", label: "Blank board" },
                { value: "sprint", label: "Sprint board (Backlog, In progress, Review, Done)" },
                { value: "roadmap", label: "Quarterly roadmap" },
              ]}
            />
          )}
          {step === 2 && (
            <Input label="Invite by email" placeholder="teammate@company.com" description="Separate multiple emails with a comma." />
          )}

          <div className="ui-mt-2 ui-flex ui-justify-between">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              Back
            </Button>
            <Button onClick={() => !isLast && setStep((s) => Math.min(steps.length - 1, s + 1))}>
              {isLast ? "Create project" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
