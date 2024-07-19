import React, { useContext, useEffect, useState } from "react";
import "./Pages.css";
import {
    Button,
    FormControl,
    Radio,
    RadioGroup,
    useToast,
    Spinner,
    Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
    ArrowForwardIcon,
    ArrowBackIcon,
    CheckCircleIcon,
} from "@chakra-ui/icons";
import VoteAlert from "../Components/VoteAlert/VoteAlert";
import axios from "axios";
import { StatusContext } from "../Context/Context";

function Vote() {
    const { setProgress, backendUrl } = useContext(StatusContext);
    const [votedFor, setVotedFor] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const toast = useToast();

    const [candidates, setCandidates] = useState([]);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/auth");
    };
    const handleContinue = () => {
        navigate("/results");
    };

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsFetching(true);
            const user = JSON.parse(localStorage.getItem("userInfo"));
            if (!user) {
                navigate("/");
                toast({
                    title: "Complete your authentication",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "top",
                });
                return;
            }

            const userToken = user.token;
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                };
                const { data } = await axios.get(
                    `${backendUrl}/api/candidate/list`,
                    config
                );
                setCandidates(data);
                setIsFetching(false);
            } catch (error) {
                console.log(error);
                setIsFetching(false);
                toast({
                    title: "Error occured in fetching candidates!",
                    status: "warning",
                    duration: "3000",
                    isClosable: true,
                    position: "top",
                });
            }
        };

        fetchCandidates();
    }, []);

    const castVote = async () => {
        const voterId = JSON.parse(localStorage.getItem("userInfo"))._id;
        const userToken = JSON.parse(localStorage.getItem("userInfo")).token;
        setIsLoading(true);
        //voting
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const { data } = await axios.post(
                `${backendUrl}/api/vote/castvote`,
                {
                    voterId,
                    votedFor,
                },
                config
            );
            setIsLoading(false);
            toast({
                title: `Voted Successfully for ${data.votedFor}`,
                status: "success",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
            setProgress(3);
            navigate("/results");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast({
                title: error.response.data.message,
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
        }
    };

    useEffect(() => {
        if (isConfirm) {
            castVote();
        }
    }, [isConfirm]);

    const handleVote = () => {
        if (votedFor === "") {
            toast({
                title: "Please select your vote",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <div className="page">
            <div className="vote">
                <div className="form-container">
                    <form>
                        <FormControl isRequired>
                            <div className="candidates-list">
                                <RadioGroup
                                    onChange={setVotedFor}
                                    value={votedFor}
                                >
                                    {!isFetching ? (
                                        candidates &&
                                        candidates.map((candidate, index) => (
                                            <div
                                                className="candidate"
                                                key={candidate + index}
                                            >
                                                <Radio value={candidate.name}>
                                                    <div className="candidate-box">
                                                        <b>
                                                            {candidate.allianceName +
                                                                " "}
                                                        </b>
                                                        <span
                                                            style={{
                                                                color: "darkcyan",
                                                            }}
                                                        >
                                                            @
                                                        </span>
                                                        {candidate.name}
                                                    </div>
                                                </Radio>
                                                <Divider />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="loader-container">
                                            {isFetching ? (
                                                <Spinner
                                                    size="xl"
                                                    thickness="4px"
                                                    speed="0.65s"
                                                    color="green"
                                                />
                                            ) : (
                                                "No candidates have registered for the election"
                                            )}
                                        </div>
                                    )}
                                </RadioGroup>
                            </div>
                        </FormControl>
                        <div className="continue-btn vote-btn">
                            <Button
                                rightIcon={<CheckCircleIcon />}
                                colorScheme="green"
                                variant="solid"
                                isLoading={isLoading}
                                loadingText="Voting"
                                onClick={() => {
                                    setIsOpen(true);
                                    handleVote();
                                }}
                            >
                                Vote
                            </Button>
                        </div>
                    </form>
                </div>
                <VoteAlert
                    isOpen={isOpen && votedFor !== ""}
                    setIsOpen={setIsOpen}
                    setIsConfirm={setIsConfirm}
                />
                <div className="card-footer continue-btn">
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
