import "./PopupStudent.css";

const PopupStudent = (props) => {
  return props.trigger ? (
    <div className='popupStudent'>
      <div className='popup-inner-student'>
        <button className='close-student-btn' onClick={()=>(window.location.reload())}>
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

export default PopupStudent;
