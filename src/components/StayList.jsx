import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { memo } from 'react';
import { StayPreview } from "./StayPreview";
import { Link } from 'react-router-dom';

export const StayList = memo(({ stays, onRemove }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(null)

    useEffect(() => {
        // console.log(loadingRef);
        loadItems()
        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            // console.log('entries', entries);
            const entry = entries[0]
            if (entry.isIntersecting) {
                loadItems()
            }
        }, { root: null, margin: '0px' })

        // Observe the "loading" element to trigger loading more items
        if (observer) {
            observer.observe(loadingRef.current);
        }
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);



    function loadItems() {
        if (isLoading) return;
        setIsLoading(true);

        // Simulate an API call to fetch more items (e.g., paginated data)
        setTimeout(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                for (let i = 0; i < 10; i++) {
                    newItems.push(stays[prevItems.length + i + 1]);
                }
                return newItems
            })
            setIsLoading(false);
        }, 1000);
    };


    return (
        <section>
            <ul className="stay-list">
                {
                    stays.map(stay => <li key={stay._id}>
                        <Link to={`/details/${stay._id}`}>
                            <StayPreview stay={stay} />
                        </Link>
                    </li>)
                }
            </ul>
            {isLoading && <p>Loading more items...</p>}
            <div id="loading" style={{ height: '0px' }} ref={loadingRef}></div>
        </section>
    )

})