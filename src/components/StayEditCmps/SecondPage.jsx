import React, { useState } from 'react'
import { PropertyFilter } from '../stayFilterCmps/PropertyFilter';


export function SecondPage() {
    const [selectedProperties, setSelectedProperties] = useState([]);
    const iconBasePath = 'img/labels/';
    return (
        <section className="firstpage-edit secondpage-edit">
            <div>
                <h3>Which of these best describes your place?</h3>

            </div>
            {/* <section>
                <PropertyFilter
                    selectedProperty={selectedProperties}
                    onPropertyChange={setSelectedProperties}
                />
            </section> */}

        </section >
    )
}
