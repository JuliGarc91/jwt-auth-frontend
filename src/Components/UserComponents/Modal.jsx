const Modal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )
    );
}

export default Modal