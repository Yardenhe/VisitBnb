export function Button({ icon, className = "", text,isUnderlined }) {
  return (
    <button className={`action-btn ${className}`}>
      {icon && <div className="icon-holder">{icon}</div>}
      <span className={`action-btn-text ${isUnderlined ? 'underline' : ''}`}>{text}</span>
    </button>
  );
}

    // import { Link } from "react-router-dom";
    
    // export function Button({icon ,classname ='', text ,linkTo = '/'}) {
    //   return (
    //     <Link to={linkTo} className={`button ${classname}`}>
    //       <div className="icon-holder">
    //         {icon}
    //       </div>
    //         {text}
    //     </Link>
    //   )
    // }