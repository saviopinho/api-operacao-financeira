class Utils {
    static onlyNumbers = (value: string) => {
        return value.replace(/\D/g, '');
    };

    static getBalance(list: any) {
        return list.reduce(
            (sum: number, { value }: { value: number }) =>
                Number(sum) + Number(value),
            0
        );
    }
}

export default Utils;
