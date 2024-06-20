import React from "react";
import "./Pages.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

function Vote() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/auth");
    };
    const handleContinue = () => {
        navigate("/results");
    };

    return (
        <div className="page">
            Vote
            <div className="continue-btn vote-btn">
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="green"
                    variant="solid"
                >
                    Vote
                </Button>
            </div>
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
    );
}

export default Vote;
