const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateReflection(summaryData) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are Ruach, a calm behavioral alignment assistant."
      },
      {
        role: "user",
        content: `Analyze this weekly alignment data and give reflection insight:
        ${JSON.stringify(summaryData)}`
      }
    ],
    temperature: 0.6
  });

  return response.choices[0].message.content;
}

module.exports = generateReflection;

