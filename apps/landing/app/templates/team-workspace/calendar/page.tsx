"use client";

import * as React from "react";
import { Calendar } from "@labanaat/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@labanaat/ui/card";
import { Avatar } from "@labanaat/ui/avatar";

const meetings = [
  { title: "Design review", time: "10:00 AM", attendee: "Ada Lovelace" },
  { title: "1:1 with Alan", time: "2:00 PM", attendee: "Alan Turing" },
  { title: "Sprint planning", time: "4:30 PM", attendee: "Grace Hopper" },
];

export default function CalendarPage() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 0, 15));

  return (
    <div className="ui-flex ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Calendar</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Team schedule and shared bookings.</p>
      </div>
      <div className="ui-grid ui-grid-cols-1 ui-gap-6 lg:ui-grid-cols-[auto,1fr]">
        <Card className="ui-w-full lg:ui-w-fit">
          <CardContent className="ui-flex ui-justify-center ui-pt-6 lg:ui-justify-start">
            <Calendar selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 0, 1)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {selected?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) ?? "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ui-flex ui-flex-col ui-divide-y ui-divide-[var(--ui-border)]">
              {meetings.map((m) => (
                <div key={m.title} className="ui-flex ui-items-center ui-gap-3 ui-py-3 first:ui-pt-0 last:ui-pb-0">
                  <Avatar name={m.attendee} size="sm" />
                  <div className="ui-flex-1">
                    <div className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg)]">{m.title}</div>
                    <div className="ui-text-[var(--ui-text-xs)] ui-text-[var(--ui-fg-muted)]">with {m.attendee}</div>
                  </div>
                  <span className="ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">{m.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
