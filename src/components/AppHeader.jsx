import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

export function AppHeader() {
    return (

        <header className='app-header'>

            <Link to="/">
                <img className="app-header-logo" src="img/airbnb-logoo.PNG" />
            </Link>

            <section className='date-picker'>
                <button>AnyWhere</button>
                <button>Any Week</button>
                <button>Add guests  </button>
                <IoSearch className='search-btn' />
            </section>
            <section className='right-header-menu'>
                <button>Switch to hosting</button>
            </section>

        </header>

    )
}
