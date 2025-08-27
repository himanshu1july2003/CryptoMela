
import { useLocation, useNavigate } from "react-router-dom"
import "./Auth.css"
import Signup from "./Signup"
import { Button } from "@/components/ui/button"
import ForgotPasswordForm from "./ForgotPasswordForm"
import SigninForm from "./SigninForm"
const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className=' h-screen w-screen relative authContainer bg-cover'>
            <div className=' absolute top-0 right-0 left-0 bottom-0   '>
                <div
                    className="bgBlurClass absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                 flex flex-col  items-center pt-15 gap-5
                                 h-[35rem] w-[33.5rem] rounded-md 
                                 z-50 bg-black/50  shadow-2xl shadow-white"
                ><h1 className="text-6xl font-bold">CryptoMela</h1>
                    {location.pathname == "/signup" ?(
                        <section className="flex flex-col gap-3 w-[70%]">
                            <Signup />
                            <div className="flex items-center justify-center">
                                <span>have already account ?</span>
                                <Button onClick={() => navigate("/signin")} variant="">
                                    Login
                                </Button>
                            </div>
                        </section>)
                         : location.pathname == "/forgot-password" ? (
                            <section className="flex flex-col gap-3 w-[70%]">
                                <ForgotPasswordForm />
                                <div className="flex items-center justify-center">
                                    <span>Back to login ?</span>
                                    <Button onClick={() => navigate("/signin")} variant="">
                                        SignIn
                                    </Button>
                                </div>
                            </section>
                        ) : (
                            <section className="flex flex-col gap-3 w-[70%]">
                                <SigninForm />
                                <div className="flex items-center justify-center">
                                    <span>Don't have account ?</span>
                                    <Button onClick={() => navigate("/signup")} >
                                        Register
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center">
                                    <span className="text-[80%]">Forgot Password ?</span>
                                    <Button className="text-[80%]"  onClick={() => navigate("/forgot-password")} variant="ghost">
                                        <u >Click Here</u>
                                    </Button>
                                </div>
                            </section>
                        )}
                </div>
            </div>
        </div>
    )
}
export default Auth