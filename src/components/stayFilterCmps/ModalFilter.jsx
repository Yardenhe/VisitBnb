import React from 'react'
import { useState } from 'react';


export function ModalFilter({ isOpen, onClose }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1500);
    const overlayClassName = isOpen ? 'overlayModal' : '';


    function onSliderChange(value) {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);

        // renderBars();
    }
    return (
        <div className={overlayClassName} >
            <div className='modal-filters'>
                <h3>Filters</h3>
                <div className='price-range'>
                    <h4 className='bold'>Price range</h4>
                    <p>Nightly prices including fees and taxes</p>
                    <div className="price-range-slider-container">

                    </div>
                </div>
                <div className='price-range'>
                    <h4 className='bold'>Price range</h4>
                    <p>Nightly prices including fees and taxes</p>
                    <div className="price-range-slider-container">

                    </div>
                </div>
                <div className='price-range'>
                    <h4 className='bold'>Rooms and beds</h4>
                    <p>Bedrooms</p>
                    <p>Beds</p>
                    <p>Bathrooms</p>
                    <div className="price-range-slider-container">

                    </div>
                </div>
                <div className='price-range'>
                    <h4 className='bold'>Property Type</h4>
                    <p>Bedrooms</p>
                    <p>Beds</p>
                    <p>Bathrooms</p>
                    <div className="price-range-slider-container">

                    </div>
                </div>
                <div className='price-range'>
                    <h4 className='bold'>Amenities</h4>
                    <p>Bedrooms</p>
                    <p>Beds</p>
                    <p>Bathrooms</p>
                    <div className="price-range-slider-container">

                    </div>
                </div>
            </div>
        </div >
    )
}
