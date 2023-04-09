import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Schedule() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    duration: 0,
  });
  const [allEvents, setAllEvents] = useState([]);

  async function handleAddEvent() {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/courses`,
      {
        ...newEvent,
        start: new Date(newEvent.start).toISOString(),
        end: new Date(newEvent.end).toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    fetchData();
  }

  const fetchData = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/courses`
    );

    const eventsList = [...data];

    setAllEvents(eventsList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className=' flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold text-blue-500 underline my-4'>
          Calendar
        </h1>
      </div>
      <div className='flex justify-between '>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 700, margin: "50px" }}
          className='w-3/4'
        />
        <div className='border-l-2 border-l-slate-200 flex flex-col items-stretch gap-4 p-4'>
          <label htmlFor='title'>Course Name:</label>
          <input
            id='title'
            type='text'
            placeholder='Add title'
            style={{
              width: "100%",
            }}
            className='border-2 border-gray-500 bg-slate-50 rounded-md'
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                title: e.target.value,
              })
            }
          />
          <label htmlFor='duration'>Course Duration:</label>
          <input
            id='duration'
            type='number'
            placeholder='Add duration'
            style={{
              width: "100%",
            }}
            className='border-2 border-gray-500 bg-slate-50 rounded-md'
            value={newEvent.duration}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                duration: e.target.value,
              })
            }
          />
          <label htmlFor='start'>Start Date:</label>
          <DatePicker
            id='start'
            placeholderText='Start Date'
            style={{
              width: "100%",
            }}
            className='border-2 border-gray-500 bg-slate-50 rounded-md'
            selected={newEvent.start}
            onChange={(start) =>
              setNewEvent({
                ...newEvent,
                start: start,
              })
            }
          />
          <label htmlFor='end'>End Date:</label>
          <DatePicker
            id='end'
            placeholderText='End Date'
            selected={newEvent.end}
            className='border-2 border-gray-500 bg-slate-50 rounded-md w-full'
            onChange={(end) =>
              setNewEvent({
                ...newEvent,
                end: end,
              })
            }
          />
          <button
            style={{
              marginTop: "10px",
            }}
            className='bg-orange-500 p-2 rounded-md text-white font-lg'
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
