import React from "react";
import "./Pages.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Auth() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/");
    };
    const handleContinue = () => {
        navigate("/vote");
    };

    return (
        <div className="page">
            Auth
            <div className="continue-btn">
                <Button
                    rightIcon={<ArrowForwardIcon />}
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
    );
}

export default Auth;
