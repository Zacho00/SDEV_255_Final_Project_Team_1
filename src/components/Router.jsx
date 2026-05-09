import {Routes, Route} from "react-router";
import Home from "../Pages/Home";
import ViewCourses from "../Pages/ViewCourses";
import CreateCourses from "../Pages/CreateCourses";
import EditCourse from "../Pages/EditCourse";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SearchCourses from "../Pages/SearchCourses";
import MySchedule from "../Pages/MySchedule";
import MyCourses from "../Pages/MyCourses";




export default function Router() {
    return(
        <>
            <Routes>
                <Route path="/SDEV_255_Final_Project_Team_1/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/viewcourses" element={<ViewCourses />}/>
                <Route path="/createcourses" element={<CreateCourses />}/>
                <Route path="/editcourse/:id" element={<EditCourse />}/>
                <Route path="/searchcourses" element={<SearchCourses />}/>
                <Route path="/myschedule" element={<MySchedule />}/>   
                <Route path="/mycourses" element={<MyCourses />}/>   
            </Routes>
        </>
    )
}