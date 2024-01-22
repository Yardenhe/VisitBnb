import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL_DATA } from "../../store/reducers/app.reducer";
import { DatePicker } from "./DatePicker";

export function DynamicModal() {
    const modalData = useSelector(storeState => storeState.appModule.modalData)
    const dispatch = useDispatch()
    function onCloseModal(ev) {
        console.log('Hey hey i dont wanna close')
        dispatch({
            type: SET_MODAL_DATA,
            modalData: null
        })
    }
    // {type: 'goodbye', payload: {style, stay}}
    if (!modalData) return <></>
    return (
        <div className="dynamic-modal" onClick={modalData.cb}>
            <button onClick={onCloseModal}>X</button>
            <DynamicCmp type={modalData.type} payload={modalData.payload} />
            {/* {modalData.cmp} */}
        </div>
    )
}


function DynamicCmp({ type, payload }) {
    console.log(type);
    const cmpMap = {
        datePicker: <DatePicker />,
        hello: <HelloModal payload={payload} />,
        goodbye: <GoodbyeModal payload={payload} />
    }

    const CmpToRender = cmpMap[type]
    console.log(CmpToRender);
    return CmpToRender
}

function HelloModal({ payload }) {
    const { user } = payload
    return <div >
        <p>Do it</p>
        <h3> Hello {user.fullname}</h3>
    </div>
}

function GoodbyeModal({ payload }) {
    console.log(payload);
    const { fontSize } = payload
    return <div >
        <h1>Goodbye {fontSize} </h1>
        <p>Dont do it</p>
    </div>
}