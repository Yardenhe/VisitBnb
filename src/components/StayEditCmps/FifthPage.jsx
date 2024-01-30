import React, { useState, useEffect } from 'react'
import { Counter } from '../stayFilterCmps/Counter';
export function FifthPage({ onSetStay, stay }) {
    const [guests, setSelectedGuests] = useState({
        capacity: stay.capacity,
        bedrooms: stay.bedrooms,
        beds: stay.beds,
        bathrooms: stay.bathrooms,
    });
    useEffect(() => {
        onSetStay(guests)
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
        <section className="firstpage-edit fourthPage-edit">
            <div>
                <h3>Share some basics about your place</h3>
                <h4>You'll add more details later, like bed types.</h4>

            </div>
            <section className='counter-list' >

                <div className='who-items'>

                    <h5>Guests</h5>



                    <Counter
                        label="Guests"
                        count={guests.capacity}
                        onIncrement={() => handleIncrement('capacity')}
                        onDecrement={() => handleDecrement('capacity')}
                    />

                </div>
                <div className='who-items'>
                    <div>
                        <h5>Bedrooms</h5>

                    </div>
                    <Counter
                        label="Bedrooms"
                        count={guests.bedrooms}
                        onIncrement={() => handleIncrement('bedrooms')}
                        onDecrement={() => handleDecrement('bedrooms')}
                    />
                </div>
                <div className='who-items'>
                    <div>
                        <h5>Beds</h5>


                    </div>
                    <Counter
                        label="Beds"
                        count={guests.beds}
                        onIncrement={() => handleIncrement('beds')}
                        onDecrement={() => handleDecrement('beds')}
                    />
                </div>
                <div className='who-items'>
                    <div>
                        <h5>Bathrooms</h5>

                    </div>

                    <Counter
                        label="Bathrooms"
                        count={guests.bathrooms}
                        onIncrement={() => handleIncrement('bathrooms')}
                        onDecrement={() => handleDecrement('bathrooms')}
                    />
                </div>

            </section>

        </section >
    )
}
