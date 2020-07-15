import React, { useState, useEffect } from 'react'
import './Payment.css'
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Fade, Modal, Backdrop, MenuItem, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Payment = (props) => {

    console.log(props.ticket);

    const [ticket, setTicket] = useState(props.ticket);
    const [items, setItems] = useState(ticket.items);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(1);
    const [newPaymentMethod, setNewPaymentMethod] = useState({ paymentMethod: '', dni: '', tarjeta: '', monto: '' });
    //const [habilitarFin, setHabilitarFin] = useState(true);
    let habilitarFin = true;

    function getFecha() {
        let fechaTicket = new Date(ticket.fecha);
        return (`${fechaTicket.getDate()}/${fechaTicket.getMonth()}/${fechaTicket.getFullYear()}`);
    }

    function quitarItem(e) {
        let updItems = [...paymentMethods]

        let i = updItems.indexOf(e);
        i !== -1 && updItems.splice(i, 1);

        setPaymentMethods(updItems);
    }

    function handleChange(event) {
        let value = event.target.value;
        console.log(value)
        setSelectedMethod(value)
    };

    function handleInput(e) {

        let newPM = { ...newPaymentMethod }

        if (e.target.id === 'dni') {
            newPM.dni = e.target.value;
        } else if (e.target.id === 'tarjeta') {
            newPM.tarjeta = e.target.value;
        } else if (e.target.id === 'monto') {
            newPM.monto = e.target.value;
        }

        newPM.paymentMethod = selectedMethod;

        setNewPaymentMethod(newPM);
    }

    function savePaymentMethods() {
        console.log(paymentMethods);
        let upd = [...paymentMethods];

        if (newPaymentMethod) {
            if (newPaymentMethod.monto === '') {
                alert('Debe ingresar un monto')
            } else if (parseFloat(newPaymentMethod.monto) <= 0) {
                alert('Ingrese un monto valido')
            } else {
                upd.push(newPaymentMethod);
                setPaymentMethods(upd);
                setNewPaymentMethod({ paymentMethod: '', dni: '', tarjeta: '', monto: '' })
                setOpenModal(false);
            }
        }

    }

    function getTotal() {
        let payment = paymentMethods;
        let total = 0;

        if (payment) {
            payment.forEach(element => {
                total += parseFloat(element.monto)
            });
            return total;
        } else {
            return 0;
        }
    }

    function getVuelto() {
        let total = getTotal();
        let vuelto = parseFloat(total) - parseFloat(ticket.total);

        if (vuelto > 0 || vuelto === 0) {
            //setHabilitarFin(false)
            habilitarFin = false;
        } else {
            if (!habilitarFin) {
                //setHabilitarFin(true)
                habilitarFin = true;
            }
        }

        return vuelto;
    }

    function finalizarVenta() {
        console.log('enviar a backend')
        //TODO consumir servicio
        props.fin();

    }

    function renderPaymentMethods(e) {
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.dni}
                    secondary={`${e.tarjeta}`}
                />
                <ListItemText key={`total-${e.id}`}
                    primary={`$ ${e.monto}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => quitarItem(e)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    function renderItemsTicket(e) {
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText className="columnName" key={`name-${e.id}`}
                    primary={e.name}
                    secondary={`${e.unitPrice} X ${e.cantidad}`}
                />
                <ListItemText className="columnPrecio" key={`total-${e.id}`}
                    primary={`$ ${e.total}`}
                />
            </ListItem>
        )
    }

    function renderFormPayment() {
        return (
            <div>
                <p>Completar tarjeta</p>
                <label>DNI Cliente</label>
                <input id='dni' onChange={(e) => handleInput(e)} /> <br />
                <label>Numero Tarjeta</label>
                <input id='tarjeta' onChange={(e) => handleInput(e)} /><br />
                <label>Monto</label>
                <input id='monto' onChange={(e) => handleInput(e)} /><br />
                <Button
                    variant="contained" color="secondary"
                    onClick={() => savePaymentMethods()}
                >Aceptar</Button>
            </div>
        )


    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="Payment">

                <div className="ticket-payment">
                    <h4>{`Vendedor: ${ticket.vendedor}`}</h4>
                    <h4>{`Fecha: ${getFecha()}`}</h4>
                    <div className="list-items">
                        <List key="items-ticket">
                            {items ? items.map((e) => renderItemsTicket(e)) : null}
                        </List>
                    </div>
                    <h4>{`Total: ${ticket.total}`}</h4>
                </div>

                <div className="pagos">
                    <div className="list-items">
                        <List key="payment-methods">
                            {paymentMethods ? paymentMethods.map((e) => renderPaymentMethods(e)) : null}
                        </List>
                    </div>
                    <div className="detail-payment">

                        <label>Total: ${getTotal()}</label>
                        {getVuelto() > 0 ? <label>Vuelto: ${getVuelto()}</label> : <label>Debe: ${getVuelto() * (-1)}</label>}
                    </div>
                    <Button variant="contained" color="secondary"
                        onClick={() => setOpenModal(true)}
                    >Agregar pago</Button>
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
                        <div className="select-payment">
                            <p>Metodo de Pago</p>
                            {renderFormPayment()}
                        </div>
                    </Fade>
                </Modal>

            </div>
            <div>
                <Button className="btnFinalizar" variant="contained"
                    color="secondary" disabled={habilitarFin}
                    onClick={() => finalizarVenta()}
                >Finalizar</Button>
            </div>
        </div>
    );

}

export default Payment;