/**
 * The reading order for the 47 component doc pages, in the same category
 * sequence as the docs sidebar (app/docs/layout.tsx) and the components
 * index (app/docs/components/page.tsx): Foundational → Form → Navigation
 * → Overlay → Feedback & data → Application → Advanced.
 *
 * This is the one place that order lives for prev/next purposes — the
 * component-doc layout reads it to work out what comes before/after the
 * current page. Adding a 48th component means adding one entry here.
 */
export interface ComponentNavItem {
  slug: string;
  label: string;
}

export const componentOrder: ComponentNavItem[] = [
  // Foundational
  { slug: "button", label: "Button" },
  { slug: "badge", label: "Badge" },
  { slug: "avatar", label: "Avatar" },
  { slug: "spinner", label: "Spinner" },
  { slug: "card", label: "Card" },
  { slug: "alert", label: "Alert" },
  { slug: "skeleton", label: "Skeleton" },
  { slug: "separator", label: "Separator" },
  // Form
  { slug: "input", label: "Input" },
  { slug: "textarea", label: "Textarea" },
  { slug: "checkbox", label: "Checkbox" },
  { slug: "switch", label: "Switch" },
  { slug: "radio-group", label: "RadioGroup" },
  { slug: "select", label: "Select" },
  { slug: "combobox", label: "Combobox" },
  { slug: "date-picker", label: "DatePicker" },
  { slug: "slider", label: "Slider" },
  { slug: "file-upload", label: "FileUpload" },
  // Navigation
  { slug: "tabs", label: "Tabs" },
  { slug: "pagination", label: "Pagination" },
  { slug: "breadcrumbs", label: "Breadcrumbs" },
  { slug: "accordion", label: "Accordion" },
  // Overlay
  { slug: "dialog", label: "Dialog" },
  { slug: "drawer", label: "Drawer" },
  { slug: "popover", label: "Popover" },
  { slug: "tooltip", label: "Tooltip" },
  { slug: "dropdown-menu", label: "DropdownMenu" },
  // Feedback & data
  { slug: "toast", label: "Toast" },
  { slug: "progress-bar", label: "ProgressBar" },
  { slug: "empty-state", label: "EmptyState" },
  { slug: "table", label: "Table" },
  // Application
  { slug: "sidebar", label: "Sidebar" },
  { slug: "navbar", label: "Navbar" },
  { slug: "navigation-menu", label: "NavigationMenu" },
  { slug: "stepper", label: "Stepper" },
  { slug: "timeline", label: "Timeline" },
  { slug: "command-palette", label: "CommandPalette" },
  { slug: "data-table", label: "DataTable" },
  { slug: "carousel", label: "Carousel" },
  { slug: "calendar", label: "Calendar" },
  { slug: "metric", label: "Metric" },
  // Advanced
  { slug: "kanban", label: "Kanban" },
  { slug: "filter-builder", label: "FilterBuilder" },
  { slug: "activity-feed", label: "ActivityFeed" },
  { slug: "file-manager", label: "FileManager" },
  { slug: "data-grid", label: "DataGrid" },
  { slug: "chart", label: "Chart" },
];
