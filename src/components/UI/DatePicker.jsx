import { StaticDateTimePicker } from "@mui/x-date-pickers";

export function DatePicker() {
  return (
    <div>
      <h4>nights in </h4>
      <p>dates here</p>

      <div className="date-picker-large">
        <StaticDateTimePicker />
      </div>
    </div>
  )
}
