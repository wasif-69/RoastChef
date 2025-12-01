import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // use environment variable
});


export async function POST(res: Request) {
  const CanteenFood = ["Fries", "Juice","Loaded Fries"];

  const data = await res.json();
  const Question = data.Question;
  const answers = data.Answer;

  const prmpt = Question.map(
    (val: string, ind: number) => `${val} reply:${answers[ind]} `
  ).join("\n");

  try {
    const canteenfoodprompt = CanteenFood.map((val: string) => `${val},`);
    const system_prompt = `
        You are a quirky, Gen Z foodie advisor. 
The user has answered several yes/no questions. 
Based on their answers, recommend 1 or 2 foods they should eat. 
For each food, provide a short, fun, Gen Z style reason why they should eat it. 
Output must be **valid JSON** in the following format:

{
  "food": "Name of the food",
  "reason": "Why they should eat it (Gen Z style)"
}
also choice from the following foods only ${canteenfoodprompt}
Do not include anything else outside the JSON.
        `;

    const reponse = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: [{ type: "text", text: system_prompt }],
        },
        {
          role: "user",
          content: [{ type: "text", text: prmpt }],
        },
      ],
    });

    const text = reponse.choices[0].message?.content || "";

    let raw = text; // the text you got from OpenAI

    // Remove ```json and ``` if present
    raw = raw
      .replace(/```json\s*/, "")
      .replace(/```/g, "")
      .trim();

    let jsonOutput;
    try {
      jsonOutput = JSON.parse(raw);
    } catch (e) {
      jsonOutput = { error: "Invalid JSON returned by model", raw: raw };
    }

    return NextResponse.json({
      SATUS: "Succesfull",
      food: jsonOutput,
    });
  } catch (e: any) {
    return NextResponse.json({
      STATUS: "FAIL",
      ERROR: e.message || "DONOT KNOW",
    });
  }
}
