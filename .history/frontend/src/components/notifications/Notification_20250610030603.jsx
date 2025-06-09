import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEventContext } from "../../context/EventContext";
import isBetween from "dayjs/plugin/isBetween"; // <-- ✅ ADD THIS LINE

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween); // <-- ✅ EXTEND HERE

const Notification = () => {
  const { events } = useEventContext();
  const [weekendEvents, setWeekendEvents] = useState([]);

  useEffect(() => {
    const now = dayjs().tz("Asia/Kolkata");
const thisSaturday = now.day(6).startOf("day"); // Saturday 00:00 IST
const thisSunday = now.day(7).endOf("day");     // Sunday 23:59 IST

    console.log("This Saturday:", thisSaturday.format());
    console.log("This Sunday:", thisSunday.format());

    const filtered = events.filter((event) => {
const eventTime = dayjs.utc(event.start_time).tz("Asia/Kolkata");
      const isWeekend = eventTime.isBetween(thisSaturday, thisSunday, null, "[]");

      console.log(`Checking event ${event.title}: ${eventTime.format()} - Is Weekend?`, isWeekend);
      return isWeekend;
    });

    setWeekendEvents(filtered);
    console.log("Weekend Events:", filtered);
  }, [events]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">This Weekend's Notifications</h2>
      {weekendEvents.length === 0 ? (
        <p>No weekend events.</p>
      ) : (
        <ul className="space-y-2">
          {weekendEvents.map((event) => (
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
