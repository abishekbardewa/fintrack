const InsightsList: React.FC<{ insights: any }> = ({ insights }) => (
	<>
		{insights && (
			<ul role="list" className="space-y-3">
				{insights.highestSpendingMonth && <li className="text-sm text-muted-foreground">{insights.highestSpendingMonth}</li>}
				{insights.lowestSpendingMonth && <li className="text-sm text-muted-foreground">{insights.lowestSpendingMonth}</li>}
				{insights.spendingIncreaseDecrease && <li className="text-sm text-muted-foreground">{insights.spendingIncreaseDecrease}</li>}
				{insights.biggestCategorySpending && <li className="text-sm text-muted-foreground">{insights.biggestCategorySpending}</li>}
				{insights.totalSpent && <li className="text-sm text-muted-foreground">{insights.totalSpent}</li>}
				{insights.averageMonthlySpending && <li className="text-sm text-muted-foreground">{insights.averageMonthlySpending}</li>}
			</ul>
		)}
	</>
);

export default InsightsList;
