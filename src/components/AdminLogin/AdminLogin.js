import React, { useState } from 'react'
import './AdminLogin.css'


const AdminLogin = (props) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {

        async function doLogin() {

            let data = {
                userName: user,
                password: password
            }

            let response = await fetch('https://master-market.azurewebsites.net/api/Employee/Login', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            });
            let json = await response.json();

            console.log(json)

            return json;
        }

        doLogin().then(
            (response) => {
                console.log(response);
            }
        )

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
            <form className="form-login">
                <h3 className="txt-login">Usuario</h3>
                <input onChange={(e) => handleUser(e)} />
                <h3 className="txt-login">Password</h3>
                <input type="password" onChange={(e) => handlePass(e)} />
            </form>
            <button style={{width: "100px", marginTop: "20px" }} onClick={() => handleLogin()}>INGRESAR</button>
        </div>
    )
}

export default AdminLogin;