"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Initialize the vision model
// const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const prompt = `This image contains text which may include one or more lines of mathematical expressions, normal text, or both.

Output requirements:
- Extract all content from the image
- Return ONLY a raw JSON array of strings, with each line as a separate array element
- DO NOT include markdown formatting, code blocks, or the word "json" in your response
- Your entire response should be just the array, starting with [ and ending with ]
- If only one line is detected, still return it as an array with a single element
- For normal text, include it as-is without any special formatting
- For mathematical expressions, format them according to KaTeX syntax rules

Example correct responses:
- ["This is a single line of text"]
- ["$x^2 + y^2 = z^2$"]
- ["First line of text", "Second line with math $E=mc^2$"]

DO NOT FORMAT THE RESPONSE LIKE THIS:
\`\`\`json
["Line 1", "Line 2"]
\`\`\`

RETURN ONLY THE RAW ARRAY LIKE THIS:
["Line 1", "Line 2"]

KaTeX formatting rules (apply ONLY to mathematical expressions):
- Wrap inline math expressions in $ $ delimiters
- Wrap displayed equations in $$ $$ delimiters
- Use \\frac{num}{den} for fractions
- Use ^ for superscripts and _ for subscripts
- Use \\sqrt{} for square roots
- Use \\cdot or \\times for multiplication
- Use \\div for division
- Use \\pm for plus-minus symbol
- Use \\le and \\ge for less/greater than or equal to
- Use \\sum, \\prod for summation and product
- Use \\int for integrals

Decision rules for identifying math vs. normal text:
- If the content is clearly a mathematical expression, format it with KaTeX syntax
- If the content is clearly normal text, return it as-is
- If a line contains both text and math, preserve the text and only format the mathematical parts

IMPORTANT: Return ONLY the raw JSON array with no additional formatting or explanation.`;

async function recognizeText(data) {
  const { img } = data;

  try {
    // Remove the data URL prefix if present
    const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
    // Prepare the image part for the model
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/png", // Adjust mime type based on your image format
      },
    };

    // Use the prompt defined above
    const result = await model.generateContent([prompt, imagePart]);
    let responseText = result.response.text();
    // Clean up the response - remove markdown code blocks if present
    // responseText = responseText
    //   .replace(/```json\s*/g, "")
    //   .replace(/```\s*$/g, "")
    //   .trim();

    console.log("Raw response:", responseText);

    try {
      // Parse the JSON array response
      const parsedLines = JSON.parse(responseText);

      // Verify it's an array
      if (Array.isArray(parsedLines) === false) {
        console.error("Response is not an array:", parsedLines);
        return ["Error: Response is not in the expected array format"];
      }

      return parsedLines;
    } catch (jsonError) {
      console.error(
        "JSON parsing error:",
        jsonError,
        "Raw text:",
        responseText
      );
      // Fallback: return as a single-element array if JSON parsing fails
      return [responseText];
    }
  } catch (error) {
    console.error(error.message);
    return ["An error occurred while recognizing text."];
  }
}

export default recognizeText;
