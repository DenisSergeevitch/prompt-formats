export async function loadPromptFormats() {
    const formats = [
        "alpaca", "commandr", "llama2", "llama3", "openchat", "phi3", "vicuna",
        "deepseekCoder", "med42", "neuralchat", "nousHermes", "openchatMath",
        "orion", "sauerkraut", "starlingCode", "yi34b", "zephyr"
    ];
    const promptFormats = {};

    for (const format of formats) {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/DenisSergeevitch/prompt-formats/formats/main/${format}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load format: ${format}`);
            }
            promptFormats[format] = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    return promptFormats;
}