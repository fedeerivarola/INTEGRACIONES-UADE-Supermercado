import React, { useState } from 'react'
import './Ventas.css'
import { Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const Ventas = () => {

    const [productos, setProductos] = useState([
        { id: '001', nombre: 'Birra', precio: '10', stock: '10' },
        { id: '002', nombre: 'Papita', precio: '20', stock: '10' },
        { id: '003', nombre: 'Chisito', precio: '20', stock: '10' },
        { id: '004', nombre: 'Iphone 11', precio: '20', stock: '1' },
        { id: '006', nombre: 'Manzana', precio: '20', stock: '100' },
        { id: '007', nombre: 'Malboro Box', precio: '20', stock: '4' },
        { id: '008', nombre: 'Falopa', precio: '50', stock: '0' }
    ]);
    const [itemsTicket, setItemsTicket] = React.useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const [cantidadItem, setCantidadItem] = useState(1);

    function renderList(e) {
        let id = null
        selectedItem ? id = selectedItem.id : id = null;
        if (e.id === id) {
            return (
                <ListItem className="row-list" key={e.id} button selected={true}>
                    <ListItemText key={`name-${e.id}`}
                        primary={e.nombre}
                        secondary={`Stock: ${e.stock}`}
                    />
                    <ListItemText key={`price-${e.id}`}
                        primary={`$ ${e.precio}`}
                    />
                </ListItem>
            )
        } else {
            return (
                <ListItem className="row-list" key={e.id} button
                    onClick={() => {
                        setSelectedItem(e)
                    }}>
                    <ListItemText key={`name-${e.id}`}
                        primary={e.nombre}
                        secondary={`Stock: ${e.stock}`}
                    />
                    <ListItemText key={`price-${e.id}`}
                        primary={`$ ${e.precio}`}
                    />
                </ListItem>
            )
        }
    }

    function renderItemsTicket(e) {
        console.log(e)
        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.nombre}
                    secondary={`${e.precio} X ${e.cantidad}`}
                />
                <ListItemText key={`total-${e.id}`}
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
                total += parseFloat(element.precio)
            });
            return total;
        } else {
            return 0;
        }
    }

    function addItemToTicket() {
        /*id, nombre, precio, cantidad, total */

        if (selectedItem) {
            let newItemTicket = {
                ...selectedItem,
                cantidad: cantidadItem,
                total: (parseFloat(selectedItem.precio) * parseInt(cantidadItem))
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

    return (
        <div>
            <div className="ventas">
                <div>
                    <h2>Stock</h2>
                    <div className="list-productos">
                        <div className="item-producto">
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
                        <div className="list-ticket">
                            <List key="items-ticket">
                                {itemsTicket ? itemsTicket.map((e) => renderItemsTicket(e)) : null}
                            </List>
                        </div>
                        <div className='bottom-ticket'>
                            <label>Total: ${getTotalTicket()}</label>
                            <Button className="clean-ticket" variant="contained" color="secondary">Vaciar ticket</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button className="boton" variant="contained" color="secondary">Siguiente</Button>
        </div>
    )

}

export default Ventas;