import React from 'react'
import ClassroomHeaderData from './ClassroomHeaderData'
import CommonImage from '../common/Image'

const StudentServices: React.FC = () => {
  return (
    <div className='stu-classroom-cont flex flex-col w-full'>
       <ClassroomHeaderData/>

       <div className='stu-classroom-content w-full'>
            <div className='stu-classroom-row-content w-full mb-5'>
                <h2 className='text-2xl mb-5'>Student Services</h2>
                <div className='no-image flex w-full justify-center'>
                  <CommonImage
                    classname={"icon"}
                    src={"/dashboard-images/no-data-found.webp"}
                    alt={"No Data Found"}
                    width={300}
                    height={400}
                  />
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentServices
