import React, { useEffect, useState } from "react";
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const steps = [
    { title: "Home" },
    { title: "Authentication" },
    { title: "Vote" },
    { title: "Results" },
];

function Header({ status }) {
    // use status to know whether really the user has completed the before steps, useContext
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname.slice(1)) {
            case "":
                setActiveStep(0);
                break;
            case "auth":
                setActiveStep(1);
                break;
            case "vote":
                setActiveStep(2);
                break;
            case "results":
                setTimeout(() => {
                    setActiveStep(4);
                }, 4000);
                break;
            default:
                setActiveStep(0);
        }
    }, [location]);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    return (
        <div className="header">
            <div className="app-heading">VoteEasy</div>
            <Stepper index={activeStep} colorScheme="green" className="stepper">
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                                {step.description}
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default Header;
