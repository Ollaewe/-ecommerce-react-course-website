import { use, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const [mode, setMode] = useState("signup")
    const [error, setError] = useState(null)
    const { signUp, user, logout, login } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    function onSubmit(data) {
        setError(null)
        let result;
        if (mode === "signup") {
            result = signUp(data.email, data.password)
        } else {
            result = login(data.email, data.password)
        }

        if (result.success) {
            navigate("/")
        } else {
            setError(result.error)
        }


        console.log(result)
    }
    return (
        <div className="page" >
            <div className="container">
                <div className="auth-container">
                    {user && <p>User logged in : {user.email}</p>}
                    <button onClick={() => logout()} >Logout</button>
                    <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="auth-form" >
                        {error && <div className="error-message" >{error}</div>}
                        <div className="form-group" >
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-input" {...register('email', { required: "Email is required" })} />
                            {errors.email &&
                                <span className="form-error" >{errors.email.message}</span>
                            }
                        </div>

                        <div className="form-group" >
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-input"  {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at latest 6 characters"
                                },
                                maxLength: { value: 12, message: "Password mut be less than 12 characters" }
                            })} />
                            {errors.password && (
                                <span className="form-error" >{errors.password.message}</span>
                            )}
                        </div>


                        <button typeof="submit" className="btn btn-primary btn-large" >{mode === "signup" ? "Sign Up" : "Login"}</button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>Already have an account? <span className="auth-link" onClick={() => setMode('login')} >Login</span></p>
                        ) : (
                            <p>Don't have an account? <span className="auth-link" onClick={() => setMode('signup')} >Sign Up </span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}