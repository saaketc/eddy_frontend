export const slug = (string) => {
    return string.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, ' ')
        .replace(/\?+/g, ' ');
}