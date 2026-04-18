import {Routes, Route} from "react-router";
import Home from "../Pages/Home";
import ViewCourses from "../Pages/ViewCourses";
import CreateCourses from "../Pages/CreateCourses";

export default function Router() {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/viewcourses" element={<ViewCourses />}/>
                <Route path="/createcourses" element={<CreateCourses />}/>
            </Routes>
        </>
    )
}