import React from 'react'
import GoogleMapReact from 'google-map-react';

export function FourthPage() {
    const defaultProps = {
        center: {
            lat: 31.906729,
            lng: 35.007529
        },
        zoom: 11
    }

    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return (
        <section className="firstpage-edit fourthPage-edit">
            <div>
                <h3>Where's your place located?</h3>
                <h4>Your address is only shared with guests after they’ve made a reservation.</h4>

            </div>
            <section className='map-container' >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDZ_exO5x3MHAchKom7w1W0Vk7bgIQhQZ8" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={31.906729}
                        lng={35.007529}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </section>

        </section >
    )
}
