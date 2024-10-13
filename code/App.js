import React, { useEffect, useState } from 'react';
import { loadDictionaryData, loadExampleSentences } from './services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [dictionary, setDictionary] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWord, setSelectedWord] = useState(null);
    const [exampleSentences, setExampleSentences] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dictData = await loadDictionaryData();
            const exampleData = await loadExampleSentences();
            console.log('Loaded dictionary data:', JSON.stringify(dictData, null, 2)); // Log entire data structure
            setDictionary(dictData);
            setExampleSentences(exampleData);
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleWordSelect = (word) => {
        setSelectedWord(word);
    };

    // Define filteredWords
    const filteredWords = dictionary.filter(word => {
        if (word.lemma) {
            console.log('Checking word:', word.lemma); // Debugging output
            console.log('Against searchTerm:', searchTerm); // Debugging output
            return word.lemma.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
        }
        return false;
    });

    // Log filtered words here
    console.log('Filtered words:', filteredWords); // Check what words are being filtered

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
                {filteredWords.length > 0 ? (
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
                    searchTerm && <li className="list-group-item">No results found</li>
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
                                {sentence.ojibwe_sentence && <p><strong>Ojibwe:</strong> {sentence.ojibwe_sentence}</p>}
                                {sentence.english_sentence && <p><strong>English:</strong> {sentence.english_sentence}</p>}
                            </div>
                        ))}
                </div>
            )}
        </div> // Closing the div properly here
    );
}

export default App;
