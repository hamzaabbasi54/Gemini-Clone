import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("Loaded API Key:", API_KEY ? "✓ API Key Found" : "✗ API Key Missing");

/**
 * Clean and filter the response text to remove special characters and formatting
 * @param {string} text - Raw response text from the API
 * @returns {string} - Cleaned text with only useful content
 */
function cleanResponse(text) {
    if (!text) return "";

    // Remove markdown formatting characters
    let cleaned = text
        // Remove asterisks used for bold/italic
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        // Remove underscores used for italic
        .replace(/__/g, '')
        .replace(/_/g, '')
        // Remove hash symbols used for headers
        .replace(/^#+\s/gm, '')
        // Remove backticks used for code
        .replace(/`/g, '')
        // Remove extra whitespace and newlines
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return cleaned;
}

/**
 * Run a chat interaction with the Gemini AI model
 * @param {string} prompt - The user's prompt/question
 * @returns {Promise<string>} - The AI's response
 */
async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
        responseMimeType: "text/plain",
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    try {
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        const rawText = response.text();

        console.log("Raw API Response:", rawText);

        // Clean the response to remove special characters
        const cleanedText = cleanResponse(rawText);
        console.log("Cleaned Response:", cleanedText);

        return cleanedText;
    } catch (error) {
        console.error("API Error:", error);

        // Provide user-friendly error messages
        if (error.message?.includes("404")) {
            throw new Error("Model not found. Please check your API configuration.");
        } else if (error.message?.includes("API key")) {
            throw new Error("Invalid API key. Please check your .env file.");
        } else {
            throw new Error(`Failed to get response: ${error.message}`);
        }
    }
}

export default runChat;
