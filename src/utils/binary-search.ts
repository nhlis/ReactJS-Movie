export function binarySearch(arr: number[], target: number): number {
    if (arr.length === 0) return 0;

    let left = 0,
        right = arr.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return arr[mid];
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left === 0 ? arr[0] : arr[left - 1];
}
