import React, { useEffect, useRef, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useExpenseContext } from './context/ExpenseProvider';
import ChartContainer from './common/ChartContainer';
import { SkeletonLoader } from './common';

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
		return (
			<ChartContainer title="Spending Trends" isEmpty={false} emptyTitle="" emptySubtitle="">
				<div className="h-[400px] flex items-center justify-center">
					<SkeletonLoader variant="circular" width={300} height={300} />
				</div>
			</ChartContainer>
		);
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
