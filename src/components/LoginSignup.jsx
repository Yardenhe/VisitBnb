import React, { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { ReserveBtn } from './UI/ReserveBtn'
import { login, signup } from '../store/actions/user.actions'

export function LoginSignup({ payload }) {
    const { isLogin } = payload
    const [userLoginForm, setUserLoginForm] = useState({})
    const [credentials, setCredentials] = useState({})
    const [isLoginForm, setisLoginForm] = useState(isLogin)

    useEffect(() => {
        const formFields = isLoginForm ? userService.getLoginForm() : userService.getSignupForm()
        setUserLoginForm(formFields)
        // setCredentials({})
    }, [isLoginForm])


    const handleChange = (fieldName, value) => {
        setCredentials((prevData) => ({ ...prevData, [fieldName]: value }))
    }

    async function onLoginSignup() {
        console.log("🚀 ~ onLoginSignup ~ credentials:", credentials)
        // signup flow
        if (!isLoginForm) {
            if (!credentials.email || !credentials.password || !credentials.fullname) return
            console.log('signup');
            await signup(credentials)
        } 
        // login flow
        else {
            if (!credentials.email || !credentials.password) return
            console.log('login');
            await login(credentials)
        }
        clearState()
    }
    function clearState() {
        setCredentials(userService.getEmptyUser())
    }


    return (
        <div className='login-signup'>
            <h3>{isLoginForm ? 'Login' : 'Signup'}</h3>
            {Object.entries(userLoginForm).map(([fieldName, label]) => (
                <div key={fieldName} className={`form-field`}>
                    {/* ${fieldName.includes('Name') ? 'joined' : ''}`}> */}
                    <input
                        type={fieldName === 'password' ? 'password' : 'text'}
                        // value={fieldName === 'password' ? 'password':userLoginForm[fieldName] || ''}
                        // value={credentials[fieldName] ? credentials[fieldName] : userLoginForm[fieldName]} // bad behaviour
                        placeholder={userLoginForm[fieldName]}
                        onChange={(e) => handleChange(fieldName, e.target.value)}
                    />
                </div>
            ))}
            <div className="login-signup-btn-container">

                <ReserveBtn text={isLoginForm ? 'Login' : 'Signup'} cb={onLoginSignup} />
                <div onClick={() => { setisLoginForm(prev => !prev) }} className="underline clickable">{isLoginForm ? 'SignUp instead' : 'I already have an account'}</div>
            </div>

        </div>
    )
}
