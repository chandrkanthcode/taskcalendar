import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5002/api/tasks")
      .then((res) => res.json())
      .then((tasks) => {
        const mappedEvents = tasks.map((task) => ({
          id: task._id,
          title: task.title,
          start: task.startTime
            ? `${task.dueDate}T${task.startTime}`
            : task.dueDate,
          end: task.endTime
            ? `${task.dueDate}T${task.endTime}`
            : null,
          extendedProps: {
            priority: task.priority,
            status: task.status,
          },
        }));

        setEvents(mappedEvents);
      })
      .catch((err) => console.error("Failed to load tasks", err));
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) => {
          alert(`Task: ${info.event.title}`);
        }}
      />
    </div>
  );
};

export default Calendar;
