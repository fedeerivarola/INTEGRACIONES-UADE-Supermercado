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
    const [newEmpleado, setNewEmpleado] = useState({
        id: '',
        firstName: '',
        lastName: '',
        identifier: '',
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

    function createEmpleado() {
        let updEmpleados = [...empleados]
        updEmpleados.push(newEmpleado)
        setEmpleados(updEmpleados)
        setOpenModal(false)
    }

    function deleteEmpleado(e) {

        let updEmpleados = [...empleados]

        let i = updEmpleados.indexOf(e);
        i !== -1 && updEmpleados.splice(i, 1);

        setEmpleados(updEmpleados);

    }

    function handleInput(e) {

        let newEmp = { ...newEmpleado }

        if (e.target.id === 'legajo') {
            newEmp.id = e.target.value;
        } else if (e.target.id === 'nombre') {
            newEmp.firstName = e.target.value;
        } else if (e.target.id === 'lastName') {
            newEmp.lastName = e.target.value;
        } else if (e.target.id === 'identifier') {
            newEmp.identifier = e.target.value;
        } else if (e.target.id === 'userName') {
            newEmp.userName = e.target.value;
        } else if (e.target.id === 'password') {
            newEmp.password = e.target.value;
        } else if (e.target.id === 'isAdmin') {
            newEmp.isAdmin = e.target.value;
        }

        setNewEmpleado(newEmp);
    }

    function formCreateEmpleado() {
        return (
            <div className="formNewEmp">
                <h2>Registrar nuevo empleado</h2>
                <p>Legajo</p>
                <input id='legajo' onChange={(e) => handleInput(e)} />
                <p>Nombre</p>
                <input id='nombre' onChange={(e) => handleInput(e)} />
                <p>Apellido</p>
                <input id='lastName' onChange={(e) => handleInput(e)} />
                <p>identifier</p>
                <input id='identifier' onChange={(e) => handleInput(e)} />
                <p>userName</p>
                <input id='userName' onChange={(e) => handleInput(e)} />
                <p>password</p>
                <input id='password' onChange={(e) => handleInput(e)} />
                <p>Es admin? todo: poner checkbox</p>
                <input id='isAdmin' style={{ marginBottom: "20px" }} onChange={(e) => handleInput(e)} />

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