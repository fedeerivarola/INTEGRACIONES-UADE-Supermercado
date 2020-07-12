import React, { useState, use } from 'react'
import './Ventas.css'
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

const Ventas = () => {

    const [productos, setProductos] = useState([
        { id: '001', nombre: 'Birra', precio: '$10', stock: '10' },
        { id: '002', nombre: 'Papita', precio: '$20', stock: '10' },
        { id: '003', nombre: 'Chisito', precio: '$20', stock: '10' },
        { id: '004', nombre: 'Iphone 11', precio: '$20', stock: '1' },
        { id: '006', nombre: 'Manzana', precio: '$20', stock: '100' },
        { id: '007', nombre: 'Malboro Box', precio: '$20', stock: '4' },
        { id: '008', nombre: 'Falopa', precio: '$50', stock: '0' }
    ])
    const [itemsTicket, setItemsTicket] = useState([])
    const [dense, setDense] = React.useState(false);

    function renderList(e) {

        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.nombre}
                    secondary={`Stock: ${e.stock}`}
                />
                <ListItemText key={`price-${e.id}`}
                    primary={e.precio}
                />
            </ListItem>
        )
    }

    function renderItemsTicket(e) {

        return (
            <ListItem className="row-list" key={e.id}>
                <ListItemText key={`name-${e.id}`}
                    primary={e.nombre}
                    secondary={`${e.precio} X ${e.cantidad}`}
                />
                <ListItemText key={`total-${e.id}`}
                    primary={e.precio * e.cantidad}
                />
            </ListItem>
        )
    }

    function getTotalTicket() {
        let items = itemsTicket
        let total = 0;

        if (items.length > 0) {
            items.forEach(element => {
                total += parseFloat(element.precio)
            });
            return total;
        } else {
            return 0;
        }
    }

    return (
        <div>
            <div className="ventas">
                <div>
                    <h2>Stock</h2>
                    <div className="list-productos">
                        <div className="item-producto">
                            <List dense={dense}>
                                {productos.map((e) => renderList(e))}
                            </List>
                        </div>
                        <div className='bottom-list'>
                            <label>Cantidad: </label>
                            <input  className="inputCant" placeholder='1' />
                            <Button className="addToTicket" variant="contained" color="secondary">Agregar a ticket</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Ticket de Venta</h2>
                    <div className="ticket">
                        <div className="list-ticket">
                            <List key="items-ticket" dense={dense}>
                                {itemsTicket.map((e) => renderItemsTicket(e))}
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