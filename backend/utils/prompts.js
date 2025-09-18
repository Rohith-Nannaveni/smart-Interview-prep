const questionAnswerPrompt = (role, experience, topicToFocus, numberOfQuestions) => (
    `
    You are an AI trained to generate interview questions and answers.

    Task:
    -Role: ${role}
    - Candidate Experience: ${experience}
    - Focus topic: ${topicToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, provide a detailed but beginner friendly answer.
    - If an answer needs a code example, include it inside the answer as plain text OR add a separate "code" object (see output format).
    - Keep formatting clear and easy to read.
    - Adjust the difficulty of questions to match a ${experience} year candidate.
    - Keep answers between 4–8 sentences unless a code example is needed.
    - DO NOT use Markdown code fences (\`\`\`) anywhere in the output.
    - Return ONLY valid JSON (no extra text before/after).

    Output format (must be exactly this):
    [
    {
        "question": "string",
        "answer": "string (no markdown fences)",
        "code": {                  // optional
            "language": "javascript",
            "content": "console.log('hello')"
        }
    },
    ...
    ]
    Important: Do NOT add any extra text. Only return valid JSON
    `
);

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given interview question.

    Task:
    - Explain the following interview question and its concept in depth as if you are teaching a beginner.
    - Question: ${question}
    - After the explanation provide a short and clear title that summarizes the concept for the article or the page header.
    - If the explanation needs a code example, add a small block of code.
    - Keep formatting clear and easy to read.
    - Return a valid JSON object in the following format:
    {
        "title":"Short title here?",
        "explanation":"Explanation here"
    }

    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
    `;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };