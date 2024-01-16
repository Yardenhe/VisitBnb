import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import { IoSearch } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useToggle } from "../customHooks/useToggle"
import { LocationModal } from "../components/stayFilterCmps/LocationModal"
import { GuestsModal } from './stayFilterCmps/GuestsModal';
import { CheckInOutModal } from './stayFilterCmps/CheckInOutModal';

export function AppHeader() {
    const [isOpenEffect, onToggleEffect] = useToggle()
    const [isOpenFilter, onToggle] = useToggle()
    const [whichExploreBar, setwhichExploreBar] = useState('')
    const isFirstRender = useRef(true);
    const location = useLocation();
    const isSpecificPage = location.pathname === '/';

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

    function onChangeStyle(newStyle) {
        setFooterStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
        showSuccessMsg('Changed style!')
    }


    return (
        <>
            <section className={isSpecificPage ? 'sticky-header' : ''}>
                {isOpenFilter && <div className="overlay" onClick={onToggleEffect}></div>}
                <header className={'app-header'} >
                    <Link to="/">
                        <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                    </Link>
                    <section className={`date-picker${isOpenEffect ? ' enlarge' : ' '}`} onClick={onToggleEffect}>
                        <section className='btn-datepicker bold'>AnyWhere</section>
                        <section className='btn-datepicker bold'>Any Week</section>
                        <section className='btn-datepicker'><p>Add guests</p> <IoSearch className='search-btn' /> </section>

                    </section>
                    <section className='right-header-menu'>
                        <div className='switchlen-menu'>
                            <button>Switch to hosting</button>
                            <LuGlobe className='global-btn' />
                        </div>
                        <div className='menu-bar'> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>
                    </section>
                </header>
                <header className={`app-header-filter${isOpenFilter ? ' show-explore' : ' slideOut'}`}>
                    <section className="app-header grid-app-header">
                        <Link to="/">
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
                            <div className='menu-bar'> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>

                        </section>
                    </section>
                    <section className={`date-picker grid-date-picker${!isOpenEffect ? ' shrink' : ' '}`} >
                        <section className='btn-datepicker' onClick={() => setwhichExploreBar('location')}>
                            <span className='bold'>Where</span>
                            <p >Search destinations</p>
                        </section>
                        <section>
                            <section className='btn-datepicker check' onClick={() => setwhichExploreBar('checkin')}>
                                <span className='bold'>Check in</span>
                                <p >Add dates</p>
                            </section>
                            <div className='btn-datepicker check' onClick={() => setwhichExploreBar('checkin')}>
                                <span className='bold'>Check out</span>
                                <p >Add dates</p>
                            </div>
                        </section>
                        <section className='btn-datepicker right'>
                            <section onClick={() => setwhichExploreBar('guests')}>
                                <span className='bold'>Who</span>
                                <p className='block' >Add guests</p>
                            </section>
                            <IoSearch className='search-btn' />
                        </section>

                    </section>
                </header>
            </section >
            {isOpenFilter && <DynamicCmp cmpType={whichExploreBar} name={'Muki'} />}
        </>

    )
}
function DynamicCmp(props) {

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