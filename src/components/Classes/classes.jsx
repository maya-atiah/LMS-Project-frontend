import React from "react";
import "../components.css";
import "./Class.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Navhead from "../../components/Navhead";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PopupClass from "../../components/Classes/PopupClass";

function Classes() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [name, setGrade] = useState("");
  const [sectionIds, setsection] = useState("[]");
  const [isPending, setIsPending] = useState(false);
  const [classes, setclass] = useState([]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [editMode, setEditMode] = useState(false);
const [addMode, setAddMode] = useState(false);
const [data, setData] = useState([]);
const [id, setId] = useState(null);

const [formData, setFormData] = useState({
  name: "",
   });
const handleChange = (event) => {
  setFormData({ ...formData, [event.target.name]: event.target.value });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    loadclass();
  }, [buttonPopup]);

  //get
  const loadclass = async () => {
    const res = await axios.get("http://localhost:8000/api/grade");
    console.log(res.data);
    setclass(res.data);
  };

  //delete
  const deleteUser = async (id) => {
  
  const confirm = window.confirm("Are you sure you want to delete this grade?");
    if (!confirm) {
      return;
    }
  await axios.delete(`http://localhost:8000/api/grade/${id}`);

    loadclass();
  };
  ///////////////////////////////////////////////////////////////////////////////////
  //add
  
const addClass = async () => {
    const capacity = 50;
    

  // Check if the name already exists in classes array
  // const gradeExists = classes.some((grade) => grade.name === name);
  
  // if (gradeExists) {
  //  alert( `'${name}' already exists`);
  //   return;

   // Check if the name already exists in classes array
   const gradeExists = classes.some((grade) => grade.name === name);
   if (gradeExists) {
    // Find the grade object that matches the entered grade name
    const matchedGrade = classes.find((grade) => grade.name === name);
  
 

    const b={
      "sectionIds[0]" : sectionIds[0]
    }
    console.log("body ",JSON.stringify(b));

  await axios
    .post("http://localhost:8000/api/grade",JSON.stringify(b),{ headers: {
      'Content-Type': 'application/json'
  }}
    )
    .then(() => {
     
    });
  setButtonPopup(false);
  loadclass();
  }


// console.log(sectionIds[0], name, capacity);
    else{
const body = {
      name: name,
      capacity: capacity,
      "sectionIds[0]": sectionIds[0],
    };

    console.log("body ", JSON.stringify(body));

  await axios
    .post("http://localhost:8000/api/grade",JSON.stringify(body),{ headers: {
      'Content-Type': 'application/json'
  }}
    )
    .then(() => {
     
    });
  setButtonPopup(false);
  loadclass();
  }
}

  ///
  const submitHandler = (e) => {
    e.preventDefault();
    addClass();
  
  };


  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/grade")
      .then((response) => response.json())
      .then((data) => setGrades(data))
      .catch((error) => console.log(error));
  }, []);

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/section")
      .then((response) => response.json())
      .then((data) => setLetters(data["All Sections"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
    return (
    <>
      <Navhead />

      <div className="component-container">
        <div className="grade-title" onClick={() => setButtonPopup(true)}>
          <div>Grades </div>
          <div className="addingCourse">
            <AddCircleIcon /> Add Grade
            <PopupClass
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
                  Add New Grade
                </Typography>

                <input
                  type="text"
                  id="Grade"
                  name="Grade"
                  placeholder="Grade name"
                  onChange={(e) => setGrade(e.target.value)}
                />
                {/* 
                <br></br>
                <input
                  type="text"
                  id="section"
                  name="Section"
                  placeholder="Section"
                  onChange={(e) => setsection(e.target.value)}
                />
                <br></br> */}

    
    <br></br>
             
  <select  id="letter" name="letter" onChange={(e) => setsection(e.target.value)} className="my-select-student"> 
  <option value="">-- Select a letter --</option>
  {letters.map((letter, index) => (
    <option key={index} value={letter.letter}>
      {letter.letter}
    </option>
  ))}
</select>

                {!isPending && (
                  <button className="btn-add-course" onClick={submitHandler}>
                    add
                  </button>
                )}
                {isPending && (
                  <button className="btn-add-course" onClick={submitHandler}>
                    adding new Grade
                  </button>
                )}
              </Box>
            </PopupClass>
          </div>
        </div>
        <br></br> <br></br>


            <div>
             
<table className="table-class">
          <thead>
            <tr className="first--">
              <th>Class</th>
              <th>Section</th>
              <th>Delete</th>
            </tr>
            </thead>

            <tbody>
              {classes.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <th> {item.name} </th>

                    <th>
                      {item.sections.map((section, index) => (
                        <th key={index}> {section.letter}</th>
                      ))}
                    </th>

                    <th>
                      {" "}
                      <button
                        alt=""
                        className="button"
                        onClick={() => deleteUser(item.id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Classes;
