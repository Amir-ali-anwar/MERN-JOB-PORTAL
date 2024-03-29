import {readFile} from 'fs/promises'
import  dotenv from 'dotenv'
dotenv.config()
import ConnectDB from './db/connect.js'
import Job from './model/Job.js'

const start= async()=>{
    try {
        await ConnectDB(process.env.MONGO_URL);
        await Job.deleteMany()
        const jsonProducts=JSON.parse(await readFile(new URL('./mock-data.json',import.meta.url)))
        await Job.create(jsonProducts)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

start()