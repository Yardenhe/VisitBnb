import React from 'react'
import { memo } from 'react';
import { StayPreview } from "./StayPreview";
import { Link } from 'react-router-dom';

export const StayList = memo(({ stays }) => {

    return (
        <ul className="stay-list">
            {
                stays.map(stay => <li key={stay._id}>
                    <Link to={`/details/${stay._id}`}>
                        <StayPreview stay={stay} />
                    </Link>
                </li>)
            }
        </ul>
    )

})