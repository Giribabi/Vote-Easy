import React, { useContext, useState } from "react";
import "./Pages.css";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatusContext } from "../Context/Context";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const toast = useToast();
    const { setProgress, backendUrl } = useContext(StatusContext);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleContinue = () => {
        // if(status==="authorized")
        navigate("/vote");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };
            if (isLogin) {
                const { data } = await axios.post(
                    `${backendUrl}/api/auth/login`,
                    {
                        email,
                        password,
                    },
                    config
                );
                console.log("login", data);
                localStorage.setItem("userInfo", JSON.stringify(data));
            } else {
                const { data } = await axios.post(
                    `${backendUrl}/api/auth/signup`,
                    {
                        email,
                        password,
                    },
                    config
                );
                console.log("signup", data);
                localStorage.setItem("userInfo", JSON.stringify(data));
            }
            toast({
                title: isLogin
                    ? "Successfully Logged in"
                    : "Successfully registered",
                status: "success",
                duration: "5000",
                isClosable: true,
                position: "top-left",
            });

            setProgress(2);
            handleContinue();
        } catch (error) {
            console.log(error);
            toast({
                title: isLogin
                    ? "Error in logging in"
                    : "Error in registration",
                description: error.response.data.message,
                status: "warning",
                duration: "5500",
                isClosable: true,
                position: "top-left",
            });
        }
    };

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
                        <div className="continue-btn auth-btn">
                            <Button
                                rightIcon={<ArrowUpIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                                onClick={() => setIsLogin(false)}
                            >
                                Signup
                            </Button>
                            <Button
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                            >
                                Login
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
