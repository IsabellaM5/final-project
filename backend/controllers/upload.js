import cloudinaryFramework from 'cloudinary'
import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary'
import dotenv from 'dotenv'

dotenv.config()

const cloudinary = cloudinaryFramework.v2

cloudinary.config({
  cloud_name: 'dd6yhsj6a',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})

const parser = multer({ storage })

export default parser.single('image')