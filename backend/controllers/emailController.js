const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access the API key from the environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set in the environment.");
    process.exit(1); // Exit if the API key is not set
}
// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the model you want to use.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Controller function to generate email content using Google Gemini.
 * Handles POST requests with email type, subject, and description.
 * Returns the generated email text.
 */
const generateEmail = async (req, res) => {
    const { emailType, subject, description } = req.body;

    if (!emailType || !subject || !description) {
        return res.status(400).json({ error: "Missing required parameters: emailType, subject, and description are required." });
    }

    // Construct the prompt for Gemini
    let prompt = `Generate an email of type "${emailType}" with the subject "${subject}". The description of the email is: "${description}".`;
    prompt += " Please provide the email text only, without any additional formatting or explanations. Do not include a subject line. Do not include a salutation or closing. Just the body of the email.";
    prompt += "  Keep the email concise and to the point.";

    try {
        // Send the prompt to Gemini and get the response
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        if (!responseText) {
            return res.status(500).json({ error: "Failed to generate email content. The Gemini API returned an empty response." });
        }
        // Send the generated email back to the client
        res.json({ email: responseText });

    } catch (error) {
        // Handle errors from the Gemini API
        console.error("Error generating email:", error);
        res.status(500).json({ error: `Error generating email: ${error.message}` }); // Include the error message for more specific debugging
    }
};

module.exports = {
    generateEmail,
};