import React, { useState } from 'react'
import './Facturacion.css'
import { Button, Modal, Fade, Backdrop, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const Facturacion = (props) => {

    //const admin = props.admin;

    const [detail, setDetail] = useState({
        creditTotal: 1705.08,
        debitTotal: 1304.80,
        cashTotal: 234.78
    });

    return (
        <div className="facturañcion">
            <h2>Facturación al contado</h2>
            <h2>Facturación según medio de pago:</h2>

            <div className="facturacion row-bottom-margin">
                    <h4 >Detalle:</h4>
                    <div className="facturacion-col row-bottom-margin">
                        <p>Total por tarjeta de credito:</p>
                        <p>{detail.creditTotal}</p>
                    </div>
                    <div className="facturacion-col row-bottom-margin ">
                        <p>Total por tarjeta de debito:</p>
                        <p>{detail.debitTotal}</p>
                    </div>
                    <div className="facturacion-col row-bottom-margin ">
                        <p>Total por contado:</p>
                        <p>{detail.cashTotal}</p>
                    </div>
            </div>
            
        </div >
    )

}
export default Facturacion;