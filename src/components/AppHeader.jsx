import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { LuGlobe } from "react-icons/lu";
import { IoMdMenu } from "react-icons/io";

export function AppHeader() {
    return (

        <header className='app-header'>

            <Link to="/">
                <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
            </Link>

            <section className='date-picker'>
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

        </header>

    )
}
