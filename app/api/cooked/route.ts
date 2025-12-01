import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // use environment variable
});


export async function POST(req: Request) {
    const data = await req.json();

    const answers=data.Answer
    const Question=data.Question

    const prmpt=Question.map((val:string,ind:number)=> `${val} reply:${answers[ind]} `).join("\n")



  try {


    const system_prompt=`
    You are a master of witty, COOKED roasts. 
The user has answered several yes/no questions. 
Your task is to write a funny, savage roast in 3 to 5 sentences based **only** on their answers. 
Do NOT repeat the answers themselves. 
Make it playful, slightly exaggerated, culturally relevant to Pakistani students in Islamabad, and humorous. 
Focus on roasting the user's personality, habits, or choices inferred from their answers.
    `

    const reponse = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: "system",
          content:[{ type: "text", text: system_prompt }],
        },
        {
          role: "user",
          content: [{ type: "text", text: prmpt }],
        },
      ],
    });

    return NextResponse.json({
      SATUS: "Succesfull",
      Cooked: reponse.choices[0].message.content,
    });
  } catch (e: any) {
    return NextResponse.json({
      STATUS: "FAIL",
      ERROR: e.message || "DONOT KNOW",
    });
  }
}
