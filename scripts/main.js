import { loadPromptFormats } from './promptFormats.js';
import { populateFormatOptions, convertPrompt } from './utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    const promptFormats = await loadPromptFormats();
    const formats = Object.keys(promptFormats);

    populateFormatOptions(formats);

    document.getElementById("convertButton").addEventListener("click", () => {
        const sourcePrompt = document.getElementById("sourcePrompt").value;
        const sourceFormat = document.getElementById("sourceFormat").value;
        const targetFormat = document.getElementById("targetFormat").value;
        const errorDiv = document.getElementById("error");

        try {
            const targetPrompt = convertPrompt(sourcePrompt, sourceFormat, targetFormat, promptFormats);
            document.getElementById("targetPrompt").value = targetPrompt;
            errorDiv.textContent = '';
        } catch (error) {
            errorDiv.textContent = error.message;
        }
    });
});