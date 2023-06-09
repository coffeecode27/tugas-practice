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

app.get('/jobhistory',(req,res)=>{
    pool.query('select * from job_history',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/jobhistory/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from job_history where job_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})




