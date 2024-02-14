export default function formatNumber(num: number): string {
    let formattedNum = '';
    if (num >= 1e9) {
        formattedNum = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(num);
    } else if (num >= 1e6) {
        formattedNum = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(num);
    } else if (num >= 1e3) {
        formattedNum = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' }).format(num);
    } else {
        formattedNum = num.toString();
    }
    return formattedNum;
}
