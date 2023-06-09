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

app.get('/employee',(req,res)=>{
    pool.query('select * from employees',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/employee/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from employees where employee_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/employee',(req,res)=> {
    const {employee_id, first_name, last_name} = req.body
    pool.query('insert into employees (employee_id, first_name, last_name) values ($1,$2,$3)',
    [employee_id, first_name, last_name],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/employee/:id',(req,res)=> {
    const {id} = req.params
    const {first_name} = req.body
    pool.query('update employees set first_name=$2 where employee_id=$1',
    [id, first_name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/employee/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from employees where employee_id =$1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})