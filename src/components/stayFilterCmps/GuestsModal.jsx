import React from 'react'
import { useState } from 'react';
import { Counter } from './Counter';

export function GuestsModal() {
    const [selectedGuests, setSelectedGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    });

    const handleIncrement = (type) => {
        setSelectedGuests(prevState => ({
            ...prevState,
            [type]: prevState[type] + 1,
        }));
    };

    const handleDecrement = (type) => {
        if (selectedGuests[type] > 0) {
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
                    count={selectedGuests.adults}
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
                    count={selectedGuests.children}
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
                    count={selectedGuests.infants}
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
                    count={selectedGuests.pets}
                    onIncrement={() => handleIncrement('pets')}
                    onDecrement={() => handleDecrement('pets')}
                />
            </div>
        </div>
    )
}
