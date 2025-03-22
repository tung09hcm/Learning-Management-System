import { useContext} from "react";
import { AuthContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
function StudentHomePage()
{
    const {resetCredentials} = useContext(AuthContext);
    function handleLogOut(){
        resetCredentials();
        sessionStorage.clear();
    }
    return <>
        <div>
            StudentHomePage
            <Button onClick = {handleLogOut}>Logout</Button>
        </div>
    </>
}
export default StudentHomePage; 