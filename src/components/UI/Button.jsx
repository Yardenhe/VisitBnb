export function Button({ icon, className = "", text, isUnderlined }) {
  return (
    <button className={`action-btn ${className}`}>
      {icon && <div className="icon-holder">{icon}</div>}
      <span className={`action-btn-text ${isUnderlined ? 'underline' : ''}`}>{text}</span>
    </button>
  );
}

