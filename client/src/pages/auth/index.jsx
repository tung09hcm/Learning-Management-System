import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { useContext, useState } from "react";
import CommonForm from "@/components/components-form";
import { signUpFormControls, signInFormControls } from "@/config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";

function Auth(){
    const [activeTab, setActiveTab] = useState('sigin');  
    const {signInFormData,  setSignInFormData, signUpFormData,  setSignUpFormData, handleLoginUser, handleRegisterUser} = useContext(AuthContext);
    function handleTabChange(value){
        setActiveTab(value);
    }
    function isSiginFormValid(){
        return signInFormData.email === "" || signInFormData.password === "";
    }
    function isSigupFormValid(){
        return signUpFormData.userEmail === "" || signUpFormData.password === "" || signUpFormData.userName === "";
    }
    console.log(signInFormData);
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
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Sign in to your account  
                                </CardTitle>
                                <CardDescription>
                                    Enter your email and password to sign in to your account
                                </CardDescription>
                                <CardContent className="space-y-2">
                                    <CommonForm 
                                        formControls={signInFormControls}
                                        buttonText={"Sign In"}
                                        formData={signInFormData}
                                        setFormData={setSignInFormData}
                                        isButtonDisabled={isSiginFormValid()}
                                        handleSubmit={handleLoginUser}
                                    ></CommonForm>
                                </CardContent>
                            </CardHeader>
                        </Card>  
                    </TabsContent>
                    <TabsContent value = "signup">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Create a new account  
                                </CardTitle>
                                <CardDescription>
                                    Enter your details to get started
                                </CardDescription>
                                <CardContent className="space-y-2">
                                    <CommonForm 
                                        formControls={signUpFormControls}
                                        buttonText={"Sign Up"}
                                        formData={signUpFormData}
                                        setFormData={setSignUpFormData}
                                        isButtonDisabled={isSigupFormValid()}
                                        handleSubmit={handleRegisterUser}
                                    ></CommonForm>
                                </CardContent>
                            </CardHeader>
                        </Card>  
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )   
}   
export default Auth;