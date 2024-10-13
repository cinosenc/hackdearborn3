import React, { useEffect, useState } from 'react';
import { loadDictionaryData, loadExampleSentences, loadInflectionData } from './services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom CSS file

function App() {
    const [dictionary, setDictionary] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredWords, setFilteredWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [exampleSentences, setExampleSentences] = useState([]);
    const [inflections, setInflections] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false); // Track if search has been triggered

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

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchLower = searchTerm.trim().toLowerCase();
            const matches = dictionary.filter(word => {
                const matchesLemma = word.lemma && word.lemma.toLowerCase().includes(searchLower);
                const matchesEnglish = word.translation && word.translation.toLowerCase().includes(searchLower);
                return matchesLemma || matchesEnglish;
            });
            setFilteredWords(matches); // Set the filtered words
            setSearchTriggered(true); // Mark that search has been triggered
        }
    };

    const handleWordSelect = (word) => {
        setSelectedWord(word);
        setSearchTerm(''); // Clear the search term when a word is selected
        setFilteredWords([]); // Clear filtered words on selection
        setSearchTriggered(false); // Reset search trigger
    };

    return (
        <div className="container">
            {/* Fixed header with search bar */}
            <div className="fixed-header text-center">
                <h1>Ojibwe Dictionary</h1>
                <input
                    type="text"
                    className="form-control w-50 mx-auto"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={handleSearchSubmit} // Listen for Enter key
                />
            </div>

            {/* Results container */}
            <div className="results-container w-50">
                <ul className="list-group">
                    {searchTriggered && filteredWords.length > 0 ? (
                        filteredWords.map((word) => (
                            <li
                                key={word.id}
                                className="list-group-item"
                                onClick={() => handleWordSelect(word)}
                            >
                                {word.lemma} -
                                <span>{word.translation ? word.translation.slice(0, 20) : ''}...</span>
                            </li>
                        ))
                    ) : (
                        searchTriggered && <li className="list-group-item">No results found</li>
                    )}
                </ul>

                {/* Display selected word details */}
                {selectedWord && (
                    <div className="mt-3 text-center">
                        <h2>{selectedWord.lemma}</h2>
                        <p>Part of Speech: {selectedWord.part_of_speech}</p>
                        <p>Definition: {selectedWord.translation}</p>

                        <h3>Example Sentences</h3>
                        {exampleSentences.filter(sentence => sentence.lemma === selectedWord.lemma).length > 0 ? (
                            exampleSentences
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
                                ))
                        ) : (
                            <p>N/A</p>
                        )}

                        <h3>Inflected Forms</h3>
                        {inflections.filter(inflection => inflection.lemma === selectedWord.lemma).length > 0 ? (
                            inflections
                                .filter(inflection => inflection.lemma === selectedWord.lemma)
                                .map((inflection, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>Inflection Type:</strong> {inflection.inflection_type}
                                            <strong> Inflected Form:</strong> {inflection.inflected_form}
                                            <strong> Stem:</strong> {inflection.stem}
                                            <strong> Reduplicated Form:</strong> {inflection.reduplicated_form}
                                            <strong> Subject:</strong> {inflection.subject}
                                            <strong> Object:</strong> {inflection.object}
                                            <strong> Mood:</strong> {inflection.mood}
                                            <strong> Number:</strong> {inflection.number}
                                            <strong> Diminutive:</strong> {inflection.diminutive}
                                            <strong> Locative:</strong> {inflection.locative}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
