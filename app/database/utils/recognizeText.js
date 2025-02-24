"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// Initialize the vision model
// const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

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
    const prompt = `This image contains either a number or a mathematical expression. 
        Extract ONLY the mathematical content and format it according to MathJax rules:

        Output requirements:
        - Return only the mathematical notation without any descriptions or explanations
        - Do not include phrases like "The image shows" or "I see"
        - For simple numbers, return just the number without delimiters
        - For expressions, use the appropriate MathJax delimiters

        MathJax formatting rules:
        - Wrap inline math in \( \) or $ $ delimiters
        - Wrap displayed equations in \[ \] or $$ $$ delimiters
        - Use \frac{num}{den} for fractions
        - Use ^ for superscripts and _ for subscripts
        - Use \sqrt{} for square roots
        - Use \cdot or \times for multiplication
        - Use \div for division
        - Use \pm for plus-minus symbol
        - Use \leq and \geq for less/greater than or equal to
        - Use \sum, \prod for summation and product
        - Use \int for integrals

        Common conversions:
        - ¼ → \frac{1}{4}
        - x² → x^2
        - √x → \sqrt{x}
        - × → \times or \cdot
        - ÷ → \div
        - ± → \pm
        - ≤ → \leq
        - ≥ → \geq

        Return only the MathJax-formatted mathematical content, nothing else.`;
    // Call the model with the image
    const result = await model.generateContent([prompt, imagePart]);

    return result.response.text();
  } catch (error) {
    console.error(error.message);
    return "An error occurred while recognizing text.";
  }
}

export default recognizeText;
