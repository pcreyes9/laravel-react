import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup(){
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConRef = createRef();

    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConRef.current.value,
            // _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
        
        console.log(payload);
        
        axiosClient.post('/signup', payload) // pag naka get gumagana
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            console.log(response);
            console.log("api route denied");
            if (response && response.status === 422) {
                // console.log(response.data.errors);
                setErrors(response.data.errors)
            }
            if(response.status === 200){
                console.log("status 200")
            }
        })
    } 

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign up for free</h1>

                    {errors && 
                        <div className="alert">
                        {Object.keys(errors).map(key => (
                          <p key={key}>{errors[key][0]}</p>
                        ))}
                      </div>
                    }
                    <input ref = {nameRef} placeholder="Full Name" type="text" />
                    <input ref = {emailRef} placeholder="Email" type="email" />
                    <input ref = {passwordRef} placeholder="Password" type="password" />
                    <input ref = {passwordConRef} placeholder="Password Confirmation" type="password" />
                    

                    <button className="btn btn-block">Signup</button>

                    <p className="message">
                        Already Registered? <Link to="/login"> Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}