import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='border-2 h-screen flex flex-col justify-center items-center gap-8 bg-slate-100'>
      <h1 className='text-2xl font-bold underline text-blue-500'>
        Welcome to Course Enrollment System
      </h1>
      <button className='bg-orange-500 p-2 rounded-md w-56 text-2xl font-bold text-white hover:scale-150 transition-all ease-in-out'>
        <Link to='/enroll'>Enroll</Link>
      </button>
    </div>
  );
}

export default Home;
