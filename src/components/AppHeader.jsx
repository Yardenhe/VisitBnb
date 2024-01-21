import React from 'react'
import { Link, NavLink, Navigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import { IoSearch } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useToggle } from "../customHooks/useToggle"
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/actions/stay.actions';
import { stayService } from '../services/stay.service'
import { DynamicCmp } from './stayFilterCmps/DynamicCmp';
import { utilService } from '../services/util.service';


export function AppHeader() {
    const [isOpenEffect, onToggleEffect] = useToggle()
    const [isOpenFilter, onToggle] = useToggle()
    const [isOpenUserModal, onToggleUserModal] = useToggle()
    const [whichExploreBar, setwhichExploreBar] = useState('location')
    const isFirstRender = useRef(true);
    const location = useLocation();
    const isSpecificPage = location.pathname === '/';
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const { country } = filterBy || ''
    const currOrder = useSelector(storeState => storeState.orderModule.currOrder)
    const { endDate, startDate, guests } = currOrder || ''





    useEffect(() => {
        const handleScroll = () => {
            if (isOpenEffect) {
                onToggleEffect();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpenEffect, onToggleEffect]);

    useEffect(() => {
        if (isFirstRender.current) {
            // Skip the first render
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            onToggle();
        }, 150);

        return () => {

            clearTimeout(timeoutId);
        };

    }, [isOpenEffect]);
    useEffect(() => {
        setFilterBy(stayService.getFilterFromParams(searchParams))

    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        if (country) setwhichExploreBar('checkin')

    }, [filterBy])
    useEffect(() => {
        if (startDate && endDate) setwhichExploreBar('guests')
    }, [currOrder])



    const handleReloadClick = () => {
        Navigate("/")
    };

    function onSetFilter(fieldsToUpdate) {

        fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }
        console.log("🚀 ~ onSetFilter ~ fieldsToUpdate:", fieldsToUpdate)
        setFilterBy(fieldsToUpdate)
    }

    return (
        <>
            <section className={isSpecificPage ? 'sticky-header' : ''}>
                {isOpenFilter && <div className="overlay" onClick={onToggleEffect}></div>}
                <header className={'app-header'} >
                    <Link to="/" onClick={handleReloadClick}>
                        <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                    </Link>
                    <section className={`date-picker${isOpenEffect ? ' enlarge' : ' '}`} onClick={onToggleEffect}>
                        <section className='btn-datepicker bold'>{country ? country : 'AnyWhere'} <span className="vl"></span> </section>

                        <section className='btn-datepicker bold'>{startDate && endDate ? (utilService.formatMailDate(startDate) + " - " + utilService.formatMailDate(endDate)) : 'Any Week'}<span className="vl"></span></section>
                        <section className={`btn-datepicker ${guests.adults && 'bold-choose-guests'}`}><p>{guests.adults ? guests.adults + " guests" : 'Add guests'}</p> <IoSearch className='search-btn' />  </section>

                    </section>
                    <section className='right-header-menu'>
                        <div className='switchlen-menu'>
                            <button>Switch to hosting</button>
                            <LuGlobe className='global-btn' />
                        </div>
                        <div className='menu-bar' onClick={() => onToggleUserModal()}> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>
                    </section>
                </header>
                <header className={`app-header-filter${isOpenFilter ? ' show-explore' : ' slideOut'}`}>
                    <section className="app-header grid-app-header">
                        <Link to="/" onClick={handleReloadClick}>
                            <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                        </Link>
                        <section className='app-mini-menu'>
                            <section >Stays</section>
                            <section >Experience</section>
                            <section >Online Experience </section>
                        </section>


                        <section className='right-header-menu'>
                            <div className='switchlen-menu'>
                                <button>Switch to hosting</button>
                                <LuGlobe className='global-btn' />
                            </div>
                            <div className='menu-bar' onClick={() => onToggleUserModal()}> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>

                        </section>
                    </section>
                    <section className={`date-picker grid-date-picker${!isOpenEffect ? ' shrink' : ' '}`} >
                        <section className={`btn-datepicker${whichExploreBar == 'location' ? ' clicked-color' : ' '}`} onClick={() => setwhichExploreBar('location')}>
                            <span className='bold'>Where</span>
                            <p >Search destinations</p>
                        </section>
                        <section className='middle-explore'>
                            <section className={`btn-datepicker check${!startDate && !endDate && whichExploreBar == 'checkin' ? ' clicked-color' : ''}`} onClick={() => setwhichExploreBar('checkin')}>
                                <span className='bold'>Check in</span>
                                <p >Add dates</p>
                            </section>
                            <section className={`btn-datepicker check${startDate && whichExploreBar == 'checkin' ? ' clicked-color' : ''}`} onClick={() => setwhichExploreBar('checkin')}>
                                <span className='bold'>Check out</span>
                                <p >Add dates</p>
                            </section>
                        </section>
                        <section className={`btn-datepicker right${whichExploreBar == 'guests' ? ' clicked-color' : ''}`} onClick={() => setwhichExploreBar('guests')}>
                            <section className='right-txt-explore'>
                                <p className='bold'>Who</p>
                                <p >Add guests</p>
                            </section>

                            <IoSearch className='search-btn' />
                        </section>

                    </section>

                </header >
                {isOpenUserModal && <section className='user-modal'>
                    <Link to="/order">
                        <div className='user-modal-item' onClick={() => onToggleUserModal()}>Trips</div>
                    </Link>
                    <div className='user-modal-item'>Wishlists</div>
                    <div className='user-modal-item'>Dashboard</div>
                    <div className='user-modal-item'>Logout</div>
                </section>}

            </section >
            {isOpenFilter && <DynamicCmp cmpType={whichExploreBar} onSetFilter={onSetFilter} />
            }
        </>

    )
}
