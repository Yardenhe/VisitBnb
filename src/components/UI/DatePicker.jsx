import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useSelector } from 'react-redux';
import { setCurrOrder } from '../../store/actions/order.actions';

export function DatePicker() {
  const currOrder = useSelector(storeState => storeState.orderModule.currOrder)
  console.log('currOrder', currOrder);
  const { endDate, startDate } = currOrder
  const [selected, setSelected] = useState({ endDate, startDate });


  const today = new Date()
  // IMPROVEMENT - GET UNAVAILABLE DATES 
  const disabledDays = { before: today }


  function onChangeDates(newDates) {
    // console.log('newDates',newDates);
    if (newDates === undefined) return
    // if (!!newDates.from && !!newDates.to) {
    const { from: startDate, to: endDate } = newDates
    // console.log('startDate',startDate);
    // console.log('endDate',endDate);
    setCurrOrder({ startDate, endDate })
    // }
    setSelected(newDates)
  }
  return (
    <div>
      <h4>nights in { } </h4>
      <p>dates here</p>

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
          modifiersStyles={{
            disabled: { textDecoration: 'line-through' },
            // selectedStart:{backgroundColor:'#222',color:'white'},
            // selectedEnd:{backgroundColor:'#222',color:'white'},
            selected: { color: '#222' }//,borderBlockStyle:'outset'}
          }}
        />
      </div>
    </div>
  )
}
