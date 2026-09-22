import { ActivityFeed, ActivityItem, ActivityAvatar, ActivityContent, ActivityText, ActivityTime } from "@labanaat/ui/activity-feed";
import { Avatar } from "@labanaat/ui/avatar";

const events = [
  { actor: "Grace Hopper", text: <><strong>Grace Hopper</strong> moved <strong>Fix pagination edge case</strong> to In review</>, time: "12 minutes ago" },
  { actor: "Katherine Johnson", text: <><strong>Katherine Johnson</strong> commented on <strong>Migrate billing to new provider</strong></>, time: "1 hour ago" },
  { actor: "Ada Lovelace", text: <><strong>Ada Lovelace</strong> created <strong>Rebuild settings page</strong></>, time: "3 hours ago" },
  { actor: "Alan Turing", text: <><strong>Alan Turing</strong> marked <strong>Set up staging environment</strong> as done</>, time: "Yesterday" },
  { actor: "Grace Hopper", text: <><strong>Grace Hopper</strong> invited <strong>Charles Babbage</strong> to the project</>, time: "2 days ago" },
];

export default function ActivityPage() {
  return (
    <div className="ui-mx-auto ui-flex ui-max-w-2xl ui-flex-col ui-gap-6">
      <div>
        <h1 className="ui-text-2xl ui-font-semibold ui-text-[var(--ui-fg)]">Activity</h1>
        <p className="ui-mt-1 ui-text-[var(--ui-text-sm)] ui-text-[var(--ui-fg-muted)]">Everything happening across this project.</p>
      </div>
      <ActivityFeed>
        {events.map((e, i) => (
          <ActivityItem key={i}>
            <ActivityAvatar><Avatar name={e.actor} size="sm" /></ActivityAvatar>
            <ActivityContent>
              <ActivityText>{e.text}</ActivityText>
              <ActivityTime>{e.time}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityFeed>
    </div>
  );
}
