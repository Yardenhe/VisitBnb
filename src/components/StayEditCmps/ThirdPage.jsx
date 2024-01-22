import React from 'react'



const iconNames = [
    {
        title: "An entire place",
        txt: "Guests have the whole place to themselves",
        icon: 'https://svgshare.com/i/zC6.svg'
    },
    {
        title: "A room",
        txt: "Guests have their own room room in a home, plus to shared spaces.",
        icon: "https://svgshare.com/i/zBn.svg"
    },
    {
        title: "A shared room",
        txt: "Guests sleep in a room or common area that may be shared with you or others",
        icon: "https://svgshare.com/i/zBw.svg"
    },
];

export function ThirdPage() {
    const iconBasePath = 'img/labels/';
    return (
        <section className="firstpage-edit thirdpage-edit">
            <div>
                <h3>What type of place will guests have?</h3>

            </div>
            <section className='roomtype-list' >
                {iconNames.map((iconName, index) => (
                    <section className='edit-icon-type'
                        key={index}
                    //onClick={() => { onTypeChange(iconName), onToggleIcon(index) }}
                    >
                        <div className='property-title'>
                            <h4>{iconName.title}</h4>
                            <h5>{iconName.txt}</h5>
                        </div>
                        <div className='property-logo'>
                            <img src={iconName.icon} alt=""></img>
                        </div>

                    </section>
                ))}

            </section>

        </section >
    )
}
