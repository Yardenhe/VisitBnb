import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { stayService } from "../services/stayService.service";
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
            <Link to="/"><button className="close-btn">X</button></Link>
            <h1>{stayId ? 'Edit' : 'Add'} Stay</h1>
            <form onSubmit={onSubmitStay}>
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
            </form>
        </section>
    )
}
