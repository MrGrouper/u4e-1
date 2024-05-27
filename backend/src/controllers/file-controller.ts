import { Request, Response, NextFunction } from "express";
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid';





const storageClient = new Storage({
    keyFilename: '../ardent-particle-382720-df486617d640.json',
    projectId: 'ardent-particle-382720'
})

const bucketName = 'u4e'

export const imageUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('req', req.file)
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded')
        }
        const fileBuffer = req.file.buffer
        const originalName = req.file.originalname

        const bucket = storageClient.bucket(bucketName)
        const file = bucket.file(`${uuidv4()}-${originalName}`)

        await file.save(fileBuffer)
        const publicUrl = `https://storage.googleapis.com/${bucketName}/images/${file.name}`

        res.status(200).json(publicUrl)
        console.log('image saved', publicUrl)
    }
    catch(error){
        res.status(500).json(error)
        console.log('image didnt save')

    }
}

