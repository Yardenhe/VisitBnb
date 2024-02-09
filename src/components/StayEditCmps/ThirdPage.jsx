import React, { useState, useEffect } from 'react'



const propertyTypes = [
    {
        name: 'house',
        title: "An entire place",
        txt: "Guests have the whole place to themselves",
        icon: 'https://svgshare.com/i/zC6.svg'
    },
    {
        name: 'room',
        title: "A room",
        txt: "Guests have their own room room in a home, plus to shared spaces.",
        icon: "https://svgshare.com/i/zBn.svg"
    },
    {
        name: "guesthouse",
        title: "A shared room",
        txt: "Guests sleep in a room or common area that may be shared with you or others",
        icon: "https://svgshare.com/i/zBw.svg"
    },
];

export function ThirdPage({ onSetStay, stay }) {

    const [selectedPropertyType, setSelectedPropertyType] = useState(stay.propertyType);
    useEffect(() => {
        onSetStay({ "propertyType": selectedPropertyType })
    }, [selectedPropertyType])
    return (
        <section className="firstpage-edit thirdpage-edit">
            <div>
                <h3>What type of place will guests have?</h3>
            </div>
            <section className='roomtype-list' >
                {propertyTypes.map((propertyType, index) => (
                    <section className={`edit-icon-type ${selectedPropertyType == propertyType.name ? " selected" : ""}`}
                        key={index}
                        onClick={() => { setSelectedPropertyType(propertyType.name) }}
                    >
                        <div className='property-title'>
                            <h4>{propertyType.title}</h4>
                            <h5>{propertyType.txt}</h5>
                        </div>
                        <div className='property-logo'>
                            <img src={propertyType.icon} alt=""></img>
                        </div>
                    </section>
                ))}
            </section>

        </section >
    )
}
