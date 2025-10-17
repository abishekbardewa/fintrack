import React, { useState, memo } from 'react';
import CategoryButton from './common/CategoryButton';
import Button from './common/Button';
import SectionHeader from './common/SectionHeader';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import AddCategoryModal from './AddCategoryModal';
import AddExpenseModal from './AddExpenseModal';
import { useExpenseContext } from './context/ExpenseProvider';
import ConfirmModal from './common/ConfirmModal';
import { MdOutlineCancel } from 'react-icons/md';
import { SkeletonLoader } from './common';
import { formatCurrency } from '../utils';

const ExpenseCategory: React.FC = () => {
	const { loading, categories, handleDeleteCategory } = useExpenseContext();
	const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const openModal = (category) => {
		setSelectedCategory(category);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedCategory(null);
	};
	const handleDelete = (category) => {
		setSelectedCategory(category.name);
		setShowModal(true);
	};
	const handleConfirm = async () => {
		await handleDeleteCategory({ categoryName: selectedCategory });
		setShowModal(false);
		setSelectedCategory(null);
	};

	if (loading) {
		return (
			<div>
				<SectionHeader
					title="Expense Categories"
					action={
						<Button buttonType="button" size="md" variant="outline" startIcon={<FaPlus />} onClick={() => setShowCategoryModal(true)}>
							New category
						</Button>
					}
				/>
				<ul role="list" className="h-[500px] overflow-y-auto scrollbar-hidden">
					{Array.from({ length: 6 }).map((_, index) => (
						<li key={index} className="flex justify-between gap-x-6 py-3">
							<div className="flex min-w-0 gap-x-4 flex-1">
								<div className="min-w-0 flex-auto">
									<SkeletonLoader variant="text" width="60%" />
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-x-4">
								<SkeletonLoader variant="text" width="80px" />
								<SkeletonLoader variant="circular" width={24} height={24} />
								<SkeletonLoader variant="circular" width={20} height={20} />
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div>
			<SectionHeader
				title="Expense Categories"
				action={
					<Button buttonType="button" size="md" variant="outline" startIcon={<FaPlus />} onClick={() => setShowCategoryModal(true)}>
						New category
					</Button>
				}
			/>
			<ul role="list" className="h-[500px] overflow-y-auto scrollbar-hidden">
				{categories.map((data) => (
					<li key={data.category?._id} className="flex justify-between gap-x-6 py-3 hover:bg-muted">
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-foreground">{data.category.name}</p>
							</div>
						</div>
						<div className="flex shrink-0 items-center gap-x-4">
							<p className="text-sm leading-6 text-foreground">{formatCurrency(data.totalAmount)}</p>
							<CategoryButton onClick={() => openModal(data.category)} />
							<div role="button" className="text-destructive hover:text-destructive/80 cursor-pointer" onClick={() => handleDelete(data.category)}>
								<FaTrash className="h-5 w-5 text-destructive" />
							</div>
						</div>
					</li>
				))}
			</ul>
			{showCategoryModal && <AddCategoryModal onClose={() => setShowCategoryModal(false)} />}
			{isModalOpen && <AddExpenseModal category={selectedCategory} closeModal={closeModal} />}

			{showModal && (
				<ConfirmModal
					modalId="delete-action-modal"
					title={`Confirm ${selectedCategory} Category Deletion`}
					message={`Deleting this category will remove all associated expenses. This action cannot be undone.`}
					confirmText={'Yes, Delete'}
					cancelText="No, Keep Category"
					onConfirm={handleConfirm}
					onCancel={() => setShowModal(false)}
					confirmDisabled={loading}
					cancelDisabled={loading}
					btnClass={'text-destructive-foreground bg-destructive hover:bg-destructive/90 focus:ring-ring border-destructive'}
					icon={<MdOutlineCancel className="w-10 h-10 text-destructive" />}
				/>
			)}
		</div>
	);
};

export default memo(ExpenseCategory);
