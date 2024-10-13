## Inspiration
There are more than 6,000 languages in the world, but anywhere between 50-90% of them could go extinct within our lifetime. The 20 most common languages are spoken by the majority of the world's population, but most of the world's languages are spoken by only a few thousand people. It is vital that we preserve these languages; when a language dies, the heart of the cultural history it carries dies with it. This project was driven by the urgent need for language preservation and revitalization.

## What it does
This is a simple web app implementation of an Ojibwe-English dictionary. Users are able to search in both Ojibwe and English, and the dictionary will return entries that match the query. An entry contains the word in Ojibwe, the English translation, example sentences (if available), and inflectional/morphological data\* (if available).

\*Anishinaabemowin is a morphologically rich language, a characteristic shared by many indigenous North American languages. The morphological complexity of these languages is often significant when compared to high-resource languages such as English. The structure of a language is an important factor that affects the ease with which the languages can be digitized; models trained on languages like English often simply cannot handle morphologically rich languages like Anishinaabemowin without extensive alteration.

## How we built it
All of the dictionary data used in this project was collected from the Ojibwe People's Dictionary, published by the University of Minnesota. This data is available under [http://creativecommons.org/licenses/by-nc-sa/3.0/](Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License). Dictionary data was processed using Python in Jupyter Notebook.

The dictionary web implementation was created using React, JavaScript, and CSS in Visual Studio. ChatGPT assisted in troubleshooting coding errors.

### Data dictionary
This app utilizes three CSV files for its data: `ojibwe_dictionary.csv`, `inflections_dictionary.csv`, and `example_sentences.csv`. Here is a brief explanation of what each file contains:

- `ojibwe_dictionary.csv`: 4756x4. Contains word-to-word Ojibwe-English translations. Column headers `lemma`, `part_of_speech`, `translation`, and `relations`. `lemma` lists the word in Ojibwe, `part_of_speech` lists the lexical category in unabbreviated form (e.g., "transitive inanimate verb"), `translation` lists the word in English, and `relations` lists related words (basically, the "see also:" column).
- `inflections_dictionary.csv`: 17045x11. Contains in-depth data about a given lemma's inflectional forms. Column headers `lemma`, `inflection_type`, `inflected_form`, `stem`, `reduplicated_form`, `subject`, `object`, `mood`, `number`, `diminutive`, and `locative`. `lemma` lists the word in Ojibwe, `inflection_type` lists the lexical category in standard abbreviated form (e.g., "1s - 0s - ind"), `inflected_form` lists the inflected form of interest (lemmas usually have multiple; each inflected form gets its own row), `stem` lists the word stem, `reduplicated_form` lists the reduplicated form (if applicable), `subject` lists the grammatical subject in machine-friendly unabbreviated form (e.g., "first_person_singular"), `object` lists the grammatical object in machine-friendly unabbreviated form (e.g., "singular_inanimate"), `mood` specifies if the form is declarative/imperative/etc, `number` specifies if nouns are singular or plural, `diminutive` is a Boolean TRUE/FALSE for nouns, `locative` is a Boolean TRUE/FALSE for nouns.
- `example_sentences.csv`: 3765x3. Contains sentence-to-sentence Ojibwe-English translations for a given lemma. Column headers `lemma`, `ojibwe_sentence`, and `english_sentence`. `lemma` lists the lemma, `ojibwe_sentence` lists the sentence in Ojibwe, and `english_sentence` lists the translated sentence.



## What's next for Ojibwe Dictionary
With more time, I'll be able to research more in-depth about utilizing pre-trained language models to process low-resource languages. My main area of focus will likely be transfer learning. With a quality trained model, I'll be able to implement a machine translation feature (ideally both word-to-word and full sentences).
