import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useSelector } from 'react-redux';
import { setCurrOrder } from '../../store/actions/order.actions';

export function DatePicker() {
  const currOrder = useSelector(storeState=>storeState.orderModule.currOrder)
  const {endDate,startDate} = currOrder
  const [selected, setSelected] = useState({endDate,startDate});

  console.log('currOrder',currOrder);

  // useEffect(()=>{
  //   console.log('currOrder',currOrder);
  //   setSelected({ endDate: currOrder.endDate, startDate: currOrder.startDate })
  // },[currOrder])

  function onChangeDates(newDates){
    console.log('newDates',newDates);
    if (!!newDates.from && !!newDates.to){
      const {from:startDate,to:endDate} = newDates
      console.log('startDate',startDate);
      console.log('endDate',endDate);
      setCurrOrder({startDate,endDate} )

    }
    setSelected(newDates)
  }
  return (
    <div>
      <h4>nights in </h4>
      <p>dates here</p>

      <div className="date-picker-large">
      <DayPicker 
        mode="range"
        numberOfMonths={2}
        min={2}
        selected={selected}
        onSelect={onChangeDates}
        // footer={footer}
        pagedNavigation
        showOutsideDays
        // fixedWeeks 
      />
      </div>
    </div>
  )
}
