import React, { useContext, useEffect, useState } from "react";
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
import { StatusContext } from "../../Context/Context";
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
    const { setStatus } = useContext(StatusContext);

    useEffect(() => {
        const currentLocation = location.pathname.slice(1);
        if (currentLocation === "auth") {
            setActiveStep(1);
        } else if (currentLocation === "vote") {
            setActiveStep(2);
        } else if (currentLocation === "results") {
            setActiveStep(3);
            setTimeout(() => {
                setActiveStep(4);
            }, 2000);
        } else {
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
