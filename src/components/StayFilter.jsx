import React, { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsSliders } from "react-icons/bs";
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

const iconBasePath = 'img/labels/';
const iconNames = ['amazingpools', 'amazingviews', 'cabins', 'castles', 'Countryside'
    , 'cycladichomes', 'iconiccities', 'luxe', 'mansions', 'minsus', 'nationalparks', 'omg!', 'towers'];
export function StayFilter({ filterBy, onSetFilter }) {

    const scrollContainerRef = useRef(null);
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffectUpdate(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    function onTypeChange(iconName) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "type": iconName }))
    }
    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust the scroll amount as needed
            const scrollWidth = scrollContainerRef.current.scrollWidth;
            const currentScroll = scrollContainerRef.current.scrollLeft;

            let newScroll;

            if (direction === 'left') {
                newScroll = Math.max(0, currentScroll - scrollAmount);
            } else {
                newScroll = Math.min(scrollWidth, currentScroll + scrollAmount);
            }

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth',
            });
        }
    };
    return (
        <section className='stay-filter'>
            <IoIosArrowBack className='arrow arrow-left' onClick={() => handleScroll('left')} />
            <div className='scroll-container' ref={scrollContainerRef}>
                {iconNames.map((iconName, index) => (
                    <section className='stay-icon' key={index} onClick={() => onTypeChange(iconName)}>
                        <img src={`${iconBasePath}${iconName}.jpg`} alt={iconName} />
                        <p>{iconName}</p>
                    </section>
                ))}

            </div>
            <IoIosArrowForward className='arrow arrow-right' onClick={() => handleScroll('right')} />
            <div className='filter-button'>
                <BsSliders />
                <p>Filters</p>
            </div>
        </section>
    );
}