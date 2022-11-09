const onlyNumbers = (string) => {
    return string.replace(/\D/g, '');
};

module.exports = { onlyNumbers };
