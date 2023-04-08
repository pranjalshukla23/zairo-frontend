import React from "react";
import { useState } from "react";
import axios from "axios";

function Form() {
  const [subject, setSubject] = useState("Java");
  const [duration, setDuration] = useState("10");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked", subject, duration);

    const data = await axios.post(
      "http://localhost:5000/courses",
      {
        title: subject,
        duration,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
  };
  return (
    <div className=' flex flex-col justify-center items-center h-screen'>
      <h1 className='font-bold text-lg'>Student Enrollment Form</h1>
      <form
        className='flex flex-col justify-between p-24 h-3/4  bg-slate-50 shadow-2xl rounded-md'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2 justify-between text-lg'>
          <label htmlFor='course' className='font-bold'>
            Pick A Course:
          </label>
          <select
            name='course'
            id='course'
            className=' border-2 p-1'
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            <option value='java'>Java</option>
            <option value='python'>Python</option>
          </select>
        </div>

        <div className='flex flex-col gap-2 justify-between text-lg'>
          <label htmlFor='duration' className='font-bold'>
            Enter Duration:
          </label>
          <input
            type='number'
            id='duration'
            name='duration'
            className='border-2 p-1 rounded-md'
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 rounded-md p-4 font-bold text-lg uppercase text-white'
        >
          confirm enrollment
        </button>
      </form>
    </div>
  );
}

export default Form;
