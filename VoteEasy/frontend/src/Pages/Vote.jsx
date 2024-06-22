import React, { useEffect, useState } from "react";
import "./Pages.css";
import {
    Button,
    FormControl,
    Radio,
    RadioGroup,
    useSafeLayoutEffect,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
    ArrowForwardIcon,
    ArrowBackIcon,
    CheckCircleIcon,
} from "@chakra-ui/icons";
import VoteAlert from "../Components/VoteAlert/VoteAlert";

function Vote() {
    const [votedCandidate, setVotedCandidate] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    const [candidates, setCandidates] = useState([
        "Sasuke",
        "Nagato",
        "Itachi",
    ]);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/auth");
    };
    const handleContinue = () => {
        // if(status==="voted")
        navigate("/results");
    };

    const handleVote = () => {
        if (votedCandidate === "") {
            toast({
                title: "Please select your vote",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "top",
            });
        }
        if (isConfirm) {
        }
        // else {
        //     toast({
        //         title: "Please confirm your vote",
        //         status: "warning",
        //         duration: "5000",
        //         isClosable: true,
        //         position: "top",
        //     });
        // }
    };

    return (
        <div className="page">
            <div className="vote">
                <div className="form-container">
                    <form>
                        <FormControl isRequired>
                            <div className="candidate-list">
                                <RadioGroup
                                    onChange={setVotedCandidate}
                                    value={votedCandidate}
                                >
                                    {candidates.map((candidate) => (
                                        <div className="candidate">
                                            <Radio value={candidate}>
                                                {candidate}
                                            </Radio>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </FormControl>
                        <div className="continue-btn vote-btn">
                            <Button
                                rightIcon={<CheckCircleIcon />}
                                colorScheme="green"
                                variant="solid"
                                onClick={() => {
                                    handleVote();
                                    setIsOpen(true);
                                }}
                            >
                                Vote
                            </Button>
                        </div>
                    </form>
                </div>
                <VoteAlert
                    isOpen={isOpen && votedCandidate !== ""}
                    setIsOpen={setIsOpen}
                    setIsConfirm={setIsConfirm}
                />
                <div className="card-footer">
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        colorScheme="green"
                        variant="outline"
                        onClick={handleGoBack}
                    >
                        Back
                    </Button>
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
    );
}

export default Vote;
