import React from 'react'
import { useState } from 'react';
import { PriceSlider } from './PriceSlider';


export function ModalFilter({ isOpen, onClose }) {
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(500);
    const overlayClassName = isOpen ? 'overlayModal' : '';


    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0])
        setMaxPrice(newValue[1])
        console.log('Price changed:', newValue);
    };
    return (
        <div className={overlayClassName} >
            <div className='modal-filters'>
                <h3>Filters</h3>
                <div className='price-range'>
                    <h4 className='bold'>Price range</h4>
                    <p>Nightly prices including fees and taxes</p>
                    <div className="price-range-slider-container">
                        <PriceSlider defaultValue={[10, 500]} onChange={handlePriceChange} />
                        <p>max price {maxPrice}</p>
                        <p>min price {minPrice}</p>
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
