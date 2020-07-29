import React, { useState, useEffect } from 'react'
import './Facturacion.css'
import { Button, Grid } from '@material-ui/core';


const Facturacion = () => {

    //const admin = props.admin;

    const [detail, setDetail] = useState({
        creditTotal: '',
        debitTotal: '',
        cashTotal: ''
    });
    const [date, setDate] = useState('1-1-2020');
    let { dd, MM, YYYY } = useState(null);

    useEffect(() => {
        async function getDateDetail() {

            let queryDate = '1-1-2020'

            if (date) {
                queryDate = date;
            }

            console.log(queryDate)

            let h = new Headers();
            h.append('Accept', 'application/json');

            let response = await fetch(`https://master-market.azurewebsites.net/api/sale/GetDateDetails?date=${queryDate}`, {
                method: 'GET',
                mode: 'cors',
                headers: h,
                cache: 'default'
            });
            let data = await response.json();

            return data;
        }

        getDateDetail().then(
            (ok) => {
                //{"data":{"creditTotal":1705.08,"debitTotal":1304.80,"cashTotal":234.78}}
                console.log(ok)
                setDetail(ok.data);
            }
        )
    }, [date]);

    function handleInput(e) {

        if (e.target.id === 'dd') {
            dd = e.target.value
        }
        if (e.target.id === 'MM') {
            MM = e.target.value
        }
        if (e.target.id === 'YYYY') {
            YYYY = e.target.value
        }

    }

    function execQuery() {
        document.getElementById('dd').value = ''
        document.getElementById('MM').value = ''
        document.getElementById('YYYY').value = ''
        setDate(`${MM}-${dd}-${YYYY}`)

    }
    return (
        <div>
            {/* <h2>Facturación al contado</h2> */}
            <h2 style={{ paddingTop: 45 }}>Facturación por medio de pago</h2>

            <div className="facturacion">
                <p style={{ marginTop: 0 }}><strong>Ventas del dia</strong> {date}</p>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ paddingBottom: 15 }}
                >
                    Total por tarjeta de credito <br /> $ {detail.creditTotal}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ paddingBottom: 15 }}
                >
                    Total por tarjeta de debito <br /> $ {detail.debitTotal}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ paddingBottom: 15 }}
                >
                    Total por contado <br /> $ {detail.cashTotal}
                </Grid>
                <div>
                    <label>Fecha: </label>
                    <input className="inputDate" id='MM' placeholder='MM' onChange={(e) => handleInput(e)} />
                    <label> - </label>
                    <input className="inputDate" id='dd' placeholder='dd' onChange={(e) => handleInput(e)} />
                    <label> - </label>
                    <input className="inputDate" id='YYYY' placeholder='YYYY' onChange={(e) => handleInput(e)} />
                    <Button style={{ marginLeft: '30px' }} variant="contained" onClick={() => execQuery()}>Consultar</Button>
                </div>
            </div>

        </div >
    )

}
export default Facturacion;