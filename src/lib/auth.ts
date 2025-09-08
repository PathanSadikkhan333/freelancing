import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev'

export async function getUserFromToken(token?:string) {
    if (!token) return null
    try {
        const payload: any = jwt.verify(token.replace('Bearer',''),JWT_SECRET)
        const user = await prisma.user.findUnique({where:{id:payload.sub}})
        return user 
    } catch(e){
        return null
    }
    
}