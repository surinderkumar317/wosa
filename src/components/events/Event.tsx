import React from 'react'
import Heading from './EventHeading'
import EventList from './EventList'

const Event: React.FC = () => {
  return (
    <div className='event-main-container lg:py-24 py-12'>
        <div className='container m-auto'>
            <Heading/>
            <EventList/>
        </div>
    </div>
  )
}

export default Event
