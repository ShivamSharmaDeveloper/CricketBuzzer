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

export const validatePoints = (points, minValid, maxValid) => {
    if (!points.trim()) {
        return 'Points are required';
    }

    if (Number(points) < minValid) {
        return `Minimum Points can be added is ${minValid} or more than ${minValid}`;
    } else if (Number(points) > maxValid) {
        return `Amount can not be more than ${maxValid}`;
    } else if (Number(points) === minValid) {
        return '';
    }

    // Add more custom validation rules if needed

    return '';
};

export const validateAmount = (amount, fund, maxValid) => {
    if (!amount.trim()) {
        return 'Amount is required';
    }

    if (Number(amount) > Number(fund)) {
        return 'Insufficient balance in your wallet.';
    } else if (Number(amount) === Number(fund) && Number(amount) !== 0) {
        return '';
    } else if (Number(amount) === 0){
        return 'Amount can not be zero';
    } else if (Number(amount) < 10){
        return 'Minimum amount should be 10';
    } else if ( maxValid && Number(amount) > maxValid){
        return `Maximum withdrawal is ${maxValid}`;
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
