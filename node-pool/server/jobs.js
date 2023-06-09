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

app.get('/job',(req,res)=>{
    pool.query('select * from jobs',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/job/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from jobs where job_id=$1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/job',(req,res)=> {
    const {job_id, job_title} = req.body
    pool.query('insert into jobs (job_id, job_title) values ($1,$2)',
    [job_id, job_title],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/job/:id',(req,res)=> {
    const {id} = req.params
    const {job_title} = req.body
    pool.query('update jobs set job_title=$2 where job_id=$1',
    [id, job_title],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/job/:id',(req,res)=> {
    const {id} = req.params
    pool.query('delete from jobs where job_id =$1',
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})