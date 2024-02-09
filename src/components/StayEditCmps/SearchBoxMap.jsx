import React, { useEffect, useState } from 'react'
import { AiOutlineClear } from "react-icons/ai";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";

export function SearchBoxMap({ setStayLocation, stayLocation, keyApi }) {

    const [address, setAddress] = useState("");

    useEffect(() => {
        if (stayLocation) {
            setAddress(stayLocation.address);
        }
    }, [stayLocation]);

    async function getPlaceDetails(placeId) {
        try {
            const location = await geocodeByPlaceId(placeId);

            const locationDetails = location[0].address_components.reduce(
                (acc, curr) => {
                    if (curr.types.includes("route")) {
                        acc.street = curr.short_name;
                    }
                    if (curr.types.includes("locality")) {
                        acc.city = curr.long_name;
                    }
                    if (curr.types.includes("country")) {
                        acc.country = curr.long_name;
                        acc.countryCode = curr.short_name;
                    }
                    if (curr.types.includes("administrative_area_level_1")) {
                        acc.state = curr.long_name;
                    }
                    return acc;
                },
                {}
            );

            const streetNumber = location[0].address_components.find((address) =>
                address.types.includes("street_number")
            );
            if (streetNumber) locationDetails.streetNum = streetNumber.short_name;

            locationDetails.address = location[0].formatted_address;
            locationDetails.lat = location[0].geometry.location.lat();
            locationDetails.lng = location[0].geometry.location.lng();
            locationDetails.placeId = placeId;

            setStayLocation(locationDetails);

            if (!locationDetails.street)
                showErrorMsg("Please provide a street address.");
        } catch (error) {
            console.error(error);
        }
    }

    function clearAddress() {
        setAddress("");
        setStayLocation("");
    }


    return (
        <section className="google-autocomplete">
            <div>
                <GooglePlacesAutocomplete
                    apiKey="AIzaSyCfwC_mk9Fxgszcr2eArRS4PTdQQYy1Si8"
                    debounce={300}
                    selectProps={{
                        placeholder: stayLocation?.address ?? "Where are you going?",
                        value: stayLocation?.address ?? address,
                        onChange: (address) => {
                            setAddress(address);
                            getPlaceDetails(address.value.place_id);
                        },
                    }}
                    onLoadFailed={(error) =>
                        console.error("Could not inject Google script", error)
                    }
                    apiOptions={{ language: 'en' }}
                />
            </div>
        </section>
    );
}
