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
    const vendedor = 'admin'
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

            console.log(data)

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
            return total;
        } else {
            return 0;
        }
    }

    function addItemToTicket() {
        /*id, name, unitPrice, cantidad, total */

        if (selectedItem) {
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
            setItemsTicket(newTicket)
            setSelectedItem(selectedItem)
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

    if (step === '0') {

        if (productos) {
            return (
                <div>
                    <div className="ventas">
                        <div>
                            <h2>Stock</h2>
                            <div className="list-productos">
                                <div className="list-items">
                                    <List>
                                        {productos.map((e) => renderList(e))}
                                    </List>
                                </div>
                                <div className='bottom-list'>
                                    <label>Cantidad: </label>
                                    <input className="inputCant" placeholder='1' onChange={(e) => setCantidadItem(e.target.value)} />
                                    <Button className="addToTicket" variant="contained" color="secondary"
                                        onClick={() => { addItemToTicket() }}
                                    >Agregar a ticket</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Ticket de Venta</h2>
                            <div className="ticket">
                                <div className="list-items">
                                    <List key="items-ticket">
                                        {itemsTicket ? itemsTicket.map((e) => renderItemsTicket(e)) : null}
                                    </List>
                                </div>
                                <div className='bottom-ticket'>
                                    <label>Total: ${getTotalTicket()}</label>
                                    <Button className="clean-ticket" variant="contained" color="secondary"
                                        onClick={() => vaciarTicket()}
                                    >Vaciar ticket</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="boton" variant="contained" color="secondary"
                        onClick={facturar}
                    >Siguiente</Button>
                </div>
            )
        } else {
            return (<div>Cargando</div>)
        }
    }

    if (step === '1') {
        return (
            <div>
                <Payment ticket={ticket} />
            </div>
        )
    }

}

export default Ventas;