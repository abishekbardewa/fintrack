import React, { useEffect, useState, memo } from 'react';
import { useExpenseContext } from './context/ExpenseProvider';
import EmptyState from './common/EmptyState';
import SectionHeader from './common/SectionHeader';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import ConfirmModal from './common/ConfirmModal';
import { MdOutlineCancel } from 'react-icons/md';
import EditExpenseModal from './EditExpenseModal';
import { formatCurrency, formatDate } from '../utils';
import { SkeletonLoader } from './common';
import Pagination from './common/Pagination';

interface ExpenseRecord {
	_id: string;
	category: string;
	amount: number;
	date: string;
	description?: string;
}

const ExpenseTable: React.FC = () => {
	const { loading, paginationLoading, expenses, handleDeleteExpense, totalCount, paginatedExpenses, fetchPaginatedExpenses } = useExpenseContext();
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<ExpenseRecord | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	useEffect(() => {
		fetchPaginatedExpenses(page, limit);
	}, [page]);

	const handleDelete = (record: ExpenseRecord) => {
		setSelectedRecord(record);
		setShowModal(true);
	};

	const handleConfirm = async () => {
		if (selectedRecord) {
			await handleDeleteExpense(selectedRecord._id);
			setShowModal(false);
			setSelectedRecord(null);
		}
	};

	const handleEdit = (record: ExpenseRecord) => {
		setSelectedRecord(record);
		setShowEditModal(true);
	};

	if (loading) {
		return null;
	}

	return (
		<div>
			<SectionHeader title="Expense Entries" />
			<div className="min-w-full align-middle  bg-card rounded-[16px]  h-[500px] overflow-y-auto overflow-x-auto  scrollbar-hidden border border-border">
				{paginationLoading ? (
					<div className="p-4">
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className="flex justify-between gap-x-6 py-4 border-b border-border last:border-b-0">
								<div className="flex min-w-0 gap-x-4 flex-1">
									<div className="min-w-0 flex-auto">
										<SkeletonLoader variant="text" width="40%" className="mb-1" />
										<SkeletonLoader variant="text" width="60%" height="12px" />
									</div>
								</div>
								<div className="flex shrink-0 items-center gap-x-4">
									<SkeletonLoader variant="text" width="100px" />
									<SkeletonLoader variant="text" width="80px" />
									<SkeletonLoader variant="circular" width={20} height={20} />
									<SkeletonLoader variant="circular" width={20} height={20} />
								</div>
							</div>
						))}
					</div>
				) : paginatedExpenses && paginatedExpenses.length > 0 ? (
					<table className="min-w-full divide-y divide-border">
						<thead className="bg-card">
							<tr>
								<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground">
									Category
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground whitespace-nowrap">
									Spent on
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground whitespace-nowrap">
									Added date
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
									Amount
								</th>
								<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border bg-background">
							{paginatedExpenses.map((expense, idx) => (
								<tr key={`${expense.category}-${idx}`}>
									<td className="py-4 pl-4 pr-3 text-sm font-medium text-foreground">
										{expense.category}
										{expense.description && <p className="mt-1   text-xs leading-5 text-muted-foreground">{expense.description}</p>}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{formatDate(expense.date)}</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{formatDate(expense?.createdAt)}</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{formatCurrency(expense?.amount)}</td>

									<td className="whitespace-nowrap  px-3 py-5 text-right text-sm font-medium sm:pr-0 ">
										<div className="flex item-center  gap-4">
											<div role="button" className="text-primary hover:text-primary/80 cursor-pointer" onClick={() => handleEdit(expense)}>
												<FaPenToSquare className="h-5 w-5 text-primary" />
											</div>
											<div role="button" className="text-destructive hover:text-destructive/80 cursor-pointer" onClick={() => handleDelete(expense)}>
												<FaTrash className="h-5 w-5 text-destructive" />
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<EmptyState title="No expenses recorded yet." subtitle="Start adding your expenses to monitor your financial activity." />
				)}
			</div>
			<div className="mt-5">
				<Pagination totalCount={totalCount} page={page} limit={limit} onPageChange={setPage} pageClass={'justify-end'} />
			</div>

			{showModal && (
				<ConfirmModal
					modalId="delete-action-modal"
					title="Confirm Expense Record Deletion"
					message={`Are you sure you want to delete this expense record? This action cannot be undone and will permanently remove the record from your table.`}
					confirmText={'Yes, Delete'}
					cancelText="No, Keep Record"
					onConfirm={handleConfirm}
					onCancel={() => setShowModal(false)}
					confirmDisabled={paginationLoading}
					cancelDisabled={paginationLoading}
					btnClass={'text-destructive-foreground bg-destructive hover:bg-destructive/90 focus:ring-ring border-destructive'}
					icon={<MdOutlineCancel className="w-10 h-10 text-destructive" />}
				/>
			)}
			{showEditModal && selectedRecord && (
				<EditExpenseModal
					category={{ ...selectedRecord, amount: selectedRecord.amount.toString(), description: selectedRecord.description || '' }}
					closeModal={() => setShowEditModal(false)}
				/>
			)}
		</div>
	);
};

export default memo(ExpenseTable);
