import OpenAI from 'openai'
const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY})
 
export async function recommendJobsForProfile(profile:any) {

    const prompt = `profile skills: ${JSON.stringify(profile.skills)}\nReturn a short JSON array ofrecommended job title from the provided list.`
    const resp = await client.chat.completions.create({
        model:'gpt-40-mini',
        messages:[{role:'user',content:prompt}],
    })
    const text = resp.choices?.[0]?.message?.content || '[]'
    try {
        return JSON.parse(text)
    } catch(e) {
        return{raw:text}
    }
}