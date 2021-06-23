const roll = (size: number, amount?: number): number[] => {
    if (amount) {
        const results: number[] = []
        for (let i = 0; i < amount; i++) {
            results.push(Math.floor(Math.random() * (size - 1 + 1)) + 1);
        }
        return results
    }
    return [Math.floor(Math.random() * size) + 1];
}

export { roll }