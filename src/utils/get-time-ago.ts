export const getTimeAgo = (createdAt: Date) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const diffInMs: number = currentDate.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return `${diffInDays} days ago`;
};
