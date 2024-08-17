export default function normalizeString(str: string): string {
    const polishChars = 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ';
    const englishChars = 'acelnoszzACELNOSZZ';
    return str.split('').map(char => {
        const index = polishChars.indexOf(char);
        return index > -1 ? englishChars[index] : char;
    }).join('');
}