export const groupByDate = (data: any) => {
    return data.reduce((result: any, item: any) => {
        const localDate = new Date(item.releaseDate).toLocaleDateString(undefined, {});
        if (!result[localDate]) result[localDate] = [];
        result[localDate].push(item);
        return result;
    }, {});
};
