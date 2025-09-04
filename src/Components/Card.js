// Card.js
import "../CSS/Card.css"; // Import the CSS file

const Card = ({ children, style }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
};

export default Card;
