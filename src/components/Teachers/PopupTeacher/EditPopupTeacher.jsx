import "./PopupTeacher.css";
const EditPopupTeacher = (props) => {
  return props.trigger ? (
    <div className="popupTeacher">
      <div className="popup-inner">
        <button
          className="close-teacher-btn"
          onClick={() => window.location.reload()}
        >
          {""}
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditPopupTeacher;
