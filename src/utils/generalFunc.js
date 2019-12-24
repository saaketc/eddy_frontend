export const arrFilter = (dataArray, property, value) => {
    return dataArray.filter(data => data[property] === value)
}