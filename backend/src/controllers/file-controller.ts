// import { Request, Response, NextFunction } from "express";
// import { Storage } from '@google-cloud/storage';
// import { v4 as uuidv4 } from 'uuid';
// import { openai, vectorStoreId, assistantId } from "../config/openai-config.js";
// import * as fs from 'fs';
// import { toFile } from 'openai/uploads';
// import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// const secretClient = new SecretManagerServiceClient();

// async function getSecret() {
//   const [version] = await secretClient.accessSecretVersion({
//     name: 'projects/646234743953/secrets/cloud-storage/versions/latest',
//   });

//   const payload = version.payload.data.toString();
//   return JSON.parse(payload);
// }

// async function initializeStorageClient() {
//   const credentials = await getSecret();

//   return new Storage({
//     credentials,
//     projectId: 'ardent-particle-382720'
//   });
// }

// const bucketName = 'u4e';

// export const imageUpload = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {

//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const storageClient = await initializeStorageClient();
//     const fileBuffer = req.file.buffer;
//     const originalName = req.file.originalname;

//     const bucket = storageClient.bucket(bucketName);
//     const file = bucket.file(`images/${uuidv4()}-${originalName}`);

//     await file.save(fileBuffer);
//     const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

//     res.status(200).json(publicUrl);
//     console.log('image saved', publicUrl);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log('image didn\'t save', error);
//   }
// };

// export const curriculumUpload = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const storageClient = await initializeStorageClient();
//     const fileBuffer = req.file.buffer;
//     const originalName = req.file.originalname;
//     const id = uuidv4();

//     const bucket = storageClient.bucket(bucketName);
//     const file = bucket.file(`curriculums/${id}-${originalName}`);

//     await file.save(fileBuffer);
//     const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

//     const convertedFile = await toFile(fileBuffer, originalName);
//     const uploadResponse = await openai.files.create({
//       file: convertedFile,
//       purpose: 'assistants'
//     });
//     const vectorStoreFile = await openai.beta.vectorStores.files.create(vectorStoreId, {
//       file_id: uploadResponse.id
//     });

//     res.status(200).json({ curriculumUrl: publicUrl, vectorStoreFileId: vectorStoreFile.id });
//     console.log('curriculum saved', vectorStoreFile.id);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log('curriculum didn\'t save', error);
//   }
// };
// export const createSubjectUpload = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (!req.files["image"][0]) {
//       return res.status(400).send("Image file missing");
//     }
//     if (!req.files["curriculum"][0]) {
//       return res.status(400).send("Curriculum file missing");
//     }
//     const storageClient = await initializeStorageClient();
//     const imageFile = req.files["image"][0];
//     const curriculumFile = req.files["curriculum"][0];
//     const imageBuffer = imageFile.buffer;
//     const curriculumBuffer = curriculumFile.buffer;
//     const imageName = imageFile.originalname;
//     const curriculumName = curriculumFile.originalname;
  
//     const bucket = storageClient.bucket(bucketName);
//     const imageFileLocation = bucket.file(`images/${uuidv4()}-${imageName}`);
//     const curriculumFileLocation = bucket.file(
//       `curriculums/${uuidv4()}-${curriculumName}`
//     );
  
//     await imageFileLocation.save(imageBuffer);
//     const publicImageUrl = `https://storage.googleapis.com/${bucketName}/${imageFileLocation.name}`;
  
//     await curriculumFileLocation.save(curriculumBuffer);
//     const publicCurriculumUrl = `https://storage.googleapis.com/${bucketName}/${curriculumFileLocation.name}`;
  
//     const convertedFile = await toFile(curriculumBuffer, curriculumName);
//     const uploadResponse = await openai.files.create({
//       file: convertedFile,
//       purpose: "assistants",
//     });
//     const vectorStoreFile = await openai.beta.vectorStores.files.create(
//       vectorStoreId,
//       {
//         file_id: uploadResponse.id,
//       }
//     );
  
//     res
//       .status(200)
//       .json({
//         imageUrl: publicImageUrl,
//         curriculumUrl: publicCurriculumUrl,
//         vectorStoreFileId: vectorStoreFile.id,
//       });
//     console.log("curriculum saved", vectorStoreFile.id);
//   };
  

//Dev

import { Request, Response, NextFunction } from "express";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import { openai, vectorStoreId, assistantId } from "../config/openai-config.js";
import * as fs from "fs";
import { toFile } from "openai/uploads";

const storageClient = new Storage({
  keyFilename: "../ardent-particle-382720-df486617d640.json",
  projectId: "ardent-particle-382720",
});

const bucketName = "u4e";

export const imageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;

    const bucket = storageClient.bucket(bucketName);
    const file = bucket.file(`images/${uuidv4()}-${originalName}`);

    await file.save(fileBuffer);
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

    res.status(200).json(publicUrl);
    console.log("image saved", publicUrl);
  } catch (error) {
    res.status(500).json(error);
    console.log("image didnt save");
  }
};

export const curriculumUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    const id = uuidv4();

    const bucket = storageClient.bucket(bucketName);
    const file = bucket.file(`curriculums/${id}-${originalName}`);

    await file.save(fileBuffer);
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

    const convertedFile = await toFile(fileBuffer, originalName);
    const uploadResponse = await openai.files.create({
      file: convertedFile,
      purpose: "assistants",
    });
    const vectorStoreFile = await openai.beta.vectorStores.files.create(
      vectorStoreId,
      {
        file_id: uploadResponse.id,
      }
    );

    res
      .status(200)
      .json({
        curriculumUrl: publicUrl,
        vectorStoreFileId: vectorStoreFile.id,
      });
    console.log("curriculum saved", vectorStoreFile.id);
  } catch (error) {
    res.status(500).json(error);
    console.log("curriculum didnt save");
  }
};

export const createSubjectUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files["image"][0]) {
    return res.status(400).send("Image file missing");
  }
  if (!req.files["curriculum"][0]) {
    return res.status(400).send("Curriculum file missing");
  }
  const imageFile = req.files["image"][0];
  const curriculumFile = req.files["curriculum"][0];
  const imageBuffer = imageFile.buffer;
  const curriculumBuffer = curriculumFile.buffer;
  const imageName = imageFile.originalname;
  const curriculumName = curriculumFile.originalname;

  const bucket = storageClient.bucket(bucketName);
  const imageFileLocation = bucket.file(`images/${uuidv4()}-${imageName}`);
  const curriculumFileLocation = bucket.file(
    `curriculums/${uuidv4()}-${curriculumName}`
  );

  await imageFileLocation.save(imageBuffer);
  const publicImageUrl = `https://storage.googleapis.com/${bucketName}/${imageFileLocation.name}`;

  await curriculumFileLocation.save(curriculumBuffer);
  const publicCurriculumUrl = `https://storage.googleapis.com/${bucketName}/${curriculumFileLocation.name}`;

  const convertedFile = await toFile(curriculumBuffer, curriculumName);
  const uploadResponse = await openai.files.create({
    file: convertedFile,
    purpose: "assistants",
  });
  const vectorStoreFile = await openai.beta.vectorStores.files.create(
    vectorStoreId,
    {
      file_id: uploadResponse.id,
    }
  );

  res
    .status(200)
    .json({
      imageUrl: publicImageUrl,
      curriculumUrl: publicCurriculumUrl,
      vectorStoreFileId: vectorStoreFile.id,
    });
  console.log("curriculum saved", vectorStoreFile.id);
};
