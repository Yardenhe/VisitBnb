import React, { useEffect, useState, useRef } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { StayFilter } from "../components/StayFilter";
import { useSelector } from 'react-redux';
import { stayService } from '../services/stayService.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loadStays, removeStay, saveStay, setFilterBy } from '../store/actions/stay.actions';
import { StayList } from '../components/StayList';


export function StayIndex() {
    
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)




    const params = useParams()
    // console.log('StayIndex', params)
    const { stayId } = params

    useEffect(() => {
        loadStays()
        //setSearchParams(filterBy)
    }, []) //filterBy





    if (!stays) return <div>Loading..</div>
    return (

        <>
            {/* ↓ will be mapped with each result */}
            {params.stayId ?
                <Outlet context={{ stayId }} />
                :
                <section className='index-layout'>
                    <StayFilter />
                    <StayList stays={stays} />
                </section>
            }

        </>

    )
}
