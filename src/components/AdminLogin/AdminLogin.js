import React, { useState } from 'react'
import './AdminLogin.css'
import { Button } from '@material-ui/core'


const AdminLogin = (props) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState(null)

    function handleLogin() {

        async function doLogin() {

            let data = {
                userName: user,
                password: password
            }
            let h = new Headers()
            h.append('Content-Type', 'application/json');

            let response = await fetch('https://master-market.azurewebsites.net/api/Employee/Login', {
                method: 'POST',

                mode: 'cors',
                headers: h,
                body: JSON.stringify(data)
            });
            let json = await response.json();
            //return response
            // console.log(json)

            return json;
        }

        doLogin().then(
            (response) => {
                if (response.success) {
                    props.login(response.data);
                } else {
                    setErrMsg(response.data);
                }
            }
        )
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
            {errMsg && <span style={{ color: "white" }}>{errMsg}</span>}
            <Button style={{ width: "100px", marginTop: "20px" }} variant="contained"
                color="primary"
                onClick={() => handleLogin()}
            >INGRESAR</Button>
        </div>
    )
}

export default AdminLogin;