import React, { useEffect, useRef, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useExpenseContext } from './context/ExpenseProvider';
import ChartContainer from './common/ChartContainer';

const ExpenseDoughnutChart: React.FC = () => {
	const chartRef = useRef<any>();
	const { loading, chartData } = useExpenseContext();

	useEffect(() => {
		if (chartRef.current) {
			const chartInstance = chartRef.current.chartInstance;
			if (chartInstance) {
				chartInstance.destroy();
			}
		}
	}, [chartData]);

	if (loading) {
		return null;
	}

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
				}}
				style={{ height: '100%', width: '100%' }}
			/>
		</ChartContainer>
	);
};

export default memo(ExpenseDoughnutChart);
