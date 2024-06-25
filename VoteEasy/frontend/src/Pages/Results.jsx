import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Spinner } from "@chakra-ui/react";
import WinnerBox from "../Components/WinnerBox/WinnerBox";
import { StatusContext } from "../Context/Context";
import "./Pages.css";

function Results() {
    const { setProgress } = useContext(StatusContext);
    const [resultsChartData, setResultsChartData] = useState({});
    const [winnerData, setWinnerData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            const userToken = JSON.parse(
                localStorage.getItem("userInfo")
            ).token;
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
        };
        fetchResults();
    }, []);

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
            </div>
        </div>
    );
}

export default Results;
