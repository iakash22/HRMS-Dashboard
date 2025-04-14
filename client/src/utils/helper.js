import { format, parseISO, isValid } from 'date-fns';

const toUSFormat = (number) => {
    if (!number) return number;

    // If already in format (e.g., "(252) 555-0111"), return as-is
    if (/^\(\d{3}\) \d{3}-\d{4}$/.test(number)) return number;

    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length !== 10) return number;

    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

const toNormalFormat = (formatted) => {
    return formatted.replace(/\D/g, '');
};


const formatDate = (date, formatStr) => {
    if (!date) return '';

    const parsedDate = typeof date === 'string' ? parseISO(date) : date;

    if (!isValid(parsedDate)) return '';

    return format(parsedDate, formatStr);
};

export {
    toUSFormat,
    toNormalFormat,
    formatDate,
}