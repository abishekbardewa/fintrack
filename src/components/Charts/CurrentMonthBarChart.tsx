import { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useExpenseContext } from '../context/ExpenseProvider';
import ChartContainer from '../common/ChartContainer';
import 'chart.js/auto';

const CurrentMonthBarChart: React.FC = () => {
	const chartRef = useRef<any>();
	const { chartData } = useExpenseContext();

	useEffect(() => {
		if (chartRef.current) {
			const chartInstance = chartRef.current.chartInstance;
			if (chartInstance) {
				chartInstance.destroy();
			}
		}
	}, [chartData]);

	return (
		<ChartContainer
			title="Spending Trends"
			isEmpty={!chartData || chartData.labels.length === 0}
			emptyTitle="No insights available."
			emptySubtitle="Add your expenses to visualize your spending patterns and trends."
		>
			<Doughnut
				ref={chartRef}
				data={chartData}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: 'Total Amount Spent',
							},
						},
					},
				}}
				style={{ height: '100%', width: '100%' }}
			/>
		</ChartContainer>
	);
};

export default CurrentMonthBarChart;
