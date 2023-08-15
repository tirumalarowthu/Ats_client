const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
function convertToWords(number) {
        if (number === 0) return '';
        if (number < 20) return ones[number];
        if (number < 100) {
            const onesPlace = number % 10;
            if (onesPlace === 0) {
                return tens[Math.floor(number / 10)];
            } else {
                return tens[Math.floor(number / 10)] + ' ' + ones[onesPlace];
            }
        }
        if (number < 1000) return ones[Math.floor(number / 100)] + ' Hundred ' + convertToWords(number % 100);
        if (number < 100000) {
            const thousandsPlace = Math.floor(number / 1000);
            if (thousandsPlace === 0) {
                return convertToWords(number % 1000);
            } else {
                return convertToWords(thousandsPlace) + ' Thousand ' + convertToWords(number % 1000);
            }
        }
        if (number < 10000000) return convertToWords(Math.floor(number / 100000)) + ' Lakh ' + convertToWords(number % 100000);
        return 'Number is too large';
    }
export default convertToWords