import React, { useContext, useEffect, useState } from "react";
import "./Pages.css";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatusContext } from "../Context/Context";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Timer from "../Components/Timer/Timer";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [hash, setHash] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [otpVerifying, setOtpVerifying] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const [isLogin, setIsLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { setProgress, backendUrl } = useContext(StatusContext);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleContinue = () => {
        navigate("/vote");
    };

    const sendOtp = async () => {
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
            // console.log(data);
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
            handleError(error);
        }
    };

    const verifyOtp = async () => {
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
            toast({
                title: "Invalid OTP",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
        }
        setOtpVerifying(false);
    };

    const authenticaton = async () => {
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
            handleError(error);
        }
    };

    const handleError = (error) => {
        console.log(error);
        const errorHtml = error.response.data;
        const errorBodyStart = errorHtml.indexOf("<body>");
        const errorBodyEnd = errorHtml.indexOf("<pre>");
        const errorMessage = errorHtml.substring(
            errorBodyStart + 12,
            errorBodyEnd
        );
        toast({
            title: errorMessage,
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (emailVerified) {
            authenticaton();
        } else {
            toast({
                title: "Complete email verification",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (timerStarted) {
            setTimeout(() => {
                setTimerStarted(false);
                toast({
                    title: "Timer elapsed",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "top",
                });
            }, 30000);
        }
    }, [timerStarted]);

    return (
        <div className="page">
            <div className="auth">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Enter your password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel className="otp-field-box">
                                <Button
                                    className="send-otp-button"
                                    colorScheme="green"
                                    isLoading={otpLoading}
                                    isDisabled={!email}
                                    onClick={sendOtp}
                                >
                                    Send OTP
                                </Button>
                                <span className="otp-caption">
                                    <span>{"(Expires in 30 seconds)"}</span>
                                    <span
                                        style={{
                                            width: "100%",
                                            height: "10px",
                                        }}
                                    >
                                        {timerStarted && <Timer />}
                                    </span>
                                </span>
                            </FormLabel>
                            <InputGroup>
                                <InputRightElement className="otp-button-box">
                                    <Button
                                        h="38px"
                                        w="104px"
                                        isLoading={otpVerifying}
                                        isDisabled={!otp}
                                        onClick={verifyOtp}
                                    >
                                        Verify OTP
                                    </Button>
                                </InputRightElement>
                                <Input
                                    type="password"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <div className="continue-btn auth-btn">
                            <Button
                                rightIcon={<ArrowUpIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                                isLoading={isLoading && !isLogin}
                                loadingText="Signup"
                                onClick={() => setIsLogin(false)}
                                isDisabled={
                                    (isLoading && isLogin) || !emailVerified
                                }
                            >
                                {"Signup"}
                            </Button>
                            <Button
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                                isLoading={isLoading && isLogin}
                                loadingText="Login"
                                onClick={() => setIsLogin(true)}
                                isDisabled={
                                    (isLoading && !isLogin) || !emailVerified
                                }
                            >
                                {"Login"}
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="continue-btn">
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            colorScheme="green"
                            variant="outline"
                            onClick={handleGoBack}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
