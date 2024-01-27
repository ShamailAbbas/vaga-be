import OpenAI from "openai";

async function generateFaq(city, state, apiKey) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || apiKey,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "user",
        content: `            
            generate 50 FAQ with answers for personal injury attorney in ${city}, ${state}. 
            Last word of each question must be "${city}".
            
given the output in this format. wrap all faqs in a single section in this format

<body>
<question>
[question 1 here]
</question>
<answer>
[answer 1 here]
</answer>
<question>
[question 2 here]
</question>
<answer>
[answer 2 here]
</answer>
and so on ...
</body>

            `,
      },
    ],
    temperature: 1,
    max_tokens: 16000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

export default generateFaq;
