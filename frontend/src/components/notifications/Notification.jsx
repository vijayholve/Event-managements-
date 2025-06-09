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
<div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg">
  <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 border-b-4 border-indigo-400 pb-2">
    This Week&apos;s Events
  </h2>

  {weekEvents.length === 0 ? (
    <p className="text-center text-gray-500 text-lg italic mt-8">
      No events this week.
    </p>
  ) : (
    <ul className="space-y-6">
      {weekEvents.map((event) => (
        <li
          key={event.id}
          className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          title={event.title}
        >
          <h3 className="text-xl font-semibold text-indigo-800 mb-1">
            {event.title}
          </h3>
          <time className="block text-indigo-600 font-medium mb-2">
            {dayjs.utc(event.start_time).local().format("dddd, MMM D, h:mm A")}
          </time>
          <address className="not-italic text-gray-600 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a8 8 0 1111.314-11.314l-1.414 1.414"
              />
            </svg>
            <span>
              {event.venue?.name || "Venue not specified"}, {event.city?.name || "City not specified"}
            </span>
          </address>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Notification;
