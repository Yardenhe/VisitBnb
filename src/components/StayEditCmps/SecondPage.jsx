import React, { useEffect, useState } from 'react'
import { PropertyFilter } from '../stayFilterCmps/PropertyFilter';
const iconNames = ['amazingpools', 'amazingviews', 'arctics', 'beachfront', 'cabins', 'boats', 'camping', 'castles', 'desert', 'design', 'Countryside'
    , 'cycladichomes', 'iconiccities', 'islands', 'luxe', 'mansions', 'minsus', 'nationalparks', 'omg!', 'towers', 'topoftheworld', 'treehouses', 'tropical', 'trending'];

export function SecondPage({ onSetStay, stay }) {

    const [selectedProperties, setSelectedProperties] = useState(stay.type);
    const iconBasePath = 'img/labels/';
    useEffect(() => {
        onSetStay({ "type": selectedProperties })
    }, [selectedProperties])


    return (
        <section className="firstpage-edit secondpage-edit">
            <div>
                <h3>Which of these best describes your place?</h3>

            </div>
            <section className='type-list' >
                {iconNames.map((iconName, index) => (
                    <section className={`edit-icon-type ${selectedProperties == iconName ? " selected" : ""}`}
                        key={index}
                        onClick={() => { setSelectedProperties(iconName) }}
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
