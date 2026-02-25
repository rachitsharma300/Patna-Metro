import Fuse from 'fuse.js';
import stationsData from './Stations.json';

class StationMatcher {
    constructor() {
        this.stations = stationsData.stations;
        this.synonymMap = new Map();
        this.abbreviationMap = new Map();
        this.searchableItems = [];

        this.buildAbbreviationMap();
        this.buildSynonymMap();
        this.buildSearchIndex();
    }

    generatePhoneticVariations(text) {
        const variations = new Set([text]);
        const engText = text.toLowerCase().trim();

        const substitutions = [
            { from: /ee/g, to: 'i' },
            { from: /oo/g, to: 'u' },
            { from: /ph/g, to: 'f' },
            { from: /v/g, to: 'b' },
            { from: /z/g, to: 'j' },
            { from: /sh/g, to: 's' },
            { from: /cch/g, to: 'ch' },
            { from: /ou/g, to: 'au' },
            { from: /gh/g, to: 'g' },
            { from: /dh/g, to: 'd' },
            { from: /th/g, to: 't' },
            { from: /bh/g, to: 'b' },
            { from: /kh/g, to: 'k' },
            { from: /jn/g, to: 'junction' },
            { from: /junction/g, to: 'jn' },
            { from: /more/g, to: 'mor' },
            { from: /mor/g, to: 'more' },
            { from: /zoo/g, to: 'ju' }
        ];

        substitutions.forEach(({ from, to }) => {
            const variant = engText.replace(from, to);
            if (variant !== engText) variations.add(variant);
        });

        const addSpace = engText.replace(/(pura|nagar|bazar|bhawan|chak|maidan)/g, ' $1');
        if (addSpace !== engText) variations.add(addSpace.trim());

        const removeSpace = engText.replace(/\s+/g, '');
        if (removeSpace !== engText) variations.add(removeSpace);

        return Array.from(variations);
    }

    buildAbbreviationMap() {
        this.abbreviationMap.set('pj', 'Patna Junction');
        this.abbreviationMap.set('pnj', 'Patna Junction');
        this.abbreviationMap.set('pmc', 'PMCH');
        this.abbreviationMap.set('pmch', 'PMCH');
        this.abbreviationMap.set('rps', 'RPS Mor');
        this.abbreviationMap.set('isbt', 'New ISBT');
        this.abbreviationMap.set('zoo', 'Patna Zoo');
        this.abbreviationMap.set('cnlu', 'CNLU');

        this.stations.forEach(station => {
            const nameWords = station.name.split(' ');
            if (nameWords.length > 1) {
                const abbr = nameWords.map(w => w[0].toLowerCase()).join('');
                if (abbr.length >= 2 && !this.abbreviationMap.has(abbr)) {
                    this.abbreviationMap.set(abbr, station.name);
                }
            }
        });
    }

    buildSynonymMap() {
        this.stations.forEach(station => {
            this.synonymMap.set(station.name.toLowerCase().trim(), station.name);

            station.synonyms.forEach(synonym => {
                const lowerSyn = synonym.toLowerCase().trim();
                this.synonymMap.set(lowerSyn, station.name);

                const variations = this.generatePhoneticVariations(lowerSyn);
                variations.forEach(v => {
                    if (!this.synonymMap.has(v)) {
                        this.synonymMap.set(v, station.name);
                    }
                });
            });
        });
    }

    buildSearchIndex() {
        const entriesMap = new Map();

        const addEntry = (text, name, weight) => {
            if (!text || text.length < 2) return;
            if (!entriesMap.has(text)) {
                entriesMap.set(text, { name, text, weight });
            }
        };

        this.stations.forEach(station => {
            addEntry(station.name.toLowerCase(), station.name, 1.0);

            station.synonyms.forEach(syn => {
                addEntry(syn.toLowerCase(), station.name, 1.0);
                const variations = this.generatePhoneticVariations(syn.toLowerCase());
                variations.forEach(v => addEntry(v, station.name, 0.8));
            });
        });

        this.abbreviationMap.forEach((name, abbr) => {
            addEntry(abbr, name, 1.0);
        });

        this.searchableItems = Array.from(entriesMap.values());

        this.fuse = new Fuse(this.searchableItems, {
            keys: [{ name: 'text', weight: 1 }],
            threshold: 0.45,
            distance: 100,
            includeScore: true,
            ignoreLocation: true,
            minMatchCharLength: 2,
            findAllMatches: true
        });
    }

    normalizeStationName(input) {
        if (!input) return input;
        const lower = input.toLowerCase().trim();
        if (this.abbreviationMap.has(lower)) return this.abbreviationMap.get(lower);
        if (this.synonymMap.has(lower)) return this.synonymMap.get(lower);
        return input;
    }

