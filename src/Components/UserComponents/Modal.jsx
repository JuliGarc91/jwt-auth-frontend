import { useLocation } from 'react-router-dom';

const Modal = ({ isOpen, onCancel, onConfirm }) => {
    const location = useLocation();
    const pathname = location.pathname;
  
    let message;
    if (pathname.includes('/plant/') && pathname.split('/').length === 3) {
      message = "Are you sure you want to delete this plant?";
    } else if (pathname.includes('/plant/') && pathname.includes('/carelogs/')) {
      message = "Are you sure you want to delete selected care log?";
    } else {
      message = "Are you sure you want to delete this item?";
    }
  return (
    isOpen && (
        <div className="modal">
          <div className="modal-content">
            <header class="modal-header">
                <span class="close"onClick={onCancel}>&times;</span>
            </header>
            <img src="https://res.cloudinary.com/dwygxzqku/image/upload/v1713670671/plant-trash.jpg" alt="delete" className='delete'/>
            <p>{message}</p>
            <button onClick={onConfirm} className="delete-button">Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )
    );
}

export default Modal