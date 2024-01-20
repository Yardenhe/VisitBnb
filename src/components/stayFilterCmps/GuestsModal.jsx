import React from 'react'
import { useState } from 'react';
import { Counter } from './Counter';
import { setCurrOrder } from '../../store/actions/order.actions';
import { useEffectUpdate } from '../../customHooks/useEffectUpdate';


export function GuestsModal() {
    const [guests, setSelectedGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    });
    useEffectUpdate(() => {
        setCurrOrder({ guests })
    }, [guests])





    const handleIncrement = (type) => {
        setSelectedGuests(prevState => ({
            ...prevState,
            [type]: prevState[type] + 1,
        }));
    };

    const handleDecrement = (type) => {
        if (guests[type] > 0) {
            setSelectedGuests(prevState => ({
                ...prevState,
                [type]: prevState[type] - 1,
            }));
        }
    };
    return (
        <div className='location-modal list-gusets'>
            <div className='who-items'>
                <div>
                    <h5>Adults</h5>
                    <p>Ages 13 or above</p>

                </div>
                <Counter
                    label="Adults"
                    count={guests.adults}
                    onIncrement={() => handleIncrement('adults')}
                    onDecrement={() => handleDecrement('adults')}
                />

            </div>
            <div className='who-items'>
                <div>
                    <h5>Children</h5>
                    <p>Ages 2–12</p>
                </div>
                <Counter
                    label="Children"
                    count={guests.children}
                    onIncrement={() => handleIncrement('children')}
                    onDecrement={() => handleDecrement('children')}
                />
            </div>
            <div className='who-items'>
                <div>
                    <h5>Infants</h5>
                    <p>Under 2</p>

                </div>
                <Counter
                    label="Infants"
                    count={guests.infants}
                    onIncrement={() => handleIncrement('infants')}
                    onDecrement={() => handleDecrement('infants')}
                />
            </div>
            <div className='who-items'>
                <div>
                    <h5>Pets</h5>
                    <p>Bringing a service animal?</p>
                </div>

                <Counter
                    label="Pets"
                    count={guests.pets}
                    onIncrement={() => handleIncrement('pets')}
                    onDecrement={() => handleDecrement('pets')}
                />
            </div>
        </div>
    )
}
