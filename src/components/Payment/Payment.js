import React, { useState } from 'react'
import './Payment.css'
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Fade, Modal, Backdrop, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Payment = (props) => {

    console.log(props.ticket);

    const [ticket] = useState(props.ticket);
    const [items] = useState(ticket.items);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalCash, setOpenModalCash] = useState(false);
    const [openModalCard, setOpenModalCard] = useState(false);
    const [openModalCardDebit, setOpenModalCardDebit] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState({ paymentMethod: '', dni: '', tarjeta: null, monto: '' });
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

    // function handleChange(event) {
    //     let value = event.target.value;
    //     console.log(value)
    //     setSelectedMethod(value)
    // };

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
                setOpenModalCard(false);
                setOpenModalCardDebit(false);
                setOpenModalCash(false);
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

    function createRequestBody() {
        let details = [];
        items.forEach(it => {
            details.push({ Product: { SKU: it.sku }, Quantity: it.cantidad })
        });

        // Sample {
        //     "Employee": {
        //         "Id": 1
        //     },
        //     "PaymentMethod": 1,
        //         "Details":
        //     [
        //         {
        //             "Product": {
        //                 "SKU": "123ABC456DEF"
        //             },
        //             "Quantity": 30
        //         },
        //         {
        //             "Product": {
        //                 "SKU": "ABC123DEF456"
        //             },
        //             "Quantity": 3
        //         }
        //     ]

        // }

        let body = {
            Employee: { id: parseInt(localStorage.getItem('userId'))},
            PaymentMethod: selectedMethod,
            Details: details
        }
        console.log(body);
        return body;

    }

    async function saveSaleService() {

        let h = new Headers()
        h.append('Content-Type', 'application/json');

        let req = createRequestBody();

        console.log(req);

        let response = await fetch('https://master-market.azurewebsites.net/api/Sale/SaveSale', {
            method: 'POST',
            mode: 'cors',
            headers: h,
            body: JSON.stringify(req)
        });
        let json = await response.json();

        return json;

    }

    function finalizarVenta() {
        //TODO consumir servicio
        saveSaleService().then(
            (response) => {
                console.log(response)
                if (response.success) {
                    props.fin();
                } else {
                    console.log('err')
                }
            }
        )

    }

    function renderPaymentMethods(e) {
        return (
            <ListItem className="row-list" key={e.id}>
                {e.tarjeta ?
                    <ListItemText key={`name-${e.tarjeta}`} primary={e.dni} secondary={`${e.tarjeta}`} />
                    : <ListItemText key={`efectivo-${e.monto}`} primary={"Efectivo"} />}
                <ListItemText key={`total-${e.monto}`}
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

    function renderFormPaymentCash() {
        return (
            <div>
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
                    <h4>{`Vendedor: ${ticket.vendedor.name}`}</h4>
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
                            <p>Método de Pago</p>
                            <Box m={2} pt={3}>
                                <Button variant="contained" color="secondary"
                                    onClick={() => { setOpenModalCash(true); setOpenModal(false); setSelectedMethod(1);}}
                                >Pago contado</Button></Box>
                            <Box m={2} pt={3}>
                                <Button variant="contained" color="secondary"
                                    onClick={() => { setOpenModalCard(true); setOpenModal(false); setSelectedMethod(3);}}
                                >Pago tarjeta de crédito</Button></Box>
                            <Box m={2} pt={3}>
                                <Button variant="contained" color="secondary"
                                    onClick={() => { setOpenModalCardDebit(true); setOpenModal(false); setSelectedMethod(2);}}
                                >Pago tarjeta de débito</Button></Box>
                        </div>
                    </Fade>
                </Modal>

                <Modal className="modal"
                    open={openModalCard}
                    onClose={() => setOpenModalCard(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalCard}>
                        <div className="select-payment">
                            <p>Pago tarjeta de crédito</p>
                            {renderFormPayment()}
                        </div>
                    </Fade>
                </Modal>

                <Modal className="modal"
                    open={openModalCardDebit}
                    onClose={() => setOpenModalCardDebit(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalCardDebit}>
                        <div className="select-payment">
                            <p>Pago tarjeta de débito</p>
                            {renderFormPayment()}
                        </div>
                    </Fade>
                </Modal>

                <Modal className="modal"
                    open={openModalCash}
                    onClose={() => setOpenModalCash(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalCash}>
                        <div className="select-payment">
                            <p>Pago contado</p>
                            {renderFormPaymentCash()}
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