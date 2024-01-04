export function dateConverter(date) {
    const postedDate = new Date(date)

    return postedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
}

export function capitalizeWords(inputString) {
    return inputString.replace(/\b\w/g, (match) => match.toUpperCase())
}
