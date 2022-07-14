import React, { useState, useEffect } from "react";
import './App.css';
import { ListJobs, AddJobButton, CreateJob } from './components';
import axios from 'axios';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    fetchJobs();
  }, [])

  const fetchJobs = async () => {
    await axios.get(`http://localhost:4000/api/jobs`).then(({data})=>{
      setJobs(data);
    })
  }

  const handleShowForm = (newJob = false) => {
    setShowForm(!showForm);
    if (newJob) {
      fetchJobs();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Luis Sardinha for <code>ElogBook</code> technical test.</p>
      </header>
      <AddJobButton handleShowForm={handleShowForm}/>
      {showForm && <CreateJob handleShowForm={handleShowForm} fetchJobs={fetchJobs}/>}
      <ListJobs jobs={jobs}/>
    </div>
  );
}

export default App;
