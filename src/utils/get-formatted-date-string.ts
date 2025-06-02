export const getFormattedDateStrings = () => {
    const now = new Date();
    const today = now.toLocaleDateString(undefined, {});
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString(undefined, {});
    const dayBeforeYesterday = new Date(now);
    dayBeforeYesterday.setDate(now.getDate() - 2);
    const dayBeforeYesterdayStr = dayBeforeYesterday.toLocaleDateString(undefined, {});
    return { today, yesterdayStr, dayBeforeYesterdayStr };
};
