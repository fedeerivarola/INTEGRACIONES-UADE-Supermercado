import React, { useState } from 'react'
import './AdminLogin.css'


const AdminLogin = (props) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        console.log(`user: ${user}`)
        console.log(`pass: ${password}`)
        props.login('ok')
    }

    function handleUser(e) {
        setUser(e.target.value)

    }

    function handlePass(e) {
        setPassword(e.target.value)
    }

    return (
        <div className="AdminLogin">
            <form>
                <h3>Usuario</h3>
                <input onChange={(e) => handleUser(e)} />
                <h3>Password</h3>
                <input type="password" onChange={(e) => handlePass(e)} />
            </form>
            <button style={{marginTop: "20px"}} onClick={() => handleLogin()}>INGRESAR</button>
        </div>
    )
}

export default AdminLogin;