import React from 'react'
import { useState } from 'react';
import Rheostat from "react-native-rheostat";

export function ModalFilter({ isOpen, onClose }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1500);
    const overlayClassName = isOpen ? 'overlayModal' : '';
    const demoTwoValues = [20, 50]
    const demoSnaps = [0, 20, 30, 40, 50, 60, 70, 80, 100];

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

                        <Rheostat values={demoTwoValues} min={0} max={100}
                            snap snapPoints={demoSnaps} />

                    </div>
                </div>
            </div>
        </div >
    )
}
