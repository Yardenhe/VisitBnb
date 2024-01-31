import React, { useEffect, useState } from 'react'
// const iconNames = ['Air conditioning', 'BBQ grill', 'Fire extinguisher', 'First aid kit', 'Gym', 'Hot tub', 'Kitchen', 'Outdoor dining', 'Paid parking', 'Parking', 'Patio'
//     , 'Smoke alarm', 'TV', 'Washing machine', 'Wifi', 'Workspace', 'Shower', 'Pool', 'Pool table', 'Patio'];
const iconNames =[
    'TV',
    'Wifi',
    'Air conditioning',
    'Kitchen',
    'Smoking allowed',
    'Heating',
    'Washer',
    'Dryer',
    'Essentials',
    'Shampoo',
    'Hangers',
    'Hair dryer',
    'Iron',
    'Bathtub',
    'Bed linens',
    'Microwave',
    'Coffee maker',
    'Refrigerator',
    'Dishwasher',
    'Dishes',
    'Oven',
    'Patio or balcony'
  ]
  

export function SixthPage({ onSetStay, stay }) {
    const [selectedamenities, setSelectedamenities] = useState(stay.amenities);
    const iconBasePath = 'img/amenity-icons/';
    useEffect(() => {
        onSetStay({ "amenities": selectedamenities })
    }, [selectedamenities])


    const handleamenitiesClick = (amenitie) => {

        if (selectedamenities.includes(amenitie)) {
            setSelectedamenities(selectedamenities.filter((selectedamenitie) => selectedamenitie !== amenitie));
        } else {
            setSelectedamenities([...selectedamenities, amenitie]);
        }
    };
    return (
        <section className="firstpage-edit secondpage-edit">
            <div>
                <h3>Tell guests what your place has to offer</h3>
                <h4>You can add more amenities after you publish your listing.</h4>

            </div>
            <section className='type-list' >
                {iconNames.map((iconName, index) => (
                    <section className={`edit-icon-type ${selectedamenities.includes(iconName) ? " selected" : ""}`}
                        key={index}
                        onClick={() => { handleamenitiesClick(iconName) }}
                    >
                        <div className='property-logo'>
                            <img src={`${iconBasePath}${iconName}.svg`} alt={iconName} />
                        </div>
                        <div className='property-title'>{iconName}</div>
                        <div className="overlay-icon"></div>
                    </section>
                ))}

            </section>

        </section >
    )
}
