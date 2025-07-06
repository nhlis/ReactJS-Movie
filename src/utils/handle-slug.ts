export const stringToSlug = (str: string) => {
    return str
        .normalize('NFD') // Chuẩn hóa Unicode, tách dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Chỉ giữ chữ, số và dấu '-'
        .replace(/-+/g, '-'); // Xóa dấu "-" trùng nhau
};

export const slugToString = (slug: string): string => {
    if (typeof slug !== 'string') return 'undefined';
    return slug
        .replace(/[-_]/g, ' ') // Thay cả '-' và '_' thành khoảng trắng
        .replace(/\b\w/g, (char: string) => char.toUpperCase()); // Viết hoa chữ cái đầu mỗi từ
};

export const slugToEnum = (slug: string) => slug.replace(/-/g, '_').toLowerCase();
