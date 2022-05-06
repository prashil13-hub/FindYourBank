import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react'
// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Banks() {

    const[allBanks,setAllBanks] = useState([]);

    // useEffect(async()=>{
    //     const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI`)
    //     // console.log(res.data);
    //     setAllBanks(res);
    // },[allBanks])

    useEffect(() => {
        (async () => {
            const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI`)
            console.log(res.data)
            setAllBanks(res.data);
        })();
    }, []);

    return (
        <div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allBanks.map((bank) => (
                        <TableRow
                        key={bank.bank_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {bank.bank_name}
                        </TableCell>
                        <TableCell align="right">{bank.ifsc}</TableCell>
                        <TableCell align="right">{bank.branch}</TableCell>
                        <TableCell align="right">{bank.bank_id}</TableCell>
                        <TableCell align="right">{bank.address}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    )
}
