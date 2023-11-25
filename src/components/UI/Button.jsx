
export function Button({icon ,classname ='', text}) {
  return (
    <button className={`button ${classname}`}>
      <div className="icon-holder">
        {icon}
      </div>
        {text}
    </button>
  )
}
