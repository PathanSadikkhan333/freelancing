import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

async function main(){
    await prisma.user.createMany({
        data: [
            { email:'mybloddy@love.com',name:'bava',role:'EMPLOYER'},
            { email:'ihate@love.com',name:'ERRIGODU',role:'FREELANCER',skills:['react','node'] }
        ]
    })
    await prisma.job.create({
        data:{
            title:'landing page',
            description:'create a responsive landing pagein Next.js',
            budgetMin:10000,
            budgetMax:20000,
            skills:['react','next.js'],
            employer :{connect: { email:'mybloody@love.com'}}
        }
    })
}
main().catch(e => console.error(e)).finally(()=>prisma.$disconnect())