import React, { useState, use } from 'react'
import './Ventas.css'
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

const Ventas = () => {

    const [productos, setProductos] = useState([
        { id: '001', nombre: 'Birra', precio: '$10' }, { id: '002', nombre: 'Papita', precio: '$20' }, { id: '003', nombre: 'Falopa', precio: '$50' }
    ])
    const [dense, setDense] = React.useState(false);

    function renderList(e) {

        return (
            <ListItem key={e.id}>
                <ListItemText
                    primary={e.nombre}
                    secondary={e.precio}
                />
                <p>Cantidad: 0</p>
                <button>+</button>
                <button>-</button>
            </ListItem>
        )
    }

    return (
        <div className="ventas">
            <h1 style={{ color: "black" }}>Venta</h1>
            <div className="list-productos">
                <List dense={dense}>
                    {productos.map((e) => renderList(e))}
                </List>
            </div>
            <Button className="boton" variant="contained" color="secondary">Siguiente</Button>
        </div>
    )

}

export default Ventas;