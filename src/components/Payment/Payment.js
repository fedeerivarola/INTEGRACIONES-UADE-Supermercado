import React, { useState, useEffect } from 'react'
import './Payment.css'
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Fade, Modal, Backdrop, MenuItem, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Payment = (props) => {

    console.log(props.ticket);

    const [ticket, setTicket] = useState(props.ticket);
    const [items, setItems] = useState(ticket.items);
    const [paymentMethods, setPaymentMethods] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(1);


    function renderItemsTicket(e) {
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.name}
                    secondary={`${e.unitPrice} X ${e.cantidad}`}
                />
                <ListItemText key={`total-${e.id}`}
                    primary={`$ ${e.total}`}
                />
            </ListItem>
        )
    }


    function renderPaymentMethods(e) {
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.tipo}
                    secondary={`${e.banco}`}
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

    function renderFormPayment() {

        if (selectedMethod === 1) {

            return (
                <div>
                    <p>Completar tarjeta</p>
                    <label>DNI Cliente</label>
                    <input id="dni" /> <br />
                    <label>Numero Tarjeta</label>
                    <input id="tarjeta" /><br />
                    <label>Monto</label>
                    <input id="monto" /><br />
                    <Button>Aceptar</Button>
                </div>
            )

        }

        if (selectedMethod === 0) {
            return (
                <div>
                    <p>Completar efectivo</p>
                    <Button>Aceptar</Button>
                </div>
            )
        }
    }

    return (
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
                        {selectedMethod ? renderFormPayment() : null}
                    </div>
                </Fade>
            </Modal>

        </div>
    );

}

export default Payment;