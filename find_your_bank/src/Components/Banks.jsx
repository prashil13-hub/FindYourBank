import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Banks() {

    let[allBanks,setAllBanks] = useState([]);
    const[currPage,setCurrPage] = useState(1)

    // useEffect(async()=>{
    //     const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI`)
    //     // console.log(res.data);
    //     setAllBanks(res);
    // },[allBanks])

    useEffect(() => {
        (async () => {
            const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI`)
            // console.log(res.data)
            setAllBanks(res.data);
        })();
    }, []);

    const handlePageChnage=(item)=>{
        console.log(item)
        setCurrPage(item.page)
        item.selected=true
    }

    let pages = Math.ceil(allBanks.length/10);
    let pageArr = [];
    for(let i=1;i<=pages;i++){
        pageArr.push(i);
    }
    // console.log(pageArr)
    let si = (currPage-1)*10;
    let ei = si+10;
    let filterBanks=[]
    filterBanks=allBanks.slice(si,ei);

    return (
        <div style={{margin:'25px'}}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Bank</TableCell>
                        <TableCell align="right">IFSC</TableCell>
                        <TableCell align="right">Branch</TableCell>
                        <TableCell align="right">Bank ID</TableCell>
                        <TableCell align="right">Adress&nbsp;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filterBanks.map((bank) => (
                        <TableRow
                        key={uuidv4()}
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

            <Stack spacing={2} style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                <Pagination
                    count={pages}
                    renderItem={(item) => (
                    <PaginationItem
                        components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                        onClick={()=>handlePageChnage(item)}
                    />
                    )}
                    
                />
            </Stack>

        </div>
    )
}
