import React from 'react'
import '..styles/home.scss';
const home = () => {
  return (
    <main className='home'>
      <div className="left">
        <textarea name="jobDescription" id="jobdescription" placeholder='Job Description'></textarea>
      </div>
      <div className="right">
        <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input hidden type="file" name="resume" id="resume" accept=".pdf,.doc,.docx"/>
        </div>
        <div className="input-group">
            <label className="filelabel" htmlFor="selfdescription">Self Description</label>
            <textarea name="selfDescription" id="selfdescription" placeholder='Self Description'></textarea>
        </div>
        <button className='generate-btn'>Generate Report</button>
      </div>
    </main>
  )
}

export default home
