import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import { useEventContext } from "../../context/EventContext";

dayjs.extend(isBetween);
dayjs.extend(utc);

const WeekendNotifications = () => {
  const { events } = useEventContext();
  const [weekendEvents, setWeekendEvents] = useState([]);

  useEffect(() => {
    const now = dayjs();
    
    // Calculate upcoming Saturday and Sunday
    const thisSaturday = now.day() <= 6 ? now.day(6) : now.add(1, 'week').day(6);
    const thisSunday = thisSaturday.add(1, "day");

    const startOfSaturday = thisSaturday.startOf("day");
    const endOfSunday = thisSunday.endOf("day");

    // Filter events that start within this weekend
    const filtered = events.filter((event) => {
      const eventTime = dayjs.utc(event.start_time); // parse UTC timestamp
      return eventTime.isBetween(startOfSaturday, endOfSunday, null, "[]");
    });
    console.log("Weekend Events:", filtered);
    console.log("This Saturday:", thisSaturday.format());
    console.log("Event")
    setWeekendEvents(filtered);
  }, [events]);

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        📢 Weekend Events
      </h2>

      {weekendEvents.length === 0 ? (
        <p className="text-gray-600">No events this weekend.</p>
      ) : (
        <ul className="space-y-3">
          {weekendEvents.map((event) => (
            <li key={event.id} className="border p-3 rounded hover:bg-gray-50">
              <h3 className="font-bold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {dayjs(event.start_time).format("dddd, MMM D • h:mm A")}
              </p>
              <p className="text-sm text-gray-500">
                {event.venue?.name}, {event.city?.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeekendNotifications;
