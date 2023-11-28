import React, { useEffect } from 'react'

import { Link, Outlet, useParams } from 'react-router-dom'
import { StayFilter } from "../components/StayFilter";
import { useSelector } from 'react-redux';
import { stayService } from '../services/stayService.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loadStays, removeStay, saveStay, setFilterBy } from '../store/actions/stay.actions';


export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)


    const params = useParams()
    console.log('StayIndex', params)
    const { stayId } = params

    useEffect(() => {
        loadStays()
        //setSearchParams(filterBy)
    }, []) //filterBy

    return (

        <>
            {/* ↓ will be mapped with each result */}
            {params.stayId ?
                <Outlet context={{ stayId }} />
                :
                <>
                    <StayFilter />
                    <Link to='/details/e1'>Details</Link>

                    <div>StayIndex</div>
                </>
            }

        </>

    )
}
