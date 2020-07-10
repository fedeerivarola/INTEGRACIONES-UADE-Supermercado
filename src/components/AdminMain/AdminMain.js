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

        //este array va a venir por props
        let empleados = [
            {
                legajo: '001',
                nombre: 'Pepe',
                sector: 'Ventas'
            }, {
                legajo: '002',
                nombre: 'Marco',
                sector: 'Encargado'
            }, {
                legajo: '003',
                nombre: 'Pepe2',
                sector: 'Ventas'
            }, {
                legajo: '004',
                nombre: 'Pepe3',
                sector: 'RRHH'
            }, {
                legajo: '005',
                nombre: 'Alberto',
                sector: 'Sistemas'
            }, {
                legajo: '006',
                nombre: 'Fernando',
                sector: 'Sistemas'
            }, {
                legajo: '007',
                nombre: 'Milei',
                sector: 'Finanzas'
            }]

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
                    <EmpleadoABM empleados={empleados} />
                </div>
            )
        }
    }
}

export default AdminMain;