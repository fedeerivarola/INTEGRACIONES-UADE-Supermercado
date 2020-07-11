import React, { useState } from 'react'
import './Facturacion.css'
import { Button, Modal, Fade, Backdrop, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';


const Facturacion = (props) => {

    //const admin = props.admin;



    return (
        <div className="facturacion">
            <h2>Facturación al contado</h2>
            <h2>Facturación al contado</h2>

            <div className="facturacion-contado ">
                <div className="row-bottom-margin-10">
                    <h4 >Detalle:</h4>
                    <p>Cantidad</p>
                    <p>Total: </p>
                </div>
            </div>

            <h2>Facturación con tarjeta</h2>
            <div className="facturacion-tarjeta">
                <div className="row-bottom-margin">
                    <h4 >Detalle:</h4>
                    <p>Cantidad</p>
                    <p>Total: </p>
                </div>
            </div>
        </div >
    )

}
export default Facturacion;