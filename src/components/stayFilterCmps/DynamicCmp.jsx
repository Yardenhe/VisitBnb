import React from 'react'
import { LocationModal } from "../stayFilterCmps/LocationModal"
import { GuestsModal } from '../stayFilterCmps/GuestsModal';
import { CheckInOutModal } from '../stayFilterCmps/CheckInOutModal';
import { LoginSignup } from '../LoginSignUp';
import { DatePicker } from '../UI/DatePicker';
import { AmeintyModal } from '../stayDetailsCmps/AmeintyModal';
import { ApproveRejectOrderModal } from '../dashboard/approveRejectOrderModal';


export function DynamicCmp(props) {

    switch (props.cmpType) {
        case 'location':
            return <LocationModal {...props} />
        case 'checkin':
            return <CheckInOutModal {...props} />
        case 'guests':
            return <GuestsModal {...props} />
        default:
            return <></>
    }
}


// change into object mapping

export function StoreDynamicCmp({ type, payload, onCloseModal }) {
    console.log("🚀 ~ StoreDynamicCmp ~ type:", type)


    const cmpMap = {

        loginSignup: <LoginSignup payload={payload} onCloseModal={onCloseModal} />,
        ameintyModal: <AmeintyModal payload={payload} onCloseModal={onCloseModal} />,
        approveRejectOrder: <ApproveRejectOrderModal payload={payload} onCloseModal={onCloseModal} />
        // datePicker: <DatePicker payload={payload} />

    }

    const CmpToRender = cmpMap[type]
    return CmpToRender
}