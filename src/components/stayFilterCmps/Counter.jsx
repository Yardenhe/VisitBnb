import React from 'react';

export function Counter({ label, count, onIncrement, onDecrement }) {
    return (
        <div className="counter">
            <span onClick={onDecrement}> <img src="/public/img/general-icons/plus.svg" className='heart-svg'></img></span>
            <p> {count}</p>
            <span onClick={onIncrement}> <img src="/public/img//general-icons/minus.svg" className='heart-svg'></img></span>
        </div>
    )
};
