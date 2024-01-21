import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { stayService } from "../services/stay.service";
import { utilService } from "../services/util.service";
import { useForm } from "../customHooks/useForm";


export function StayEdit() {
    console.log('StayEdit component rendered');
    const [stay, handleChange, setStay] = useForm(stayService.getEmptyStay())
    const { onSaveStay } = useOutletContext()
    const { stayId } = useParams()

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (stayId) {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        }
    }
    function onSubmitStay(ev) {
        ev.preventDefault()
        const elInputs = Array.from(ev.target).filter(elInput => elInput.nodeName !== 'BUTTON')
        const elEmptyInputs = elInputs.filter(elInput => !elInput.value || elInput.value === '0')
        if (elEmptyInputs.length) return handleEmptyInputs(elEmptyInputs)

        try {
            onSaveStay(stay)
        } catch (err) {
            console.log('Had issues adding stay', err);
        }
    }
    async function handleEmptyInputs(elEmptyInputs) {
        // elEmptyInputs.forEach(async elEmptyInput => {
        //     await utilService.animateCSS(elEmptyInput, 'shakeX')
        // })
        elEmptyInputs[0].focus()
        for (const elEmptyInput of elEmptyInputs) {
            await utilService.animateCSS(elEmptyInput, 'shakeX')
        }

    }

    const { name, type, price } = stay
    return (
        <section className="stay-edit">
            <section className="edit-header">
                <Link to="/">  <img src="/public/img/icons/airbnbBlack.svg" ></img></Link>
                {/* <h1>{stayId ? 'Edit' : 'Add'} Stay</h1> */}
            </section>
            <section className="firstpage-edit">
                <div>
                    <h4>Step 1</h4>
                    <h1>Tell us about your place</h1>
                    <h3>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</h3>
                </div>
                <div class="video-container"><video src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" autoplay="" playsinline="" className="video"></video></div>

            </section>
            <section className="edit-footer">
                <div class="footer-loader" >
                    <div class="loader" ></div>
                </div>
                <section className="footer-btns">

                    <button class="back-btn" disabled="">Back</button>
                    <button class="next-btn" fdprocessedid="bgpl49">Next</button>

                </section>
            </section>


            {/* <form onSubmit={onSubmitStay}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={handleChange}
                    type="text" id="name" name="name" />

                <label htmlFor="type">Type</label>
                <select value={type} onChange={handleChange}
                    id="type" name="type" >
                    <option disabled value="">Choose a type</option>
                    <option value="House">House</option>
                    <option value="National parks">National parks</option>
                    <option value="Islands">Islands</option>
                    <option value="Castles">Castles</option>
                </select>

                <label>price {price}
                    <input type="range" value={price} onChange={handleChange}
                        id="price" name="price" min={10} max={700} step={1} />
                </label>
                <button>Save</button>
            </form> */}
        </section>
    )
}
