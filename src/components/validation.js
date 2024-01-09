// Email validation function
export const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    if (!email.trim()) {
        return 'Email is required';
    }

    if (!emailRegex) {
        return 'Invalid email address';
    }

    return '';
};

export const validateFullName = (fullName) => {
    if (!fullName.trim()) {
        return 'Full name is required';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber.trim()) {
        return 'Phone number is required';
    }

    // Basic validation: Check if the phone number has exactly 10 digits
    const phoneRegex = /^(0|[5-9][0-9]{9})$/i.test(phoneNumber);
    if (!phoneRegex) {
        return 'Please enter a valid 10 digit mobile number.';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validateOtp = (otp) => {
    if (!otp.trim()) {
        return 'OTP is required';
    }

    // Basic validation: Check if the OTP has exactly 6 digits
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
        return 'Invalid OTP. It must be a 6-digit number';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validatePoints = (points) => {
    if (!points.trim()) {
        return 'Points are required';
    }

    if (Number(points) < 500) {
        return 'Minimum Points can be added is 500 or more than 500';
    } else if (Number(points) > 10000) {
        return 'Amount can not be more than 10000';
    } else if (Number(points) === 500) {
        return '';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validateAmount = (amount, fund) => {
    if (!amount.trim()) {
        return 'Amount is required';
    }

    if (Number(amount) > Number(fund)) {
        return 'Amount can not be greater than wallet fund.';
    } else if (Number(amount) === Number(fund) && Number(amount) !== 0) {
        return '';
    } else if (Number(amount) === 0){
        return 'Amount can not be zero';
    }
    // Add more custom validation rules if needed

    return '';
};

export const validateDigit = (digit) => {
    if (!digit.trim()) {
        return 'Digit is required';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validateRiquired = (value) => {
    if (!value.trim()) {
        return 'This is required';
    }

    // Add more custom validation rules if needed

    return '';
};
