export const dateToString = (date?: Date | string): string => {
    if (!date) return 'N/A'; // Nếu không có ngày, trả về "N/A"
    const d = new Date(date);
    return d.toISOString().split('T')[0].replace(/-/g, '/'); // Chuyển thành YYYY/MM/DD
};