    areSameStations(source, destination) {
        return this.normalizeStationName(source) === this.normalizeStationName(destination);
    }

    getSuggestions(partial, limit = 4) {
        if (!partial || partial.trim().length < 2) return [];
        const cleanPartial = partial.toLowerCase().trim();

        if (this.abbreviationMap.has(cleanPartial)) {
            return [this.abbreviationMap.get(cleanPartial)];
        }

        const results = this.fuse.search(cleanPartial);
        const uniqueNames = [...new Set(results.map(r => r.item.name))];
        return uniqueNames.slice(0, limit);
    }

    findStations(input) {
        if (!input || input.trim().length === 0) return [];

        let lowerInput = input.toLowerCase().trim();
        const found = [];

        const exactStopWordsList = [
            'से', 'to', 'जाना', 'है', 'मुझे', 'करना', 'चाहिए', 'के', 'लिए', 'और', 'या',
            'from', 'in', 'at', 'between', 'route', 'path', 'tell', 'show', 'please',
            'kindly', 'i', 'want', 'go'
        ];

        const addMatch = (name, index, method, score) => {
            if (!found.some(f => f.name === name)) {
                found.push({ name, index, method, score });
            }
        };

        const maskString = (str, start, length) => {
            return str.substring(0, start) + '#'.repeat(length) + str.substring(start + length);
        };

        const sortedAliases = [...this.synonymMap.entries()].sort((a, b) => b[0].length - a[0].length);

        this.abbreviationMap.forEach((stationName, abbr) => {
            const regex = new RegExp(`\\b${abbr}\\b`, 'i');
            const match = lowerInput.match(regex);
            if (match) {
                addMatch(stationName, match.index, 'exact_abbrev', 0.0);
                lowerInput = maskString(lowerInput, match.index, abbr.length);
            }
        });

        sortedAliases.forEach(([alias, stationName]) => {
            if (alias.length < 2) return;
            const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedAlias}\\b`, 'i');
            const match = lowerInput.match(regex);

            if (match) {
                addMatch(stationName, match.index, 'exact_synonym', 0.0);
                lowerInput = maskString(lowerInput, match.index, alias.length);
            }
        });

        if (found.length < 2) {
            const patternInput = input.toLowerCase().trim();
            const patterns = [
                /(.+?)\s+(?:to|-|->|–)\s+(.+)/i,
                /from\s+(.+?)\s+to\s+(.+)/i,
                /(.+?)\s+से\s+(.+?)\s+(?:जाना|के लिए|का)/i,
                /(.+?)\s+से\s+(.+)/i,
                /between\s+(.+?)\s+and\s+(.+)/i
            ];

            for (const pattern of patterns) {
                const matchInfo = patternInput.match(pattern);
                if (matchInfo) {
                    const [_, srcStr, destStr] = matchInfo;

                    const matchFuzzy = (text) => {
                        const cleanStr = text.split(/\s+/).filter(w => !exactStopWordsList.includes(w)).join(' ');
                        const res = this.fuse.search(cleanStr);
                        return (res.length > 0 && res[0].score <= 0.45) ? res[0].item.name : null;
                    };

                    const sName = matchFuzzy(srcStr);
                    const dName = matchFuzzy(destStr);

                    if (sName) addMatch(sName, 0, 'pattern_source', 0.1);
                    if (dName) addMatch(dName, patternInput.length, 'pattern_dest', 0.1);

                    if (sName && dName) break;
                }
            }
        }

        if (found.length < 2) {
            let cleanFuzzyInput = lowerInput;
            exactStopWordsList.forEach(w => {
                const regex = new RegExp(`\\b${w}\\b`, 'gi');
                cleanFuzzyInput = cleanFuzzyInput.replace(regex, ' ');
            });

            const tokens = cleanFuzzyInput.split(/\s+/).filter(w => w.length >= 2 && !/^#+$/.test(w));

            for (let i = 0; i < tokens.length - 1; i++) {
                if (found.length >= 2) break;
                const bigram = tokens[i] + ' ' + tokens[i + 1];
                const res = this.fuse.search(bigram);

                if (res.length > 0 && res[0].score <= 0.45) {
                    addMatch(res[0].item.name, input.indexOf(tokens[i]), 'fuzzy_bigram', res[0].score);
                    tokens[i] = '#';
                    tokens[i + 1] = '#';
                }
            }

            tokens.forEach(word => {
                if (word === '#' || found.length >= 2) return;
                const res = this.fuse.search(word);
                if (res.length > 0 && res[0].score <= 0.45) {
                    addMatch(res[0].item.name, input.indexOf(word), 'fuzzy_word', res[0].score);
                }
            });
        }

        found.sort((a, b) => a.index - b.index);

        return found.slice(0, 2).map(s => s.name);
    }
}

export default new StationMatcher();
