
const keys = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]

const getSongKey = (key: number): string => {
    if (key < 0 || key > 11) {
        throw new RangeError
    }
    let relMin: number
    if (key < 3 ? relMin = key + 9: relMin = key - 3)
    return `${keys[key]} Maj or ${keys[relMin]} Min`
}

const milliToMAndS = (millis: number): string => {
    const min = Math.floor(millis / 60000);
    const sec = ((millis % 60000) / 1000).toFixed(0);
    return min + ':' + (Number(sec) < 10 ? '0' : '') + sec;
}

export { getSongKey, milliToMAndS }