import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'hr_db',
    port : 5432
})

const app = express()

app.use(express.json())

const port = process.env.PORT || 5000

app.listen(port,()=> {console.log('Server listening on port '+port)})

app.get('/location',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/location/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from locations where location_id=$1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/location',(req,res)=> {
    const {location_id, street_address, postal_code, city, state_province} = req.body
    pool.query('insert into locations (location_id, street_address, postal_code, city, state_province) values ($1,$2,$3,$4,$5)',
    [location_id, street_address, postal_code, city, state_province],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/location/:id',(req,res)=> {
    const {id} = req.params
    const {city} = req.body
    pool.query('update locations set city=$2 where location_id=$1',
    [id, city],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/location/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from locations where location_id =$1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})