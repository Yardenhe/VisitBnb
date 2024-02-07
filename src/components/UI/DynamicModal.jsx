import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL_DATA } from "../../store/reducers/app.reducer";
import { DatePicker } from "./DatePicker";
import { DynamicCmp, StoreDynamicCmp } from "../stayFilterCmps/DynamicCmp";
import { IoIosClose as CloseSvg } from "react-icons/io";

export function DynamicModal() {
    const modalData = useSelector(storeState => storeState.appModule.modalData)
    const dispatch = useDispatch()
    console.log('modalData', modalData);

    function onCloseModal(ev) {
        console.log('')
        dispatch({
            type: SET_MODAL_DATA,
            modalData: null
        })
    }
    if (!modalData) return <></>
    return (
        <div className="overlayModal" onClick={modalData.cb}>
            <div className="dynamic-modal">

                <div className='dynamic-modal-close'>
                    <button onClick={onCloseModal}><CloseSvg /></button>
                </div>

                <StoreDynamicCmp type={modalData.type} payload={modalData.payload} onCloseModal={onCloseModal} />
            </div>
        </div>
    )
}



