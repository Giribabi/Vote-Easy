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
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const toast = useToast();
    const { setStatus, backendUrl } = useContext(StatusContext);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleContinue = () => {
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
            const { data } = await axios.post(
                `${backendUrl}/api/auth`,
                {
                    email,
                    password,
                },
                config
            );
            toast({
                title: "Successfully registered",
                status: "success",
                duration: "5000",
                isClosable: true,
                position: "top-left",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setStatus("authorized");
            console.log(data);
            navigate("/vote");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error in registration",
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
                        <div className="continue-btn login-btn">
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
                    <div className="continue-btn">
                        <Button
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme="green"
                            variant="outline"
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
