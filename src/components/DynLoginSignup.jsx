import React, { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { ReserveBtn } from './UI/ReserveBtn'

export function LoginSignup({ payload }) {
    const { isLogin } = payload
    const [userLoginForm, setUserLoginForm] = useState({})
    const [userData, setUserData] = useState({})
    const [isLoginForm, setisLoginForm] = useState(isLogin)

    useEffect(() => {
        const formFields = isLoginForm ? userService.getLoginForm() : userService.getSignupForm()
        setUserLoginForm(formFields)
        setUserData({})
    }, [isLoginForm])

    const handleChange = (fieldName, value) => {
        setUserData((prevData) => ({ ...prevData, [fieldName]: value }))
    }

    async function onLoginSignup() {
        const LoggedInUser = await userService.login(userData)
        return
    }

    return (
        <div className='login-signup'>
            <h3>{isLoginForm ? 'Login' : 'Signup'}</h3>
            {Object.entries(userLoginForm).map(([fieldName, label]) => (
                <div key={fieldName} className={`form-field ${fieldName.includes('Name') ? 'joined' : ''}`}>
                    <input
                        type={fieldName === 'password' ? 'password' : 'text'}
                        // value={fieldName === 'password' ? 'password':userLoginForm[fieldName] || ''}
                        placeholder={userLoginForm[fieldName]}
                        onChange={(e) => handleChange(fieldName, e.target.value)}
                    />
                </div>
            ))}
            <ReserveBtn text={isLoginForm ? 'Login' : 'Signup'} cb={onLoginSignup} />
            <div onClick={() => { setisLoginForm(prev => !prev) }} className="underline clickable">{isLoginForm ? 'SignUp instead' : 'I already have an account'}</div>

        </div>
    )
}
