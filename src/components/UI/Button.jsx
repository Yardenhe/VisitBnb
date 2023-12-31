export function Button({ icon, className = "", text }) {
  return (
    <button className={`action-btn ${className}`}>
      {icon && <div className="icon-holder">{icon}</div>}
      {text}
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