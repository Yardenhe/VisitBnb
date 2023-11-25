import React from 'react'

import { Link, Outlet, useParams } from 'react-router-dom'
import { StayFilter } from "../components/StayFilter";


export function StayIndex() {
    const params = useParams()
    console.log('StayIndex', params)
    const { stayId } = params


    return (

        <>
            {/* ↓ will be mapped with each result */}
            {params.stayId ?
                <Outlet context={{ stayId }} />
                :
                <>
                    <StayFilter />
                    <Link to='/details/e1'>Details</Link>

                    <div>StayIndex</div>
                </>
            }

        </>

    )
}
