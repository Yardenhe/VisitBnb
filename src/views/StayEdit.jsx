import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { stayService } from "../services/stay.service";
import { utilService } from "../services/util.service";
import { useForm } from "../customHooks/useForm";
import { FirstPage } from "../components/StayEditCmps/FirstPage";
import { SecondPage } from "../components/StayEditCmps/SecondPage";
import { ThirdPage } from "../components/StayEditCmps/ThirdPage";
import { FourthPage } from "../components/StayEditCmps/FourthPage";
import { FifthPage } from "../components/StayEditCmps/FifthPage";
import { SixthPage } from "../components/StayEditCmps/SixthPage";
import { SeventhPage } from "../components/StayEditCmps/SeventhPage";
import { EighthPage } from "../components/StayEditCmps/EighthPage";
import { NinthPage } from "../components/StayEditCmps/NinthPage"
import { TenthPage } from "../components/StayEditCmps/TenthPage"





export function StayEdit() {

    const [stay, setStay] = useState(stayService.getEmptyStay())
    console.log("🚀 ~ StayEdit ~ stay:", stay)
    const { onSaveStay } = useOutletContext()
    const { stayId } = useParams()
    const [step, setStep] = useState(1);

    const pages = [
        { component: <FirstPage /> },
        { component: <SecondPage onSetStay={onSetStay} stay={stay} /> },
        { component: <ThirdPage onSetStay={onSetStay} stay={stay} /> },
        { component: <FourthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <FifthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <SixthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <SeventhPage onSetStay={onSetStay} stay={stay} /> },
        { component: <EighthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <NinthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <TenthPage onSetStay={onSetStay} stay={stay} /> },

    ];
    const currentPage = pages[step - 1];

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (stayId) {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        }
    }

    function onSetStay(fieldsToUpdate) {
        fieldsToUpdate = { ...stay, ...fieldsToUpdate }
        setStay(fieldsToUpdate)
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
            <section className="edit-main">
                {currentPage.component}
            </section>
            <section className="edit-footer">
                <div className="footer-loader" >
                    <div className="loader" ></div>
                </div>
                <section className="footer-btns">

                    <button className="back-btn" disabled={step <= 1} onClick={() => setStep(step - 1)}>Back</button>
                    <button className="next-btn" onClick={() => setStep(step === pages.length ? 1 : step + 1)}>Next</button>

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
