import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import Auth from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import InstructorDashboardPage from "./pages/instructor/";
import NotFoundPage from "./pages/not-found";
function App() {
  const {auth} = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<Auth />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route 
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout></StudentViewCommonLayout>}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="home" element={<StudentHomePage></StudentHomePage>}/>
        <Route path="" element={<StudentHomePage></StudentHomePage>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
