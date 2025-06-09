import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import { useEventContext } from "../../context/EventContext";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

const Notification = () => {
  const { events } = useEventContext();
  const [weekEvents, setWeekEvents] = useState([]);

  useEffect(() => {
    const now = dayjs().tz("Asia/Kolkata");

    // Start of the week (Monday 00:00)
    const startOfWeek = now.startOf('week').add(1, 'day').startOf('day');
    // End of the week (Sunday 23:59:59)
    const endOfWeek = startOfWeek.add(6, 'day').endOf('day');

    console.log("Start of this week (Monday):", startOfWeek.format());
    console.log("End of this week (Sunday):", endOfWeek.format());

    const filtered = events.filter((event) => {
      const eventTime = dayjs.utc(event.start_time).tz("Asia/Kolkata");
      const isThisWeek = eventTime.isBetween(startOfWeek, endOfWeek, null, "[]");

      console.log(`Checking event ${event.title}: ${eventTime.format()} - Is This Week?`, isThisWeek);
      return isThisWeek;
    });

    setWeekEvents(filtered);
    console.log("This Week's Events:", filtered);
  }, [events]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">This Week's Events</h2>
      {weekEvents.length === 0 ? (
        <p>No events this week.</p>
      ) : (
        <ul className="space-y-2">
          {weekEvents.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <strong>{event.title}</strong> — {dayjs.utc(event.start_time).local().format("dddd, MMM D, h:mm A")}
              <br />
              📍 {event.venue?.name}, {event.city?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
