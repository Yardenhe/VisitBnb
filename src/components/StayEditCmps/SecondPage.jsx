import React, { useState } from 'react'
import { PropertyFilter } from '../stayFilterCmps/PropertyFilter';
const iconNames = ['amazingpools', 'amazingviews', 'arctics', 'beachfront', 'cabins', 'boats', 'camping', 'castles', 'desert', 'design', 'Countryside'
    , 'cycladichomes', 'iconiccities', 'islands', 'luxe', 'mansions', 'minsus', 'nationalparks', 'omg!', 'towers', 'topoftheworld', 'treehouses', 'tropical', 'trending'];

export function SecondPage() {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const iconBasePath = 'img/labels/';
    return (
        <section className="firstpage-edit secondpage-edit">
            <div>
                <h3>Which of these best describes your place?</h3>

            </div>
            <section className='type-list' >
                {iconNames.map((iconName, index) => (
                    <section className='edit-icon-type'
                        key={index}
                    //onClick={() => { onTypeChange(iconName), onToggleIcon(index) }}
                    >
                        <div className='property-logo'>
                            <img src={`${iconBasePath}${iconName}.jpg`} alt={iconName} />
                        </div>
                        <div className='property-title'>{iconName}</div>
                        <div className="overlay-icon"></div>
                    </section>
                ))}

            </section>

        </section >
    )
}
