import { createContext, useState } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext();
const ContextProvider = (props) => {

    const [input, setinput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // Determine which prompt to send
        const promptToSend = prompt || input;

        // Set the recent prompt and add to previous prompts
        setRecentPrompt(promptToSend);
        setPrevPrompt(prev => [...prev, promptToSend]);

        try {
            console.log("Sending prompt:", promptToSend); // Debug log
            const response = await runChat(promptToSend);
            console.log("Raw response:", response); // Debug log

            if (!response || response.trim() === "") {
                setResultData("No response received from API.");
                setLoading(false);
                setinput("");
                return;
            }

            // Convert line breaks to <br> tags for HTML display
            // The response is already cleaned by gemini.js
            let formattedResponse = response.split("\n").join("<br>");
            console.log("Formatted response:", formattedResponse);
            setResultData(formattedResponse);
        } catch (error) {
            console.error("Error getting response:", error);
            setResultData("Sorry, there was an error getting the response: " + error.message);
        }

        setLoading(false);
        setinput("");
    }

    // Function to handle clicking on recent prompts
    const loadPrompt = async (prompt) => {
        setinput(prompt);
        await onSent(prompt);
    }

    // Function to handle new chat - reset to default screen
    const newChat = () => {
        setShowResult(false);
        setLoading(false);
        setResultData("");
        setRecentPrompt("");
        setinput("");
        // Note: prevPrompt history is preserved (like most chat apps)
        // If you want to clear history too, uncomment the next line:
        // setPrevPrompt([]);
    }

    // Function to clear all chat history
    const clearHistory = () => {
        setPrevPrompt([]);
        newChat(); // Also reset to default screen
    }

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        loadPrompt,  // Added this for recent prompt clicks
        newChat,     // Added this for new chat functionality
        clearHistory, // Added this to clear all history
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;