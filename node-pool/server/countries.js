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

const port = process.env.PORT || 3003

app.listen(port,()=> {console.log('Server listening on port '+port)})

app.get('/country',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/country/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from countries where country_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/country',(req,res)=> {
    const {country_id, country_name, region_id} = req.body
    pool.query('insert into countries (country_id, country_name, region_id) values ($1,$2,$3)',
    [country_id, country_name, region_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/country/:id',(req,res)=> {
    const {id} = req.params
    const {country_name} = req.body
    pool.query('update countries set country_name=$2 where country_id=$1',
    [id, country_name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/country/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from countries where country_id =$1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})