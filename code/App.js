import React, { useEffect, useState } from 'react';
import { loadDictionaryData, loadExampleSentences, loadInflectionData } from './services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [dictionary, setDictionary] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWord, setSelectedWord] = useState(null);
    const [exampleSentences, setExampleSentences] = useState([]);
    const [inflections, setInflections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dictData = await loadDictionaryData();
            const exampleData = await loadExampleSentences();
            const inflectionData = await loadInflectionData();
            console.log('Loaded dictionary data:', JSON.stringify(dictData, null, 2));
            setDictionary(dictData);
            setExampleSentences(exampleData);
            setInflections(inflectionData);
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleWordSelect = (word) => {
        console.log('Selected Word:', word);
        setSelectedWord(word);
        setSearchTerm(''); // Clear the search term when a word is selected
    };

    const filteredWords = dictionary.filter(word => {
        if (word.lemma) {
            return word.lemma.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
        }
        return false;
    });

    return (
        <div className="container">
            <h1>Ojibwe Dictionary</h1>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="list-group mt-3">
                {searchTerm ? (
                    filteredWords.length > 0 ? (
                        filteredWords.map((word) => (
                            <li
                                key={word.id}
                                className="list-group-item"
                                onClick={() => handleWordSelect(word)}
                            >
                                {word.lemma} - {word.english}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No results found</li>
                    )
                ) : (
                    <li className="list-group-item">Start typing to search...</li>
                )}
            </ul>

            {selectedWord && (
                <div className="mt-3">
                    <h2>{selectedWord.lemma}</h2>
                    <p>Part of Speech: {selectedWord.part_of_speech}</p>
                    <p>Definition: {selectedWord.translation}</p>
                    <h3>Example Sentences</h3>
                    {exampleSentences
                        .filter(sentence => sentence.lemma === selectedWord.lemma)
                        .map((sentence, index) => (
                            <div key={index}>
                                {sentence.ojibwe_sentence && (
                                    <span>
                                        <strong>Ojibwe:</strong> {sentence.ojibwe_sentence} &nbsp;
                                    </span>
                                )}
                                {sentence.english_sentence && (
                                    <span>
                                        <strong>English:</strong> {sentence.english_sentence}
                                    </span>
                                )}
                            </div>
                        ))}

                    <h3>Inflected Forms</h3>
                    {inflections
                        .filter(inflection => inflection.lemma === selectedWord.lemma)
                        .map((inflection, index) => (
                            <div key={index}>
                                <p><strong>Inflection Type:</strong> {inflection.inflection_type}
                                <strong> Inflected Form:</strong> {inflection.inflected_form}
                                <strong> Stem:</strong> {inflection.stem}
                                <strong> Reduplicated Form:</strong> {inflection.reduplicated_form}
                                <strong> Subject:</strong> {inflection.subject}
                                <strong> Object:</strong> {inflection.object}
                                <strong> Mood:</strong> {inflection.mood}
                                <strong> Number:</strong> {inflection.number}
                                <strong> Diminutive:</strong> {inflection.diminutive}
                                <strong> Locative:</strong> {inflection.locative}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default App;
