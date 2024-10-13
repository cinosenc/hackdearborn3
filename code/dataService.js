import Papa from 'papaparse';

export const loadDictionaryData = async () => {
    try {
        const response = await fetch('/data/ojibwe_dictionary.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true }).data;
        console.log('Parsed dictionary data:', parsedData); // Log parsed data to check its structure
        return parsedData;
    } catch (error) {
        console.error('Error loading dictionary data:', error);
        return []; // Return an empty array on error
    }
};


export const loadExampleSentences = async () => {
    const response = await fetch('/data/example_sentences.csv');
    const text = await response.text();
    return Papa.parse(text, { header: true }).data;
};

export const loadInflectionData = async () => {
    const response = await fetch('/data/inflections_dictionary.csv');
    const text = await response.text();
    return Papa.parse(text, { header: true }).data;
};
