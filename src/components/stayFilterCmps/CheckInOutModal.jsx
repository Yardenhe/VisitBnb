import React from 'react'
import { DatePicker } from "../UI/DatePicker"
export function CheckInOutModal() {
    return (
        <div className='location-modal hight-datepicker-checkin' >
            <DatePicker isModal={true}/>
        </div>
    )
}
