import axios from "axios";

export const sendOtp = async (
    email,
    backendUrl,
    setHash,
    setOtpLoading,
    setTimerStarted,
    toast
) => {
    setOtpLoading(true);
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    try {
        const { data } = await axios.post(
            `${backendUrl}/api/auth/send-otp`,
            {
                email,
            },
            config
        );
        setHash(data.secret);
        setOtpLoading(false);
        toast({
            title: "OTP sent",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        setTimerStarted(true);
    } catch (error) {
        toast({
            title: "Unable to send OTP",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
};

export const verifyOtp = async (
    otp,
    hash,
    backendUrl,
    setEmailVerified,
    setOtpVerifying,
    setTimerStarted,
    toast
) => {
    setOtpVerifying(true);
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    try {
        await axios.post(
            `${backendUrl}/api/auth/verify-otp`,
            {
                otp,
                hash,
            },
            config
        );
        setEmailVerified(true);
        toast({
            title: "Email Verified",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    } catch (error) {
        console.log(error);
        toast({
            title: "Invalid OTP",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
    setOtpVerifying(false);
    setTimerStarted(false);
};

export const authenticaton = async (
    isLogin,
    emailVerified,
    email,
    password,
    backendUrl,
    setProgress,
    handleContinue,
    toast
) => {
    if (password.length < 8) {
        toast({
            title: "Password must be atleast 8 characters",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        return;
    }
    try {
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };
        if (isLogin && emailVerified) {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/login`,
                {
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
        } else if (emailVerified) {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/signup`,
                {
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
        }
        toast({
            title: isLogin
                ? "Successfully Logged in"
                : "Successfully registered",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        setProgress(2);
        handleContinue();
    } catch (error) {
        console.log(error);
        toast({
            title: error.response.data.message,
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
};
