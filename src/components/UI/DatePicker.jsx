import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useSelector } from 'react-redux';
import { setCurrOrder } from '../../store/actions/order.actions';
import { utilService } from '../../services/util.service';

export function DatePicker({ isModal = false }) {
  const currOrder = useSelector(storeState => storeState.orderModule.currOrder)
  const { startDate: from, endDate: to } = currOrder
  const [selected, setSelected] = useState({ to, from });

  const today = new Date()
  const disabledDays = { before: today }

  useEffect(() => {
    console.log('startDate dependency');
    setSelected({ to, from })
  }, [to, from])


  function onChangeDates(newDates) {
    console.log('newDates', newDates);
    if (newDates === undefined) return
    const { from: startDate, to: endDate } = newDates

    setCurrOrder({ startDate, endDate })
    // setSelected(newDates)
  }

  function onClearDates(){
    setCurrOrder({startDate:'',endDate:''})
  }


  return (
    <>
      {(!isModal) &&
        (<div className="date-picker-head">
          <h4>nights in {currOrder.city} </h4>
          <p>
            {currOrder.startDate && (
              <span>{utilService.formatOrderDate(currOrder.startDate)}-</span>
            )}
            {currOrder.endDate && utilService.formatOrderDate(currOrder.endDate)}
          </p>
        </div>)
      }
      <div className="date-picker-large">
        <DayPicker
          mode="range"
          numberOfMonths={2}
          min={2}
          max={14}
          selected={selected}
          onSelect={onChangeDates}
          pagedNavigation
          // footer={footer}
          // showOutsideDays
          fixedWeeks
          disabled={disabledDays}
          fromMonth={today}
          modifiers={{
            start: selected.from,
            end: selected.to,
            selectedStart: selected.from,
            selectedEnd: selected.to,
            disabled: disabledDays
          }}
          modifiersStyles={{
            disabled: { textDecoration: 'line-through' },
            selected: { color: '#222' },//,borderBlockStyle:'outset'}
            // range_middle:{backgroundColor:'grey'}

          }}
        />
        <div className="date-picker-bottom">
          {/* TODO - CLEAR DATES! */}
          <button className='btn-clear-dates' onClick={onClearDates} >Clear dates</button>

        </div>
      </div>
    </>
  )
}

function DateHeadJsx({ city, nights, duration = 'getDuration' }) {
  return <>
    <h4>{nights} {pluralizeLabel(nights, 'night')} in {city}</h4>
    <p>{duration}</p>
  </>
}