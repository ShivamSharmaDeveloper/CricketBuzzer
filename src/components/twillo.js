// import querystring from 'querystring';
// // Function to generate a random 6-digit verification code
// export const generateVerificationCode = () => {
//     const min = 100000;
//     const max = 999999;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// // Function to verify the user-entered OTP against the generated code
// const verifyVerificationCode = (generatedCode, enteredCode) => {
//     return generatedCode === parseInt(enteredCode, 10);
// };
// const generatedCode = generateVerificationCode();
// const BASE_URL = 'https://rest-ww.telesign.com/v1/verify/sms';
// const API_KEY = 'OTNDNDk4RTItOUJDRi00MUE0LTk5QzgtRjQ4NDY4MjNDQzNCOm1aK0xWWElDYTl3NElCcHBsdlF1QkY5UkxaczVVb09KeVZQUmVXREVuTDhSbyttRTR3clBHbEk0RThzV1hLMXhUdHJKZFNuN0kvd2JmMm1PNFFSSXZ3PT0='
// export const sendSmsVerification = async (phoneNumber) => {
//     try {
//         const formData = querystring.stringify({
//             phone_number: phoneNumber,
//             verify_code: generatedCode,
//             template: 'Your Code is $$CODE$$ for Kalyan Satta Matka',
//         });

//         const response = await fetch(BASE_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": 'application/x-www-form-urlencoded',
//                 "Authorization": `Basic ${API_KEY}`,
//             },
//             body: formData,
//         });
//         // Extract JSON data from the response
//         const json = await response.json();
//         return json.status.code === 200;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };

// export const checkVerification = async (phoneNumber, code) => {
//     // Verify the entered code
//     const isCodeValid = verifyVerificationCode(generatedCode, (code));

//     // Check the result
//     if (isCodeValid) {
//         console.log('Verification successful!');
//         return true;
//         // Proceed with the next steps (e.g., registration, login)
//     } else {
//         console.log('Verification failed. Please try again.');
//         // Handle the case where verification fails
//         return false;
//     }
// };
const BASE_URL = 'https://verify-3067-ilr6fk.twil.io';

export const sendSmsVerification = async (phoneNumber) => {
    try {
        const data = JSON.stringify({
            to: phoneNumber,
            channel: "sms",
        });

        const response = await fetch(`${BASE_URL}/start-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        // Extract JSON data from the response
        const json = await response.json();
        return json.success;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const checkVerification = async (phoneNumber, code) => {
    try {
        const data = JSON.stringify({
            to: phoneNumber,
            code,
        });

        const response = await fetch(`${BASE_URL}/check-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        // Extract JSON data from the response
        const json = await response.json();

        // console.log(json, "json");
        return json.success;
    } catch (error) {
        console.error(error);
        return false;
    }
};
