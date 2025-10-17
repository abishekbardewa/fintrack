import { useEffect, useState } from 'react';
import Modal from './common/Modal';
import InputField from './common/InputField';
import TextAreaField from './common/TextAreaField';
import FormActions from './common/FormActions';
import { useExpenseContext } from './context/ExpenseProvider';
import { formatDateToUTC } from '../utils';

interface EditExpenseModalProps {
	category: { _id: string; category: string; amount: string; date: string; description: string };
	closeModal: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ category, closeModal }) => {
	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [error, setError] = useState<{ amount?: string; date?: string }>({});
	const { loading, handleEditExpense } = useExpenseContext();

	useEffect(() => {
		if (category) {
			setAmount(category.amount);
			setDate(formatDateToUTC(category.date).split('T')[0]);
			setDescription(category.description);
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError({});

		const newError: { amount?: string; date?: string } = {};

		if (!amount) {
			newError.amount = 'Amount is required';
		}
		if (!date) {
			newError.date = 'Date is required';
		}

		if (Object.keys(newError).length > 0) {
			setError(newError);
			return;
		}

		const reqObj = { amount, date: formatDateToUTC(date), description };
		await handleEditExpense(category._id, reqObj);
		closeModal();
	};

	return (
		<Modal title={`Edit Expense for ${category?.category}`} onClose={closeModal}>
			<form onSubmit={handleSubmit} noValidate>
				<InputField
					label="Amount"
					id="amount"
					name="amount"
					type="number"
					value={amount}
					placeholder="amount"
					required={true}
					error={error.amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<InputField
					label="Date"
					id="date"
					name="date"
					type="date"
					value={date}
					placeholder="date"
					required={true}
					error={error.date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<TextAreaField
					label="Description (Optional)"
					id="description"
					name="description"
					placeholder="Write your description"
					value={description}
					maxLength={100}
					rows={2}
					required={false}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<FormActions submitText="Edit expense" cancelText="Cancel" isSubmitting={loading} onCancel={closeModal} />
			</form>
		</Modal>
	);
};

export default EditExpenseModal;
