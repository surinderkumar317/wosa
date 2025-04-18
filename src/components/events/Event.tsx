import React from 'react'
import Heading from './EventHeading'
import EventList from './EventList'

const Event: React.FC = () => {
  return (
    <div className='event-main-container py-24'>
        <div className='container m-auto'>
            <Heading/>
            <EventList/>
        </div>
    </div>
  )
}

export default Event
