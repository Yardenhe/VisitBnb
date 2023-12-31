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
            if (isOpenFilter) {
                onToggle();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpenFilter, onToggle]);

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




    return (
        <>
            {isOpenFilter && <div className="overlay" onClick={onToggleEffect}></div>}

            {!isOpenFilter && <header className='app-header'>

                <Link to="/">
                    <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                </Link>

                <section className={`date-picker${isOpenEffect ? ' enlarge' : ' shrink'}`} onClick={onToggleEffect}>
                    <section className='btn-datepicker bold'>AnyWhere</section>
                    <section className='btn-datepicker bold'>Any Week</section>
                    <section className='btn-datepicker'>Add guests  </section>
                    <IoSearch className='search-btn' />
                </section>
                <section className='right-header-menu'>
                    <div className='switchlen-menu'>
                        <button>Switch to hosting</button>
                        <LuGlobe className='global-btn' />
                    </div>
                    <div className='menu-bar'> <IoMdMenu className='menu-icon' /><div className='circle'>י</div></div>

                </section>


            </header>}
            {isOpenFilter && <header className='app-header-filter'>


                <section className='app-header grid-app-header'>
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
                <section className='date-picker grid-date-picker' onClick={onToggleEffect}>
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
                </section>
            </header>
            }
        </>
    )
}
