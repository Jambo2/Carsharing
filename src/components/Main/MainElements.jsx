import React from 'react'
import './MainElements.css'
import CitySelector from './CitySelector/CitySelector'


export default function MainElements() {
  return (
    <div className='block_main'>
        <div className='element_main'>
            <p>
                Легкий доступ к автомобилям в твоем городе. Просто забронируй и поехали!
            </p>
            <CitySelector/>
        </div>
       
        
    </div>
  )
}
