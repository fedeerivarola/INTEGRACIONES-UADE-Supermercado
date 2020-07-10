import React, { useState } from 'react'
import './ProductoABM.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal, Fade, Backdrop, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';


const ProductoABM = (props) => {

    //const admin = props.admin;

    const [productos, setProductos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [dense, setDense] = React.useState(false);
    const [selectedProd, setSelectedProd] = useState(null);
    const [newProducto, setNewProducto] = useState({ codigo: '', nombre: '', cantidad: '', precio: '' });


    function createProducto() {
        let updProductos = productos
        updProductos.push(newProducto)
        setProductos(updProductos)
        setOpenModal(false)
    }

    function deleteProducto(e) {

        let updProductos = productos

        let i = updProductos.indexOf(e);
        i !== -1 && updProductos.splice(i, 1);

        setProductos(updProductos);

    }

    function handleInput(e) {

        let newProd = newProducto

        if (e.target.id === 'codigo') {
            newProd.codigo = e.target.value;
        } else if (e.target.id === 'nombre') {
            newProd.nombre = e.target.value;
        } else if (e.target.id === 'cantidad') {
            newProd.cantidad = e.target.value;
        } else if (e.target.id === 'precio') {
            newProd.precio = e.target.value;
        }

        setNewProducto(newProd);
    }

    function formCreateProducto() {
        return (
            <div className="formNewProd">
                <h2>Registrar nuevo producto</h2>
                <p>Código</p>
                <input id='codigo' onChange={(e) => handleInput(e)} />
                <p>Nombre</p>
                <input id='nombre' onChange={(e) => handleInput(e)} />
                <p>Cantidad</p>
                <input id='cantidad' onChange={(e) => handleInput(e)} />
                <p>Precio</p>
                <input id='precio' style={{ marginBottom: "20px" }} onChange={(e) => handleInput(e)} />

                <Button variant="contained" color="primary" onClick={() => createProducto()}>REGISTRAR</Button>
            </div>
        )
    }

    function viewProduct() {

        return (
            <div>
                <h2>Detalle de producto</h2>
                <h4>Código: </h4>
                <p>{selectedProd.codigo}</p>
                <h4>Nombre: </h4>
                <p>{selectedProd.nombre}</p>
                <h4>Cantidad: </h4>
                <p>{selectedProd.cantidad}</p>
                <h4>Precio: </h4>
                <p>{selectedProd.precio}</p>
            </div>
        )
    }

    function renderList(e) {

        return (
            <ListItem key={e.codigo} button
                onClick={() => {
                    console.log(e)
                    setOpenModal(true);
                    setSelectedProd(e);
                }}>
                <ListItemText
                    primary={e.nombre}
                    secondary={e.codigo}
                />
                <p>Cantidad:</p>
                 <p>{e.cantidad}</p>
                <p>Precio:</p>
                 <p>{e.precio}</p>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteProducto(e)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <div className="menu-productos">

            <h2>Lista de productos</h2>
            <div className="list-productos-registro">
                <List dense={dense}>
                    {productos.map((e) => renderList(e))}
                </List>
            </div>

            <div className="botonera-productos">
                <Button variant="contained" color="primary"
                    onClick={() => {
                        setSelectedProd(null)
                        setOpenModal(true)
                    }}
                >Registrar producto</Button>
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
                    <div className="profile-producto">
                        {selectedProd ? viewProduct() : formCreateProducto()}
                    </div>
                </Fade>
            </Modal>
        </div >
    )

}
export default ProductoABM;