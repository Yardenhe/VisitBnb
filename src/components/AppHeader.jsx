import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";
import { useToggle } from "../customHooks/useToggle"

export function AppHeader() {
    const [isOpenFilter, onToggle] = useToggle()
    return (
        <>
            {isOpenFilter && <div className="overlay" onClick={onToggle}></div>}

            {!isOpenFilter ? <header className={`app-header${isOpenFilter ? ' filter-open' : ''}`}>

                <Link to="/">
                    <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
                </Link>

                <section className='date-picker' onClick={onToggle}>
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


            </header> : <header className='app-header-filter'>


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
                <section className='date-picker grid-date-picker' onClick={onToggle}>
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
            </header>}
        </>
    )
}
