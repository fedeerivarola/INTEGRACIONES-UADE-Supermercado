import React, { useState, useEffect } from 'react'
import './Ventas.css'
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Payment from '../Payment/Payment';

const Ventas = () => {

    const [productos, setProductos] = useState([]);
    const [itemsTicket, setItemsTicket] = useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const [cantidadItem, setCantidadItem] = useState(1);
    const vendedor = { id: localStorage.getItem('userId'), name: localStorage.getItem('fullname') }
    const [step, setStep] = useState('0');
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        async function getProductos() {

            let h = new Headers();
            h.append('Accept', 'application/json');

            let response = await fetch('https://master-market.azurewebsites.net/api/Product/GetAll', {
                method: 'GET',
                mode: 'cors',
                headers: h,
                cache: 'default'
            });
            let data = await response.json();

            return data;
        }

        getProductos().then(
            (items) => {
                setProductos(items.productos);
            }
        )
    }, []);

    function renderList(e) {
        let id = null
        selectedItem ? id = selectedItem.id : id = null;
        if (e.id === id) {
            return (
                <ListItem className="row-list" key={e.id} button selected={true}>
                    <ListItemText className="columnName" key={`name-${e.id}`}
                        primary={e.name}
                        secondary={`Stock: ${e.stock}`}
                    />
                    <ListItemText className="columnPrecio" key={`price-${e.id}`}
                        primary={`$ ${e.unitPrice}`}
                    />
                </ListItem>
            )
        } else {
            return (
                <ListItem className="row-list" key={e.id} button
                    onClick={() => {
                        setSelectedItem(e)
                    }}>
                    <ListItemText className="columnName" key={`name-${e.id}`}
                        primary={e.name}
                        secondary={`Stock: ${e.stock}`}
                    />
                    <ListItemText className="columnPrecio" key={`price-${e.id}`}
                        primary={`$ ${e.unitPrice}`}
                    />
                </ListItem>
            )
        }
    }

    function renderItemsTicket(e) {
        console.log(e)
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText className="columnName" key={`name-${e.id}`}
                    primary={e.name}
                    secondary={`${e.unitPrice} X ${e.cantidad}`}
                />
                <ListItemText className="columnPrecio" key={`total-${e.id}`}
                    primary={`$ ${e.total}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => quitarItem(e)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    function getTotalTicket() {
        let items = itemsTicket
        let total = 0;

        if (items) {
            items.forEach(element => {
                total += parseFloat(element.total)
            });
            return total.toFixed(2);
        } else {
            return 0;
        }
    }

    function restarStock(it) {
        
    }

    function addItemToTicket() {
        /*id, name, unitPrice, cantidad, total */

        if (selectedItem) {
            if (selectedItem.stock > cantidadItem) {
                let newItemTicket = {
                    ...selectedItem,
                    cantidad: cantidadItem,
                    total: (parseFloat(selectedItem.unitPrice) * parseInt(cantidadItem))
                }

                delete newItemTicket.stock

                let newTicket;
                itemsTicket ? newTicket = [...itemsTicket] : newTicket = [];


                newTicket.push(newItemTicket);
                console.log(newTicket)
                restarStock(selectedItem);
                setItemsTicket(newTicket)
                setSelectedItem(selectedItem)
            } else {
                alert('No hay suficiente stock');
            }
        } else {
            alert('Selecciona un item')
        }

    }

    function quitarItem(e) {
        let updItems = [...itemsTicket]

        let i = updItems.indexOf(e);
        i !== -1 && updItems.splice(i, 1);


        setItemsTicket(updItems);
    }

    function vaciarTicket() {
        let updItems = []
        setItemsTicket(updItems)
    }

    function facturar() {
        let ticketvendedor = vendedor;
        let items = itemsTicket;
        let total = getTotalTicket();
        let timestamp = Date.now();

        if (items) {
            let ticket = {
                items: items,
                total: total,
                fecha: timestamp,
                vendedor: ticketvendedor
            }

            console.log(ticket)
            setTicket(ticket);
            setStep('1');
        } else {
            alert('Antes debes completar la factura');
        }
    }

    function finVenta() {
        setStep('2')
    }

    function iniciarProceso() {
        setSelectedItem(null)
        setTicket(null)
        setItemsTicket(null)
        setStep('0')
    }

    if (step === '0') {

        if (productos) {
            return (
                <div>
                    <div className="ventas">
                        <div>
                            <h2>Stock</h2>
                            <div className="list-productos">
                                <h3>Seleccione un producto</h3>
                                <div className="list-items">
                                    <List>
                                        {productos.map((e) => renderList(e))}
                                    </List>
                                </div>
                                <div className="bottom-list">
                                    <div className="quantity-container">
                                        <label>Cantidad: </label>
                                        <input className="inputCant" placeholder='1' onChange={(e) => setCantidadItem(e.target.value)} />
                                    </div>
                                    <Button className="addToTicket" variant="contained" color="secondary"
                                        onClick={() => { addItemToTicket() }}>Agregar a ticket</Button>
                                </div>
                            </div>
                        </div>
                        <div className="ticket-container">
                            <h2>Ticket de Venta</h2>
                            <div className="ticket">
                                <div className="list-items">
                                    <List key="items-ticket">
                                        {itemsTicket ? itemsTicket.map((e) => renderItemsTicket(e)) : null}
                                    </List>
                                </div>
                                <div className='bottom-ticket'>
                                    <div className="quantity-container">
                                        <label>Total: ${getTotalTicket()}</label>
                                    </div>
                                    <Button className="clean-ticket" variant="contained" color="secondary"
                                        onClick={() => vaciarTicket()}
                                    >Vaciar ticket</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="boton" variant="contained" color="primary"
                        onClick={facturar}>Siguiente</Button>
                </div>
            )
        } else {
            return (<div>Cargando</div>)
        }
    }

    if (step === '1') {
        return (
            <div>
                <Payment ticket={ticket} fin={() => finVenta()} />
            </div>
        )
    }

    if (step === '2') {

        return (
            <div>
                <div className="ventas">
                    <h1>Venta exitosa</h1>
                    <img alt="apu" src={"https://vignette.wikia.nocookie.net/lossimpson/images/7/7d/Apu_Nahasapeemapetilon.png/revision/latest/scale-to-width-down/318?cb=20111127113228&path-prefix=es"} />
                    <h2>Gracias vuelvas prontos</h2>
                </div>
                <Button variant="contained" color="secondary"
                    onClick={() => iniciarProceso()}>Nueva Venta</Button>
            </div>
        );
    }

}

export default Ventas;