import {Routes, Route} from "react-router";
import Home from "../Pages/Home";
import ViewCourses from "../Pages/ViewCourses";
import CreateCourses from "../Pages/CreateCourses";
import EditCourse from "../Pages/EditCourse";


export default function Router() {
    return(
        <>
            <Routes>
                <Route path="/SDEV_255_Final_Project_Team_1/" element={<Home />}/>
                <Route path="/viewcourses" element={<ViewCourses />}/>
                <Route path="/createcourses" element={<CreateCourses />}/>
                <Route path="/editcourse/:id" element={<EditCourse />}/>    
            </Routes>
        </>
    )
}