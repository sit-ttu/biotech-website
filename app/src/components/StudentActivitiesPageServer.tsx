import StudentActivitiesPageContent from "@/components/StudentActivitiesPageContent";
import { api, type Event, type News } from "@/lib/api";
import { getMockStudentActivities } from "@/lib/mock-content";
import type { SiteLocale } from "@/lib/program-pages";

export default async function StudentActivitiesPageServer({
  locale,
}: {
  locale: SiteLocale;
}) {
  let events: Event[] = [];
  let stories: News[] = [];

  const [eventsResult, newsResult] = await Promise.allSettled([
    api.events.findUpcoming(12),
    api.news.findAll(),
  ]);

  if (eventsResult.status === "fulfilled") {
    events = eventsResult.value;
  } else {
    console.error("Failed to pre-render upcoming student events", eventsResult.reason);
  }

  if (newsResult.status === "fulfilled") {
    stories = newsResult.value.filter(
      (item) => item.status === "published" && item.category === "events",
    );
  } else {
    console.error("Failed to pre-render student activity stories", newsResult.reason);
  }

  const fallback = getMockStudentActivities(locale);
  if (events.length === 0) events = fallback.events;
  if (stories.length === 0) stories = fallback.stories;

  return (
    <StudentActivitiesPageContent locale={locale} events={events} stories={stories} />
  );
}
