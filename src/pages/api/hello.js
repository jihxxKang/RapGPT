const axios = require("axios");
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export default async function handler(req, res) {
  let userPrompt = req.body.userPrompt;
  const url = "https://api.openai.com/v1/completions";
  const response = await axios.post(
    url,
    {
      model: "text-davinci-003",
      prompt: userPrompt,
      max_tokens: 3000,
      n: 1,
      stop: null,
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const text = response.data.choices[0].text;
  res.status(200).json({ result: text });
  /*
  const text = response.data.choices.map((choice) => choice.text).join("\n");
  res.status(200).json({ result: text });*/

  /*const text = response.data.choices
    .map((choice) => choice.text)
    .join("<br />");
  res.status(200).send({ result: text });*/
}
