import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGem } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
const navbar = () => {
    const [collapsed,setCollapse]=useState(false);
  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-fit items-start p-6 justify-between bg-white fixed">
        <div className="flex flex-col gap-6 items-start">
            <FontAwesomeIcon icon={faBars} onClick={()=>setCollapse(prev=>!prev)} className='p-3 text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full'/>
            <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faPlus} className='p-3  text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full' />
                {(collapsed)?<p className='text-[16px] text-[#134182]'>New Chat</p>:null}
            </div>
        </div>
        <div className="flex flex-col gap-1 items-start">
            <div className='flex items-center gap-2 justify-center p-3 text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full'>
                <FontAwesomeIcon icon={faGem} />
                {(collapsed)?<p className='text-[16px]'>Gem Manager</p>:null}
            </div>
            <div className='flex items-center gap-2 justify-center p-3 text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full'>
                <FontAwesomeIcon icon={faCircleQuestion} />
                {(collapsed)?<p className='text-[16px]'>Help</p>:null}        
            </div>
            <div className='flex items-center gap-2 justify-center p-3 text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full'>
                <FontAwesomeIcon icon={faClockRotateLeft} />
                {(collapsed)?<p className='text-[16px]'>Activity</p>:null}
            </div>
            <div className='flex items-center gap-2 justify-center p-3 text-[#134182] text-xl hover:bg-gray-300 hover:rounded-full'>
                <FontAwesomeIcon icon={faGear} />
                {(collapsed)?<p className='text-[16px]'>Settings</p>:null}
            </div>
        </div>
      </div>
    </>
  )
}

export default navbar
