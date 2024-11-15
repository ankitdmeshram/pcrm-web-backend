exports.validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};