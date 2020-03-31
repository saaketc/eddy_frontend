export const arrFilter = (dataArray, property, value) => {
    return dataArray.filter(data => data[property] === value)
}

export const arrSum = (arr) => {
    let sum = 0;
    for (let a of arr) {
        sum += a;
    }
    return sum;
}
