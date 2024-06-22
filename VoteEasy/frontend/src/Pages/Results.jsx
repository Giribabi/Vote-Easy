import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function Results() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/auth");
    };
    return (
        <div className="page">
            Results
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
    );
}

export default Results;
