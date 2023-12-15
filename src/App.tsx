import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import logo from "./assets/images/3d-render-illustration-of-activity-icon-of-hand-doing-daily-checklist-suitable-for-social-media-asset-web-app-presentation-png.webp"
import { createActivity, deleteActivity } from './app/features/activities/activitiesSlice'
import { v4 as uuidv4 } from "uuid";
import { Activity } from './app/features/activities/activitiesSlice'

function App() {

  const activities = useAppSelector(state => state.activities)
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("")
  const [duration, setDuration] = useState<string>("")

  const onSubmit = () => {
    if (!name || !duration) {
      alert('Please provide all value!')
      return;
    }
    dispatch(createActivity({ id: uuidv4(), name, duration }))
  }

  const onDelete = (activity: Activity) => {
    dispatch(deleteActivity(activity))
  }

  return (
    <>
      <div className="form-main">
        <img src={logo}></img>
        <div className="form-control">
          <input type="text" value={name} placeholder='Title' name="name" onChange={(event) => {
            setName(event.target.value)
          }}></input>
        </div>
        <div className="form-control">
          <input type="text" value={duration} placeholder='Duration' name="duration" onChange={(event) => {
            setDuration(event.target.value)
          }}></input>
        </div>
        <button onClick={(event) => onSubmit()} className='btn add-btn'>ADD</button>
        <div className="activities-container">
          {activities.map((activity : Activity, index:number ) => {
            return (
              <div key={index} className='activity'>
                <div className="detail">
                  <p className='title'>{activity.name}</p>
                  <p className='duration'>{activity.duration}</p>
                </div>
                <button className='btn-delete' onClick={(event) => {
                  onDelete(activity)
                }}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )

}

export default App
