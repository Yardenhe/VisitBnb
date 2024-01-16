import React from 'react'
import { useState } from 'react';
import { PriceSlider } from './PriceSlider';
import { PropertyFilter } from './PropertyFilter';
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { useEffectUpdate } from '../../customHooks/useEffectUpdate';

export function ModalFilter({ isOpen, onClose, setFilterByToEdit }) {

    const stays = useSelector((storeState) => storeState.stayModule.stays);
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(500);
    const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
    const [selectedBeds, setSelectedBeds] = useState("Any");
    const [selectedBathrooms, setSelectedBathrooms] = useState("Any");
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [selectedAmmenties, setSelectedAmmenties] = useState([]);
    const [resultLength, setResultLength] = useState(stays.length);
    const overlayClassName = isOpen ? 'overlayModal' : '';

    const amenities = [
        {
            title: "wifi",
            txt: "Wifi",
        },
        {
            title: "washer",
            txt: "Washer",
        },
        {
            title: "air-conditioning",
            txt: "Air conditioning",
        },
        {
            title: "dedicated-workspace",
            txt: "Dedicated workspace",
        },
        {
            title: "hair-dryer",
            txt: "Hair dryer",
        },
        {
            title: "kitchen",
            txt: "Kitchen",
        },
        {
            title: "dryer",
            txt: "Dryer",
        },
        {
            title: "heating",
            txt: "Heating",
        },
        {
            title: "tv",
            txt: "TV",
        },
        {
            title: "iron",
            txt: "Iron",
        },
    ];
    useEffectUpdate(() => {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "ammenties": selectedAmmenties }))
    }, [selectedAmmenties])
    useEffectUpdate(() => {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "beds": selectedBeds, "bedrooms": selectedBedrooms, "bathrooms": selectedBathrooms }))
    }, [selectedBeds, selectedBathrooms, selectedBedrooms])
    useEffectUpdate(() => {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "Properties": selectedProperties }))
    }, [selectedProperties])


    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0])
        setMaxPrice(newValue[1])
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "minPrice": newValue[0], "MaxPrice": newValue[1] }))
    };
    function handleCheckboxChange(ev) {
        const { name, checked } = ev.target;
        setSelectedAmmenties((prevSelectedAmmenties) => {
            if (checked) {
                return [...prevSelectedAmmenties, name];
            } else {
                return prevSelectedAmmenties.filter((ammenty) => ammenty !== name);
            }
        });

    }

    return (
        <div className={overlayClassName} >
            <div className='modal-filters'>
                <div className='modal-header'>
                    <p onClick={() => onClose()}><IoCloseOutline /></p>
                    <h3>Filters</h3>
                </div>
                <div className='modal-content'>
                    <div className='price-range'>
                        <h4 className='medium-bold' >Price range</h4>
                        <p>Nightly prices including fees and taxes</p>
                        <div className="price-range-slider-container">
                            <PriceSlider defaultValue={[10, 500]} onChange={handlePriceChange} />

                        </div>
                        <div className='price-numbers'>
                            <div className='price-number-item'> <h5>Minimum</h5> ${minPrice}</div>
                            <div className='price-number-item'><h5>Maximum</h5> ${maxPrice}</div>
                        </div>
                    </div>

                    <div className='rooms-and-beds-sec'>
                        <h4 className='bold'>Rooms and beds</h4>
                        <div className="details-title">Bedrooms</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBedrooms.toString() === label
                                                ? "selected"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBedrooms("Any");
                                                } else {
                                                    setSelectedBedrooms(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="details-title">Beds</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBeds.toString() === label ? "selected" : ""
                                                }`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBeds("Any");
                                                } else {
                                                    setSelectedBeds(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="details-title">Bathrooms</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBathrooms.toString() === label
                                                ? "selected"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBathrooms("Any");
                                                } else {
                                                    setSelectedBathrooms(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="stay-ammenities">
                            <div className="stay-ammenities-title">Amenities</div>
                        </div>
                        <div className="price-range-slider-container">

                        </div>
                    </div>
                    <div className='stay-property'>
                        <h4 className='bold'>Property Type</h4>
                        <PropertyFilter
                            selectedProperty={selectedProperties}
                            onPropertyChange={setSelectedProperties}
                        />
                    </div>
                    <div className='stay-ammenities'>
                        <h4 className='bold'>Amenities</h4>

                        <div className="ammenities-section">
                            {amenities.map((amenity) => (
                                <div className="ammenities-input" key={amenity.title}>
                                    <label htmlFor={amenity.title} className="flex">
                                        <input
                                            type="checkbox"
                                            id={amenity.title}
                                            name={amenity.title}
                                            onChange={handleCheckboxChange}
                                            checked={selectedAmmenties.includes(amenity.title)}
                                        />
                                        <div className="input-container">
                                            <span
                                                className={`input-icon ${selectedAmmenties.includes(amenity.title)
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                            >
                                                <IoMdCheckmark />
                                                {selectedAmmenties.includes(amenity.title)
                                                    ? ""
                                                    : ""}
                                            </span>
                                            <span className="input-title">{amenity.txt}</span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-modal-footer">
                        <div
                            className="clear-btn"
                            onClick={() => {
                                setMinPrice(0);
                                setMaxPrice(500);
                                setSelectedBedrooms("Any");
                                setSelectedBeds("Any");
                                setSelectedBathrooms("Any");
                                setSelectedAmmenties([]);
                                // setAppliedFilters([]);
                                setSelectedProperties([]);
                            }}
                        >
                            Clear all
                        </div>
                        <div className="search-btn">
                            <button
                                type="submit"
                                className="filter-modal-btn"
                                onClick={() => {
                                    //  handleFilterModal("close");
                                    //  console.log("btn submit clicked ");
                                }}
                                disabled={!resultLength}
                            >
                                {resultLength ? `Show ${resultLength} places` : "No places"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
