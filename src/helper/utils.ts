class Utils {
    static onlyNumbers = (value: string) => {
        return value.replace(/\D/g, '');
    };
}

export default Utils;
