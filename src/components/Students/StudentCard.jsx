import axios from "axios";
// import "./StudentCard.css";
import img from "./student2.png";
import { IconButton} from "@mui/material";
import { DeleteForeverRounded } from "@mui/icons-material";
import PopupStudent from "./PopupStudent.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

export const StudentCard = ({ student, deleteStudent, getAllStudents, updateStudent}) => {
  const handleDelete = () => {
    deleteStudent(student.id);
    window.confirm("Do you want to delete the student?");
  };

  const token = localStorage.getItem('token');
  const config1= {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  }
  const [buttonPopup, setButtonPopup] = useState(false);
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = () => {
    setButtonPopup(true);
  };


const submitHandler = (e) => {
  e.preventDefault();
  setIsPending(true);
  const updatedStudent = {
    id: student.id,
    firstName: firstName || student.firstName,
    lastName: lastName || student.lastName,
    email: student.email,
    phoneNumber: student.phoneNumber,
  };
  axios.put(`http://localhost:8000/api/user/${student.id}`, updatedStudent, config1)
    .then(() => {
      setIsPending(false);
      setButtonPopup(false);
      getAllStudents();
    })
    .catch((err) => {
      console.log(err);
      setIsPending(false);
    });
};

  
  return (
    <div>
      <div className="cardFrameTeacher">
        <button className="deleteTeacherButtencontainer" onClick={handleDelete}>
          <DeleteForeverRounded />
        </button>
        <img src={img} alt="img" className="pfpic" />
        <div className="cardlineteachercard"></div>
        <div className="TeacherCardContent">
          <p>
            <strong>First Name:</strong> {student.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {student.lastName}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {student.phoneNumber}
          </p>
        </div>
        <div className='addingCourse'>
          <IconButton onClick={handleUpdate}>

          
            <Typography>Edit</Typography>
          </IconButton>
          <PopupStudent
            trigger={buttonPopup}
            setTrigger={() => setButtonPopup(false)}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography
                gutterBottom
                color="white"
                variant="h4"
                component="div"
              >
               Update
              </Typography>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
              />
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
              />
              {!isPending && (
                <button className="btn-add-teacher" onClick={submitHandler}>
                  Edit
                </button>
              )}
              {isPending && (
                <button className="btn-add-teacher" onClick={submitHandler}>
                  Editing...
                </button>
              )}
            </Box>
          </PopupStudent>
        </div>
      </div>
    </div>
  );
};

