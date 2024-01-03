import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import { IoSearch } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useToggle } from "../customHooks/useToggle"

export function AppHeader() {
    const [isOpenEffect, onToggleEffect] = useToggle()
    const [isOpenFilter, onToggle] = useToggle()
    const isFirstRender = useRef(true);

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
        }, 200);

        return () => {

            clearTimeout(timeoutId);
        };

    }, [isOpenEffect]);




    return (
        <>
            {isOpenFilter && <div className="overlay" onClick={onToggleEffect}></div>}


            <header className={!isOpenFilter ? 'app-header' : ' app-header-filter'}>

                {!isOpenFilter && <Link to="/">
                    <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                </Link>}

                {isOpenFilter &&
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
                    </section>}
                {!isOpenFilter ? <section className={`date-picker${isOpenEffect ? ' enlarge' : ' '}`} onClick={onToggleEffect}>
                    <section className='btn-datepicker bold'>AnyWhere</section>
                    <section className='btn-datepicker bold'>Any Week</section>
                    <section className='btn-datepicker'>Add guests  </section>
                    <IoSearch className='search-btn' />
                </section> :
                    <section className={`date-picker grid-date-picker${!isOpenEffect ? ' shrink' : ' '}`} onClick={onToggleEffect}>
                        <section className='btn-datepicker'>
                            <span className='bold'>Where</span>
                            <p >Search destinations</p>
                        </section>
                        <section className='btn-datepicker'>
                            <span className='bold'>Check in</span>
                            <p >Add dates</p>
                        </section>
                        <section className='btn-datepicker'>
                            <span className='bold'>Check out</span>
                            <p >Add dates</p>
                        </section>
                        <section className='btn-datepicker'>
                            <span className='bold'>Who</span>
                            <p className='block' >Add guests</p>
                        </section>
                        <IoSearch className='search-btn' />
                    </section>}
                {!isOpenFilter && <section className='right-header-menu'>
                    <div className='switchlen-menu'>
                        <button>Switch to hosting</button>
                        <LuGlobe className='global-btn' />
                    </div>
                    <div className='menu-bar'> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>
                </section>}
            </header>
        </>
    )
}
