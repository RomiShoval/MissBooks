const { useState, useEffect } = React;
import { bookService } from "../services/bookService.js";

export function Dashboard() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        bookService.query().then((books) => {
            if (!books || books.length === 0) {
                console.log("No books found.");
                return;
            }

            // Count books per category
            const categoryCounts = books.reduce((acc, book) => {
                book.categories.forEach((category) => {
                    acc[category] = (acc[category] || 0) + 1;
                });
                return acc;
            }, {});

            const totalBooks = books.length;

            // Convert counts to percentages
            const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
                category,
                percentage: Math.round((count / totalBooks) * 100), // Convert to percentage
            }));

            setChartData(chartData);
            renderChart(chartData);
        });
    }, []);

    function renderChart(data) {
        setTimeout(() => {
            const ctx = document.getElementById("booksChart").getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map((item) => item.category), // Category names on X-axis
                    datasets: [
                        {
                            label: "Percentage of Books",
                            data: data.map((item) => item.percentage), // Percentage values
                            backgroundColor: "rgba(173, 216, 230, 0.5)", // Light blue
                            borderColor: "rgba(173, 216, 230, 1)", // Darker blue border
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }, // Hide legend
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.raw}%`,
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100, // Max 100% for better readability
                            ticks: {
                                callback: (value) => `${value}%`, // Show percentage on Y-axis
                            },
                        },
                    },
                },
            });
        }, 500);
    }

    return (
        <div className="dashboard">
            <h2>📊 Books Per Category</h2>
            <canvas id="booksChart"></canvas> {/* Chart renders here */}
        </div>
    );
}