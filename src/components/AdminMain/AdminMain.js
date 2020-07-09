import React from 'react'
import './AdminMain.css'
import AdminLogin from '../AdminLogin/AdminLogin'
import EmpleadoABM from '../EmpleadoABM/EmpleadoABM'


class AdminMain extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            auth: ''
        }
    }

    login(e) {
        this.setState({ auth: 'ok' })
        console.log(this.state.auth)

    }

    render() {

        if (this.state.auth === '') {
            return (
                <div className="AdminLogin">
                    <AdminLogin login={(e) => this.login(e)} />
                </div>
            )
        } else {
            return (
                <div className="Empleados">
                    <p styles={{ color: "black" }}>Menu Admin</p>
                    <EmpleadoABM />
                </div>
            )
        }
    }
}

export default AdminMain;