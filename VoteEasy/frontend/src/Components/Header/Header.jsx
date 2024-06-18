import React from "react";
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
import "./Header.css";

const steps = [
    { title: "Home", description: "About VoteEasy" },
    { title: "Authentication", description: "Signin / Signin" },
    { title: "Vote", description: "Cast your vote" },
];

function Header() {
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    });
    return (
        <div className="header">
            <div className="app-heading">VoteEasy</div>
            <Stepper index={activeStep} className="stepper">
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
