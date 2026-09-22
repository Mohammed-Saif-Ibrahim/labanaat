import * as React from "react";
import {
  ResponsiveContainer, LineChart as RLineChart, Line, BarChart as RBarChart, Bar,
  AreaChart as RAreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
} from "recharts";
import { cn } from "../../utils/cn";

export interface ChartSeries {
  key: string;
  label?: string;
  /** Defaults to the token-based palette below, cycling if there are more series than colors. */
  color?: string;
}

/** Token-driven default palette — the first color is the current accent (so charts repaint when the color picker changes), the rest are fixed semantic tones for contrast against it. */
const DEFAULT_PALETTE = [
  "var(--ui-primary)",
  "var(--ui-success)",
  "var(--ui-warning)",
  "var(--ui-danger)",
  "var(--ui-color-neutral-400)",
];

function resolveColor(series: ChartSeries, index: number) {
  return series.color ?? DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: { name: string; value: number | string; color: string }[];
}

function ChartTooltipContent({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="ui-rounded-[var(--ui-radius-md)] ui-border ui-border-[var(--ui-border)] ui-bg-[var(--ui-bg)] ui-px-3 ui-py-2 ui-text-[var(--ui-text-xs)] ui-shadow-[var(--ui-shadow-md)]">
      {label !== undefined && <div className="ui-mb-1 ui-font-medium ui-text-[var(--ui-fg)]">{label}</div>}
      <div className="ui-flex ui-flex-col ui-gap-0.5">
        {payload.map((entry) => (
          <div key={entry.name} className="ui-flex ui-items-center ui-gap-1.5 ui-text-[var(--ui-fg-muted)]">
            <span className="ui-h-2 ui-w-2 ui-rounded-[var(--ui-radius-full)]" style={{ backgroundColor: entry.color }} />
            {entry.name}: <span className="ui-font-medium ui-text-[var(--ui-fg)]">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BaseChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const axisStyle = { fontSize: 12, fill: "var(--ui-fg-muted)" };

/** Line chart — trends over time/sequence. Reads its colors from the current design tokens by default, so it repaints with the accent color picker like every other component. */
export function LineChart({ data, xKey, series, height = 320, showGrid = true, showLegend = series.length > 1, className }: BaseChartProps) {
  return (
    <div className={cn("ui-w-full", className)} style={{ height, display: "block", minWidth: 0, flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={100}>
        <RLineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          {showGrid && <CartesianGrid stroke="var(--ui-border)" vertical={false} />}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={{ stroke: "var(--ui-border)" }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12, color: "var(--ui-fg-muted)" }} />}
          {series.map((s, i) => (
            <Line key={s.key} type="monotone" dataKey={s.key} name={s.label ?? s.key} stroke={resolveColor(s, i)} strokeWidth={2} dot={false} />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Bar chart — comparisons across categories. */
export function BarChart({ data, xKey, series, height = 320, showGrid = true, showLegend = series.length > 1, className }: BaseChartProps) {
  return (
    <div className={cn("ui-w-full", className)} style={{ height, display: "block", minWidth: 0, flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={100}>
        <RBarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          {showGrid && <CartesianGrid stroke="var(--ui-border)" vertical={false} />}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={{ stroke: "var(--ui-border)" }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltipContent />} cursor={{ fill: "var(--ui-bg-subtle)" }} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12, color: "var(--ui-fg-muted)" }} />}
          {series.map((s, i) => (
            <Bar key={s.key} dataKey={s.key} name={s.label ?? s.key} fill={resolveColor(s, i)} radius={[4, 4, 0, 0]} />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Area chart — volume/magnitude over time. */
export function AreaChart({ data, xKey, series, height = 320, showGrid = true, showLegend = series.length > 1, className }: BaseChartProps) {
  return (
    <div className={cn("ui-w-full", className)} style={{ height, display: "block", minWidth: 0, flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={100}>
        <RAreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          {showGrid && <CartesianGrid stroke="var(--ui-border)" vertical={false} />}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={{ stroke: "var(--ui-border)" }} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12, color: "var(--ui-fg-muted)" }} />}
          {series.map((s, i) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={resolveColor(s, i)}
              fill={resolveColor(s, i)}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
