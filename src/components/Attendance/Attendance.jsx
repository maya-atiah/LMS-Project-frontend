import React from "react";
import "../components.css";
import "../Attendance/Attendance.css";
import Navhead from "../../components/Navhead";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Dropdown from "react-multilevel-dropdown";




function Attendance() {


  const [attendee, setAttendee] = useState();
  const [gradeSection, setGradeSection] = useState();
  const [student,setStudent]=useState();
  const [tableMood, setTableMood] = useState(false);

  const [gradeName,setGradeName]=useState();
  const [sectionName,setSectionName]=useState();
  
 


  const fetchAttendance = async () => {
    const res = await axios.get("http://localhost:8000/api/attendance");
    setAttendee(res.data);
    // console.log(attendee);
  };

  const fetchGradeSection = async () => {
    const res = await axios.get("http://localhost:8000/api/grade");
    setGradeSection(res.data);
  };



  const fetchallStudentByGradeSection = async (gradeName,sectionName) => {
    const res = await axios.get(`http://localhost:8000/api/allStudent/${gradeName}${sectionName}`);
    setStudent(res.data);
  };
  console.log(student);




  useEffect(() => {
    fetchAttendance();
    fetchGradeSection();
    fetchallStudentByGradeSection();
  }, []);
  

  const handleGetStudent=()=>{

     setTableMood(true);
  }

  return (
    <div>
      <Navhead />

      <section>
        <div className='component-container'>
          <h1> Attendance</h1>
          <div className='form-attendance'>
            <div>
              <Dropdown title="Grade/Section" position='right' >
                {gradeSection &&
                  gradeSection.map((grade) => {
                    return (
                      <Dropdown.Item  onChange={(e)=>setGradeName(e.target.value)} key={grade.id}>
                        {grade.name}
                        <Dropdown.Submenu position='right'>
                          {grade.sections.map((section) => {
                             return (
                            <Dropdown.Item onClick={handleGetStudent} onChange={(e)=>setSectionName(e.target.value)} key={section.id}>{section.letter}</Dropdown.Item>)
                          })}
                        </Dropdown.Submenu>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown>
            </div>
           
            <div>
              <button className='submit-attendance'>Submit</button>
            </div>
          </div>
          <div>
            {tableMood &&(
            <table className='attendance-table'>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
              {student && student.map((student)=>{

             
              <tr>
                <td>{student.firstName}</td>
                <td>{student.lastNam}</td>
                <td>
                  {" "}
                  <form>
                    <div className='input-attendance'>
                      <div>
                        {" "}
                        <input
                          type='radio'
                          id='present'
                          name='fav_language'
                          value='present'
                        />
                        <label>present</label>
                      </div>
                      <div>
                        {" "}
                        <input
                          type='radio'
                          id='abscent'
                          name='fav_language'
                          value='abscent'
                        />
                        <label>abscent</label>
                      </div>
                      <div>
                        <input
                          type='radio'
                          id='late'
                          name='fav_language'
                          value='late'
                        />
                        <label for='late'>late</label>
                      </div>
                    </div>
                  </form>{" "}
                </td>
                <td>1111</td>
              </tr>
               })}
            </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Attendance;
