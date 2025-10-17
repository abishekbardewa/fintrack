import { Doughnut } from 'react-chartjs-2';
import Card from '../common/Card';
import { formatCurrency, formatDate } from '../../utils';

const ExpenseEntriesTable: React.FC<{ monthlyExpense: any[] }> = ({ monthlyExpense }) => (
	<>
		{monthlyExpense.length > 0 && (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
				{monthlyExpense.map((expDetails) => (
					<Card key={expDetails.month} padding="lg">
						<h2 className="text-lg font-semibold text-foreground mb-4">{`${expDetails.month} - ${formatCurrency(
							expDetails.totalAmount,
						)} Total spent`}</h2>
						<div className="h-[300px] mb-4">
							<Doughnut data={expDetails.chart} options={{ responsive: true, maintainAspectRatio: false }} />
						</div>
						<div className="overflow-x-auto border border-border">
							<table className="min-w-full divide-y divide-border">
								<thead className="bg-card">
									<tr>
										<th className="px-3 py-2 text-left text-sm font-semibold text-foreground">Category</th>
										<th className="px-3 py-2 text-left text-sm font-semibold text-foreground">Added date</th>
										<th className="px-3 py-2 text-left text-sm font-semibold text-foreground">Amount</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border">
									{expDetails.expensesEntries.map((entry, idx) => (
										<tr key={idx}>
											<td className="px-3 py-2 text-sm text-foreground">{entry.category}</td>
											<td className="px-3 py-2 text-sm text-muted-foreground">{formatDate(entry.entries[0].date)}</td>
											<td className="px-3 py-2 text-sm text-muted-foreground">{formatCurrency(entry.entries[0].amount)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				))}
			</div>
		)}
	</>
);

export default ExpenseEntriesTable;
