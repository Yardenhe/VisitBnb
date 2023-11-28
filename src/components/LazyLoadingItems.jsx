import { useState, useEffect, useRef } from 'react';

function ListItem({ text }) { return <li>{text}</li> }

export function LazyLoadingItems() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(null)

    useEffect(() => {

        console.log(loadingRef);
        loadItems()
        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            console.log('entries', entries);
            const entry = entries[0]
            if (entry.isIntersecting) {
                loadItems()
            }
        }, { root: null, margin: '50px' })


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
                    newItems.push(`Item ${prevItems.length + i + 1}`);
                }
                return newItems
            })
            setIsLoading(false);
        }, 1000);
    };


    return (
        <div className="lazy-loading-items">
            <h1>Lazy Loading with Intersection Observer Example</h1>
            <ul>
                {items.map((item, index) => (
                    <ListItem key={index} text={item} />
                ))}
            </ul>
            {isLoading && <p>Loading more items...</p>}
            <div id="loading" style={{ height: '0px' }} ref={loadingRef}></div>
        </div>
    );
};
