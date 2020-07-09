import React, { useState } from 'react'
import './EmpleadoABM.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal, Fade, Backdrop, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';


const EmpleadoABM = (props) => {

    //este array va a venir por props
    let emptest = [
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

    const admin = props.admin;
    const [empleados, setEmpleados] = useState(emptest);
    const [openModal, setOpenModal] = useState(false);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    function renderList(e) {

        return (
            <ListItem key={e.legajo} button onClick={() => setOpenModal(true)}>
                <ListItemAvatar className="w-24">
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary={e.nombre}
                    secondary={e.sector}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteEmpleado(e)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    function deleteEmpleado(e) {

        console.log(e)

        let updEmpleados = empleados

        let i = updEmpleados.indexOf(e);
        i !== -1 && updEmpleados.splice(i, 1);

        setEmpleados(updEmpleados);

    }

    return (
        <div className="menu-empleados">
            <div className="botonera-empleados">
                <button>Agregar Empleado</button>
                <button>Borrar Empleado</button>
                <button>Modificar Empleado</button>
            </div>
            <div className="list-empleados">
                <List dense={dense}>
                    {empleados.map((e) => renderList(e))}
                </List>
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
                        <p>View profile empleado</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    )

}
export default EmpleadoABM;