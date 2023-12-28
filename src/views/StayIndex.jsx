import React, { useEffect, useState, useRef, useCallback } from 'react'
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
    const { stayId } = params

    useEffect(() => {
        loadStays()
        //setSearchParams(filterBy)
    }, []) //filterBy


    const onRemoveStay = useCallback(async (stayId) => {
        try {
            await removeStay(stayId)
            showSuccessMsg('Successfully removed')
        } catch (err) {
            console.log('Had issues loading stays', err);
            showErrorMsg('can not remove!')
        }
    }, [])


    if (!stays) return <div>Loading..</div>
    return (

        <>
            {/* ↓ will be mapped with each result */}
            {params.stayId ?
                <Outlet context={{ stayId }} />
                :
                <section className='index-layout'>
                    <StayFilter />
                    <StayList stays={stays} onRemove={onRemoveStay} />
                </section>
            }

        </>

    )
}
