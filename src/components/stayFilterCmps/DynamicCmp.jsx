import React from 'react'
import { LocationModal } from "../stayFilterCmps/LocationModal"
import { GuestsModal } from '../stayFilterCmps/GuestsModal';
import { CheckInOutModal } from '../stayFilterCmps/CheckInOutModal';

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
