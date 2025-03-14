import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { useState } from "react";
import CommonForm from "@/components/components-form";
import { signUpFormControls, signInFormControls } from "@/config";

function Auth(){
    const [activeTab, setActiveTab] = useState('sigin');  
    function handleTabChange(value){
        setActiveTab(value);
    }
    return( 
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link to={"/"} className="flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 mr-4" />
                    <span className="font-extrabold text-xl">LMS LEARN</span>
                </Link>
            </header>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs value={activeTab} defaultValue="signin" onValueChange={handleTabChange} className = "w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">    
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signup">
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value = "signin">
                    <CommonForm formControls={signInFormControls}></CommonForm>   
                    </TabsContent>
                    <TabsContent value = "signup">
                        <CommonForm formControls={signUpFormControls}></CommonForm>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )   
}   
export default Auth;