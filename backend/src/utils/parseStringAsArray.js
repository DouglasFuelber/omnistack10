const parseStringAsArray = (arrayAsString) => {
    return arrayAsString.split(',').map(item => item.trim());
}

module.exports = parseStringAsArray;