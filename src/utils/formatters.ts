const numberFormat = new Intl.NumberFormat('en', { notation: 'compact' });
const dateCreatedFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

export {
    numberFormat,
    dateCreatedFormat
}