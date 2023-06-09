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

app.get('/department',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/department/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from departments where department_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/department',(req,res)=> {
    const {department_id, department_name, manager_id} = req.body
    pool.query('insert into departments (department_id, department_name, manager_id) values ($1,$2,$3)',
    [department_id, department_name, manager_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/department/:id',(req,res)=> {
    const {id} = req.params
    const {department_name} = req.body
    pool.query('update departments set department_name=$2 where department_id=$1',
    [id, department_name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/department/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from departments where department_id =$1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})