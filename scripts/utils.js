export function populateFormatOptions(formats) {
    const sourceFormatSelect = document.getElementById("sourceFormat");
    const targetFormatSelect = document.getElementById("targetFormat");

    formats.forEach(format => {
        const option = document.createElement("option");
        option.value = format;
        option.textContent = format;
        sourceFormatSelect.appendChild(option.cloneNode(true));
        targetFormatSelect.appendChild(option.cloneNode(true));
    });
}

export function replaceTokens(template, data) {
    return template.replace(/{{(\w+)}}/g, (_, token) => data[token] || '');
}

export function extractData(sourcePrompt, sourceTemplate) {
    const regex = new RegExp(sourceTemplate.template.replace(/{{\w+}}/g, '(.*)'), 's');
    const matches = sourcePrompt.match(regex);

    if (!matches) {
        throw new Error('Invalid source prompt format');
    }

    return {
        prompt: matches[1],
        history: matches[2],
        char: matches[3]
    };
}

export function convertPrompt(sourcePrompt, sourceFormat, targetFormat, promptFormats) {
    const sourceTemplate = promptFormats[sourceFormat];
    const targetTemplate = promptFormats[targetFormat];

    const data = extractData(sourcePrompt, sourceTemplate);

    let convertedPrompt = replaceTokens(targetTemplate.template, data);

    if (targetTemplate.historyTemplate) {
        convertedPrompt = convertedPrompt.replace('{{history}}', replaceTokens(targetTemplate.historyTemplate, data));
    }
    if (targetTemplate.char) {
        convertedPrompt = convertedPrompt.replace('{{char}}', targetTemplate.char);
    }

    return convertedPrompt;
}