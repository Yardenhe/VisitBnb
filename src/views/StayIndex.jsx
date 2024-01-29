import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link, Outlet, useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { StayFilter } from "../components/StayFilter";
import { useSelector } from 'react-redux';
import { stayService } from '../services/stay.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loadStays, removeStay, saveStay, setFilterBy } from '../store/actions/stay.actions';
import { StayList } from '../components/StayList';
import { UserMsg } from '../components/UI/UserMsg';


export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)



    const navigate = useNavigate()
    const params = useParams()
    const { stayId } = params
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation();
    const isSpecificPage = location.pathname === '/';

    useEffect(() => {
        setFilterBy(stayService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        loadStays()
        setSearchParams(filterBy)
    }, [filterBy])

    // useEffect(() => {
    //     document.body.classList.add('no-overflow');
    //     return () => {
    //         document.body.classList.remove('no-overflow');
    //     };
    // }, []);
    const onRemoveStay = useCallback(async (stayId) => {
        try {
            await removeStay(stayId)
            showSuccessMsg('Successfully removed')
        } catch (err) {
            console.log('Had issues loading stays', err);
            showErrorMsg('can not remove!')
        }
    }, [])
    async function onSaveStay(stay) {
        try {
            await saveStay(stay)
            navigate('/')
            showSuccessMsg("your stay Successfully added !")
        } catch (err) {
            console.log('Had issues adding stay', err);
        }
    }
    function onSetFilter(fieldsToUpdate) {
        fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }
        setFilterBy(fieldsToUpdate)
    }

    if (!stays) return <div>Loading..</div>
    const { type, price } = filterBy
    return (

        <section className={isSpecificPage && 'stay-index'}>

            {/* ↓ will be mapped with each result */}
            {params.stayId || location.pathname.includes('edit') ?

                <Outlet context={{ stayId, onSaveStay }} />
                :
                <section className='index-layout'>
                    <StayFilter onSetFilter={onSetFilter} filterBy={{ type }} />
                    <StayList stays={stays} onRemove={onRemoveStay} />
                </section>
            }
            <UserMsg />
        </section>

    )
}
