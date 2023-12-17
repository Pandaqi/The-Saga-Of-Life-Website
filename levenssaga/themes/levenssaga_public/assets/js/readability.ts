interface Stats
{
    contentWords: string[],
    contentSentences: string[],
    numWords?: number,
    numSentences?: number,
    numSyllables?: number,
    capitalizedWords?: Set<string>,
    syllablesPerWord?: number,
    wordsPerSentence?: number,
    language?: string,
    score?: number
}

function calculateReadability()
{
    const contentNode = document.getElementsByClassName("story-chunks")[0];
    const outputNode = document.getElementsByClassName("readability-result")[0] as HTMLElement;
    const language = outputNode.dataset.language;

    const content = stripContent(contentNode.innerHTML);
    const params = calculateStatistics(content);
    params.language = language;
    calculateScore(params);

    let outputText = "<span><strong>Score: </strong>" + Math.floor(params.score) + "</span>"
    outputText += "<span>&middot;</span><span><strong>Words: </strong>" + params.numWords + "</span>";
    outputText += "<span>&middot;</span><span><strong>Sentences: </strong>" + params.numSentences + "</span>";
    outputText += "<span>&middot;</span><span><strong>Syllables: </strong>" + params.numSyllables + "</span>";

    let specialWords = Array.from(params.capitalizedWords);
    let specialWordsString = "<ul>";
    for(const word of specialWords)
    {
        specialWordsString += "<li>" + word + "</li>";
    }
    specialWordsString += "</ul>"

    let hugoCopyOutput = "readability:<br/>&nbsp;&nbsp;- words: " + params.numWords + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;lines: " + params.numSentences + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;score: " + Math.floor(params.score);
    outputNode.innerHTML = "<p>" + outputText + "</p><p>" + hugoCopyOutput + "</p><p>" + specialWordsString + "</p>";

    // DEBUGGING
    contentNode.innerHTML = content;
    console.log("LANGUAGE DETECTED: ", params.language);
}

function stripContent(txt)
{
    //txt = txt.toLowerCase();

    let regex = /<br>|<br\/>|<hr>|---|\.\.\./ig
    txt = txt.replaceAll(regex, " ");

    regex = /<(.+?)>/ig // HTML tags
    txt = txt.replaceAll(regex, "");

    regex = /\"|\,|\:|\#|\_|\*|\;/ig
    txt = txt.replaceAll(regex, "");

    regex = /[\.|\!|\?]/ig
    txt = txt.replaceAll(regex, ".");

    regex = /\s{2,}/ig
    txt = txt.replaceAll(regex, " ");
    txt = txt.trim();

    return txt;
}

function startsWithCapitalLetter(word)
{
    const firstLetter = word.slice(0,1);
    return firstLetter.toLowerCase() != firstLetter;
}

function getWordsOnly(txt)
{
    let regex = /\./ig; // dots
    txt = txt.replaceAll(regex, " /");
    return txt.split(" ");
}

function calculateStatistics(content)
{
    const params:Stats = {
        contentWords: content.split(" "),
        contentSentences: content.split("."),
    }

    params.numWords = params.contentWords.length;
    params.numSentences = params.contentSentences.length;

    let numSyllables = 0;
    for(const word of params.contentWords)
    {
        numSyllables += countSyllables(word);
    }

    params.numSyllables = numSyllables;

    const capitalizedWords : Set<string> = new Set();
    const contentWordsOnly = getWordsOnly(content);
    let startOfNewSentence = true;
    for(const word of contentWordsOnly)
    {
        if(word == "/") { startOfNewSentence = true; continue; }
        if(!startsWithCapitalLetter(word)) { continue; }
        if(startOfNewSentence) { startOfNewSentence = false; continue; }
        capitalizedWords.add(word);
    }
    params.capitalizedWords = capitalizedWords;

    params.syllablesPerWord = params.numSyllables / params.numWords;
    params.wordsPerSentence = params.numWords / params.numSentences;

    return params;
}

function calculateScore(params)
{
    const score = scoreFunctions[params.language](params);
    params.score = score;
}

function countSyllables(word)
{
    if(word.length <= 0) { return 0; }
    if(word.length <= 2) { return 1; }

    let num = 0;
    const vowels = ["a", "e", "i", "o", "u"];
    const letters = word.split("");

    const startsWithVowel = vowels.includes(letters[0]);
    if(startsWithVowel)
    {
        num++;
    }

    for(let i = 1; i < letters.length; i++)
    {
        const letter = letters[i]
        const isVowel = vowels.includes(letter)
        const prevIsVowel = vowels.includes(letters[i-1]);
        const startedNewSyllable = (isVowel && !prevIsVowel);
        if(startedNewSyllable)
        {
            num++;
        }
    }

    return num;
}

const gradeDict = {
    30: "college",
    40: 13,
    50: 10,
    60: 8,
    70: 7,
    80: 6,
    90: 5,
    100: 4,
}

function mapToGrade(score)
{
    score = Math.ceil(score/10)*10;
    return gradeDict[score];
}


// 195 - 2 * (wordCount/sentenceCount) - (2/3) * 100 * (syllableCount/wordCount)
// 206.835 - 0.93 * (wordCount/sentenceCount) - 77 * (syllableCount/wordCount)
const scoreFunctions = {
    nl: (params) => {
        const score1 = (195 - 2 * params.wordsPerSentence - 66.67 * params.syllablesPerWord)
        const score2 = (206.835 - 0.93 * params.wordsPerSentence - 77 * params.syllablesPerWord)
        const avg = 0.5 * (score1 + score2);
        return mapToGrade(avg);
    },

    en: (params) => {
        const score1 = (206.835 - 1.015 * params.wordsPerSentence - 84.6 * params.syllablesPerWord);
        return mapToGrade(score1);
    }
}

window.addEventListener("load", (ev) => {
    calculateReadability();
})


