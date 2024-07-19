import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import WinnerBox from "../Components/WinnerBox/WinnerBox";
import { StatusContext } from "../Context/Context";
import "./Pages.css";
import { useNavigate } from "react-router-dom";

function Results() {
    const { setProgress } = useContext(StatusContext);
    const [resultsChartData, setResultsChartData] = useState({});
    const [winnerData, setWinnerData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const fetchResults = async () => {
        try {
            setIsLoading(true);
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
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const { data } = await axios.get(
                "http://localhost:3030/api/vote/votecount",
                config
            );
            setResultsChartData({
                labels: data.results.map((candidate) => candidate.alliance),
                datasets: [
                    {
                        label: "Votes Per Alliance",
                        backgroundColor: "rgba(75, 192, 192, 0.3)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
                        hoverBorderColor: "rgba(75, 192, 192, 1)",
                        data: data.results.map(
                            (candidate) => candidate.totalVotes
                        ),
                    },
                ],
            });
            setWinnerData(data.winner[0]);
            setProgress(4);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        toast({
            title: "Successfully logged out",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    };

    return (
        <div className="page">
            <div className="result">
                <div className="results-heading">
                    <div className="heading">You have successfully voted</div>
                    <div className="heading">See who's leading ✨</div>
                </div>

                <div className="results-container">
                    {!isLoading &&
                    winnerData &&
                    resultsChartData &&
                    resultsChartData.labels ? (
                        <div className="results-box">
                            <div className="leading">
                                <WinnerBox
                                    alliance={winnerData._id}
                                    votes={winnerData.totalVotes}
                                />
                            </div>
                            <div className="votes-graph">
                                <Bar data={resultsChartData} />
                            </div>
                        </div>
                    ) : (
                        <div className="loader-container">
                            {isLoading ? (
                                <Spinner
                                    size="xl"
                                    thickness="4px"
                                    speed="0.65s"
                                    color="green"
                                />
                            ) : (
                                "No votes yet."
                            )}
                        </div>
                    )}
                </div>
                <div className="results-footer">
                    <Button
                        className="logout-button"
                        colorScheme="green"
                        variant="solid"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Results;
