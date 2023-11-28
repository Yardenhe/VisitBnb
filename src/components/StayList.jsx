import React from 'react'
import { memo } from 'react';
import { StayPreview } from "./StayPreview";

export const StayList = memo(({ stays }) => {

    return (
        <ul className="stay-list">
            {
                stays.map(stay => <li key={stay.id}>
                    <StayPreview stay={stay} />
                </li>)
            }
        </ul>
    )

})