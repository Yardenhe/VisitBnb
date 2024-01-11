import React from 'react'

export function GuestsModal() {
    return (
        <div className='location-modal list-gusets'>
            <div className='who-items'>
                <div>
                    <h5>Adults</h5>
                    <p>Ages 13 or above</p>
                </div>
                {/* <div class="guests-action flex">
                    <button type="button" class="guests-modal-btn" disabled=""></button>
                    <span class="guests-modal-count">0</span>
                    <button type="button" class="guests-modal-btn" fdprocessedid="jzt3dp">
                    </button>
                </div> */}

            </div>
            <div className='who-items'>
                <div>
                    <h5>Children</h5>
                    <p>Ages 2–12</p>
                </div>
            </div>
            <div className='who-items'>
                <div>
                    <h5>Infants</h5>
                    <p>Under 2</p>
                </div>
            </div>
            <div className='who-items'>
                <div>
                    <h5>Pets</h5>
                    <p>Bringing a service animal?</p>
                </div>
            </div>
        </div>
    )
}
