module.exports = {
    format_date: (date) => {
        if (!date) return ''; // Handle null or undefined date
        return date.toLocaleDateString();
    },
};
