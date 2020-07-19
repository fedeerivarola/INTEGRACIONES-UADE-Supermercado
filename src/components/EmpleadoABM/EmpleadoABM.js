import React, { useState, useEffect } from 'react'
import './EmpleadoABM.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal, Fade, Backdrop, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';


const EmpleadoABM = () => {

    //const admin = props.admin;
    const [empleados, setEmpleados] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [newEmpleado, setNewEmpleado] = useState({
        identifier: null,
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        isAdmin: false
    });

    //{"id":1,"firstName":"Gaston","lastName":"Larriera","identifier":35253231,"userName":"admin","password":"1234","isAdmin":true}

    useEffect(() => {
        async function getEmployees() {

            let h = new Headers();
            h.append('Accept', 'application/json');

            let response = await fetch('https://master-market.azurewebsites.net/api/Employee/GetAll', {
                method: 'GET',
                mode: 'cors',
                headers: h,
                cache: 'default'
            });
            let data = await response.json();

            return data;
        }

        getEmployees().then(
            (data) => {
                setEmpleados(data.employees);
            }
        )
    }, []);

    async function createEmployeeService() {

        let h = new Headers()
        h.append('Content-Type', 'application/json');

        console.log(newEmpleado)

        let response = await fetch('https://master-market.azurewebsites.net/api/Employee/SaveEmployee', {
            method: 'POST',
            mode: 'cors',
            headers: h,
            body: JSON.stringify(newEmpleado)
        });
        let json = await response.json();

        return json;
    }

    function createEmpleado() {
        let updEmpleados = [...empleados]

        createEmployeeService().then(
            (response) => {
                if (response.success) {
                    updEmpleados.push(newEmpleado)
                    setEmpleados(updEmpleados)
                    setOpenModal(false)
                    alert(response.msg);
                } else {
                    setErrMsg(response.msg);
                }
            });
    }

    function deleteEmpleado(e) {

        let updEmpleados = [...empleados]

        let i = updEmpleados.indexOf(e);
        i !== -1 && updEmpleados.splice(i, 1);

        setEmpleados(updEmpleados);

    }

    function handleInput(e) {

        let newEmp = { ...newEmpleado }

        if (e.target.id === 'identifier') {
            newEmp.identifier = parseInt(e.target.value);
        } else if (e.target.id === 'nombre') {
            newEmp.firstName = e.target.value;
        } else if (e.target.id === 'lastName') {
            newEmp.lastName = e.target.value;
        } else if (e.target.id === 'userName') {
            newEmp.userName = e.target.value;
        } else if (e.target.id === 'password') {
            newEmp.password = e.target.value;
        } else if (e.target.id === 'isAdmin') {
            newEmp.isAdmin = (e.target.value === 'si' ? true : false);
        }

        setNewEmpleado(newEmp);
    }

    function formCreateEmpleado() {
        return (
            <div className="formNewEmp">
                <h2>Registrar nuevo empleado</h2>
                <label>Legajo: </label>
                <input id='identifier' type="number" onChange={(e) => handleInput(e)} />
                <label>Nombre:</label>
                <input id='nombre' onChange={(e) => handleInput(e)} />
                <label>Apellido:</label>
                <input id='lastName' onChange={(e) => handleInput(e)} />
                <label>Usuario:</label>
                <input id='userName' onChange={(e) => handleInput(e)} />
                <label>Password: </label>
                <input id='password' type="password" onChange={(e) => handleInput(e)} />
                <label>Usuario administrador</label>
                <input id='isAdmin' type="checkbox" value={'si'} style={{ marginBottom: "20px" }} onChange={(e) => handleInput(e)} />
                {errMsg && <span style={{ color: "red" }}>{errMsg}</span>}
                <Button variant="contained" color="primary" onClick={() => createEmpleado()}>GUARDAR</Button>
            </div>
        )
    }

    function viewProfile() {

        return (
            <div>
                <h2>View profile empleado</h2>
                <h4>Legajo: </h4>
                <p>{selectedEmp.id}</p>
                <h4>Nombre: </h4>
                <p>{selectedEmp.firstName + ' ' + selectedEmp.lastName}</p>
                <h4>Documento: </h4>
                <p>{selectedEmp.identifier}</p>
                <h4>usuario: </h4>
                <p>{selectedEmp.userName}</p>
                <h4>Es admin: </h4>
                <p>{selectedEmp.isAdmin}</p>
            </div>
        )
    }

    function renderList(e) {

        return (
            <ListItem key={e.id} button
                onClick={() => {
                    console.log(e)
                    setOpenModal(true);
                    setSelectedEmp(e);
                }}>
                <ListItemAvatar className="w-24">
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={e.lastName}
                    secondary={e.firstName}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteEmpleado(e)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <div className="menu-empleados">

            <h2>Lista de Empleados</h2>
            <div className="list-empleados">
                <List>
                    {empleados.map((e) => renderList(e))}
                </List>
            </div>

            <div className="botonera-empleados">
                <Button variant="contained" color="primary"
                    onClick={() => {
                        setSelectedEmp(null)
                        setOpenModal(true)
                    }}
                >Agregar Empleado</Button>
            </div>

            <Modal className="modal"
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className="profile-empleado">
                        {selectedEmp ? viewProfile() : formCreateEmpleado()}
                    </div>
                </Fade>
            </Modal>
        </div >
    )

}
export default EmpleadoABM;