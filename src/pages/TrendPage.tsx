import { useEffect, useState } from 'react';
import { SegmentedControl, Button, SkeletonLoader } from '../components/common';
import Dropdown from '../components/common/Dropdown';
import { months, timeRange, timeRangeNames, trendOptions, years } from '../constants';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../services/axios.service';
import { Line } from 'react-chartjs-2';
import EmptyState from '../components/common/EmptyState';
import { formatCurrency } from '../utils';

const TrendPage: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState(() => localStorage.getItem('selectedOption') || 'category');
	const [range, setRange] = useState(() => JSON.parse(localStorage.getItem('range')!) || timeRangeNames[0]);
	const [selectedCategory, setSelectedCategory] = useState<any>(null);
	const [compareCategory, setCompareCategory] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [categoryLoading, setCategoryLoading] = useState(false);
	const [categories, setCategories] = useState<any>([]);
	const [totalSpentChart, setTotalSpentChart] = useState<any>(null);
	const [insights, setInsights] = useState<any>(null);
	const [categoryChart, setCategorySpentChart] = useState<any>(null);
	const [categoryInsights, setcategoryInsights] = useState<any>(null);

	// Save to localStorage when state changes
	useEffect(() => {
		localStorage.setItem('selectedOption', selectedOption);
	}, [selectedOption]);

	useEffect(() => {
		localStorage.setItem('range', JSON.stringify(range));
	}, [range]);

	useEffect(() => {
		if (selectedCategory) {
			localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (compareCategory) {
			localStorage.setItem('compareCategory', JSON.stringify(compareCategory));
		}
	}, [compareCategory]);

	// Restore categories and compare categories from localStorage
	useEffect(() => {
		const savedSelectedCategory = JSON.parse(localStorage.getItem('selectedCategory')!);
		const savedCompareCategory = JSON.parse(localStorage.getItem('compareCategory')!);

		if (savedSelectedCategory) setSelectedCategory(savedSelectedCategory);
		if (savedCompareCategory) setCompareCategory(savedCompareCategory);
	}, []);

	const handleOptionChange = (value: string) => {
		setSelectedOption(value);
	};

	const getData = async () => {
		if (selectedOption === 'category') {
			getCategoryTrends();
		} else {
			getTotalSpentTrends();
		}
	};

	const getCategoryTrends = async () => {
		if (selectedCategory?._id === compareCategory?._id) {
			toast.error('Please select a different category for comparison.');
			return;
		}
		setLoading(true);
		try {
			const { data } = await axiosPrivate.post(`/expense/expense-category-trend`, {
				category: selectedCategory.name,
				compareCategory: compareCategory.name,
				range: range.value.toString(),
			});
			const { chart, insights } = data.data;
			setCategorySpentChart(chart);
			setcategoryInsights(insights);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getTotalSpentTrends = async () => {
		setLoading(true);
		try {
			const { data } = await axiosPrivate.get(`/expense/expense-total-spent-trend?range=${range.value}`);
			const { chart, insights } = data.data;
			setTotalSpentChart(chart);
			setInsights(insights);
		} catch (error) {
			// Error already handled by axios interceptor
		} finally {
			setLoading(false);
		}
	};

	// Fetch user categories on mount
	useEffect(() => {
		getUserCategories();
	}, []);

	const getUserCategories = async () => {
		setCategoryLoading(true);
		try {
			const { data } = await axiosPrivate.get(`/category`);
			setCategories(data.data);

			// Set default selected and compare categories if not already set
			if (!selectedCategory) setSelectedCategory(data.data[0]);
			if (!compareCategory) setCompareCategory(data.data[1]);
		} catch (error) {
			// Error already handled by axios interceptor
		} finally {
			setCategoryLoading(false);
		}
	};
	return (
		<>
			<div className="mb-8">
				<h2 className="text-lg font-medium text-foreground mb-4">Choose option to generate trends</h2>
				<SegmentedControl options={trendOptions} name="trendOption" selectedValue={selectedOption} onChange={handleOptionChange} />
			</div>

			{categoryLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mt-8 mb-20">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="col-span-1 flex flex-col gap-4">
							<SkeletonLoader variant="text" width="100%" height="20px" />
							<SkeletonLoader variant="rectangular" width="100%" height="40px" />
						</div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mt-8 mb-20">
					<div className="col-span-1 flex flex-col gap-4">
						<Dropdown
							label="Time range"
							options={timeRangeNames}
							selectedValue={range}
							onSelect={setRange}
							displayValue={(range) => range.name}
							keyExtractor={(range) => range.value.toString()}
						/>
					</div>
					{selectedOption === 'category' && (
						<>
							<div className="col-span-1 flex flex-col gap-4">
								<Dropdown
									label="Select a category"
									options={categories}
									selectedValue={selectedCategory}
									onSelect={setSelectedCategory}
									displayValue={(category) => category.name}
									keyExtractor={(category) => category._id}
								/>
							</div>
							<div className="col-span-1 flex flex-col gap-4">
								<Dropdown
									label="Compare with"
									options={categories}
									selectedValue={compareCategory}
									onSelect={setCompareCategory}
									displayValue={(category) => category.name}
									keyExtractor={(category) => category._id}
								/>
							</div>
						</>
					)}
					<div className="col-span-1 flex flex-col gap-4 justify-end">
						<Button buttonType="button" size="sm" variant="filled" fullWidth onClick={getData} disabled={loading} loading={loading}>
							Generate
						</Button>
					</div>
				</div>
			)}
			{loading ? (
				<>
					{/* Insights Skeleton */}
					<div className="mb-8">
						<div className="space-y-3">
							{Array.from({ length: 3 }).map((_, index) => (
								<SkeletonLoader key={index} variant="text" width="100%" />
							))}
						</div>
					</div>

					{/* Chart Skeleton */}
					<div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-20">
						<div>
							<SkeletonLoader variant="text" width="300px" height="32px" className="mb-5" />
							<div className="h-[500px] p-6 bg-card rounded-[16px] flex items-center justify-center">
								<SkeletonLoader variant="rectangular" width="100%" height="400px" />
							</div>
						</div>
					</div>
				</>
			) : selectedOption === 'category' ? (
				<>
					{categoryInsights && categoryInsights.length > 0 && (
						<>
							<ul role="list" className="">
								{categoryInsights?.map((insight, idx) => (
									<li key={insight + idx} className="flex justify-between gap-x-6">
										<p className="text-md text-muted-foreground">{insight}</p>
									</li>
								))}
							</ul>
						</>
					)}
					{categoryChart && (
						<div className="grid grid-cols-1 md:grid-cols-1  gap-8 mt-20">
							<div>
								<h2 className="text-2xl font-semibold leading-6 text-foreground mb-5">Category Trend Comparison</h2>
								<div className="h-[500px] p-6 bg-card rounded-[16px]">
									{categoryChart && categoryChart?.labels?.length > 0 ? (
										<Line
											data={categoryChart}
											options={{
												responsive: true,
												maintainAspectRatio: false,
											}}
											style={{ height: '100%', width: '100%' }}
										/>
									) : (
										<EmptyState
											title="No trend data available."
											subtitle="Add expenses for the selected categories to track spending trends over time."
										/>
									)}
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					{insights && (
						<div className="grid grid-cols-1 md:grid-cols-2  gap-8 ">
							<div>
								<ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
									{insights?.totalSpent && (
										<li className="col-span-1 flex rounded-md shadow-sm">
											<div className="flex flex-1 items-center justify-between truncate rounded-md border border-border bg-card">
												<div className="flex-1 truncate px-4 py-2 text-sm">
													<h2 className="font-medium text-foreground hover:text-primary">Total spent</h2>
													<p className="text-muted-foreground">{formatCurrency(insights?.totalSpent)}</p>
												</div>
											</div>
										</li>
									)}
									{insights?.averageSpent && (
										<li className="col-span-1 flex rounded-md shadow-sm">
											<div className="flex flex-1 items-center justify-between truncate rounded-md border border-border bg-card">
												<div className="flex-1 truncate px-4 py-2 text-sm">
													<h2 className="font-medium text-foreground hover:text-primary">Average spent</h2>
													<p className="text-muted-foreground">{formatCurrency(insights?.averageSpent)}</p>
												</div>
											</div>
										</li>
									)}
									{insights?.numberOfMonths && (
										<li className="col-span-1 flex rounded-md shadow-sm">
											<div className="flex flex-1 items-center justify-between truncate rounded-md border border-border bg-card">
												<div className="flex-1 truncate px-4 py-2 text-sm">
													<h2 className="font-medium text-foreground hover:text-primary">Number of months</h2>
													<p className="text-muted-foreground">{insights?.numberOfMonths}</p>
												</div>
											</div>
										</li>
									)}
								</ul>
								{insights?.topCategories && insights.topCategories?.length > 0 && (
									<div>
										<h2 className="text-medium font-medium text-foreground mt-5">Top categories</h2>
										<ul role="list" className="mt-1 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
											{insights.topCategories.map((top) => (
												<li key={top.totalSpent} className="col-span-1 flex rounded-md shadow-sm">
													<div className="flex flex-1 items-center justify-between truncate rounded-md border border-border bg-card">
														<div className="flex-1 truncate px-4 py-2 text-sm">
															<h2 className="font-medium text-foreground hover:text-primary">{top?.category}</h2>
															<p className="text-muted-foreground">{formatCurrency(top?.totalSpent)}</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
							<ul role="list" className="">
								{insights?.spendingTrend && (
									<li className="flex justify-between gap-x-6">
										<p className="text-md text-muted-foreground">{insights?.spendingTrend}</p>
									</li>
								)}
								{insights?.comparison && (
									<li className="flex justify-between gap-x-6">
										<p className="text-md text-muted-foreground">{insights?.comparison}</p>
									</li>
								)}
								{insights?.suggestions && (
									<li className="flex justify-between gap-x-6">
										<p className="text-md text-muted-foreground">{insights?.suggestions}</p>
									</li>
								)}
							</ul>
						</div>
					)}
					{totalSpentChart && (
						<div className="grid grid-cols-1 md:grid-cols-1  gap-8 mt-20">
							<div>
								<h2 className="text-2xl font-semibold leading-6 text-foreground mb-5">Total Spent Trend Comparison</h2>
								<div className="h-[500px] p-6 bg-card rounded-[16px]">
									{totalSpentChart && totalSpentChart?.labels?.length > 0 ? (
										<Line
											data={totalSpentChart}
											options={{
												responsive: true,
												maintainAspectRatio: false,
											}}
											style={{ height: '100%', width: '100%' }}
										/>
									) : (
										<EmptyState title="No spending trends available." subtitle="Add your expenses to track your total spending over the months" />
									)}
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default TrendPage;
