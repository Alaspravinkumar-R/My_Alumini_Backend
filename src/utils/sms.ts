const getSMSOptions = (otp:any, targetNumber:any) => {
    return {
        authorization: process.env.SMS_API_KEY, message: `Your OTP is ${otp}`, numbers: [targetNumber]
    }
}


export {
    getSMSOptions
}