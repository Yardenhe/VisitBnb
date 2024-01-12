import React from 'react';

export function Counter({ label, count, onIncrement, onDecrement }) {
    return (
        <div className="counter">
            <span onClick={onDecrement}> <img src="/public/img/icons/plus.svg" className='heart-svg'></img></span>
            <span> {count}</span>
            <span onClick={onIncrement}> <img src="/public/img/icons/minus.svg" className='heart-svg'></img></span>
        </div>
    )
};
