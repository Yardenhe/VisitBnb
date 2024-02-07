import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { SearchBoxMap } from './SearchBoxMap';



export function FourthPage({ onSetStay }) {


    const keyApi = "AIzaSyCfwC_mk9Fxgszcr2eArRS4PTdQQYy1Si8"
    const [stayLocation, setStayLocation] = useState({
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "address": "Alenby St 5, Tel Aviv-Yafo",
        "lng": 34.7681,
        "lat": 32.0678
    })


    const lat = stayLocation.lat ? stayLocation.lat : 32.0853
    const lng = stayLocation.lng ? stayLocation.lng : 34.7818
    const center = {
        lat,
        lng,
    }
    const zoom = 11

    const Marker = () => {
        return (
            <div className='marker'>
                <div className='marker-container'>
                    <div className='marker-icon'></div>
                    <div className='marker-tooltip'></div>
                    <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='house'>
                        <path d='m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z'></path>
                    </svg>
                </div>
            </div>
        )
    }

    useEffect(() => {
        onSetStay({ "loc": stayLocation })
    }, [stayLocation])
    return (
        <section className="firstpage-edit fourthPage-edit">
            <div>
                <h3>Where's your place located?</h3>
                <h4>Your address is only shared with guests after they’ve made a reservation.</h4>
            </div>
            <section className='map-container' >
                <div className='search-box'>
                    <SearchBoxMap setStayLocation={setStayLocation} stayLocation={stayLocation} keyApi={keyApi} />
                </div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: keyApi, libraries: 'places' }}
                    center={center}
                    defaultZoom={zoom}
                    options={{ language: 'en' }}>
                    <Marker
                        lat={stayLocation.lat}
                        lng={stayLocation.lng}

                    />
                </GoogleMapReact>
            </section>
        </section >
    )
}
