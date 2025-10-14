import { useState } from 'react';
import Modal from './common/Modal';
import InputField from './common/InputField';
import FormActions from './common/FormActions';
import { useExpenseContext } from './context/ExpenseProvider';

interface AddCategoryModalProps {
	onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
	const [newCategory, setNewCategory] = useState<string>('');
	const [error, setError] = useState<{ newCategory?: string }>({});
	const { loading, handleAddCategory } = useExpenseContext();

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCategory(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError({});

		const newError: { newCategory?: string } = {};

		if (!newCategory) {
			newError.newCategory = 'Category name is required';
		}

		if (Object.keys(newError).length > 0) {
			setError(newError);
			return;
		}

		await handleAddCategory({ categoryName: newCategory });
		setNewCategory('');
		onClose();
	};

	return (
		<Modal title="Add new category" onClose={onClose}>
			<form onSubmit={handleSubmit} noValidate>
				<InputField
					label="Category name"
					id="categoryName"
					name="categoryName"
					type="text"
					value={newCategory}
					placeholder="new category"
					required={true}
					error={error.newCategory}
					onChange={handleCategoryChange}
				/>
				<FormActions submitText="Add" cancelText="Cancel" isSubmitting={loading} onCancel={onClose} />
			</form>
		</Modal>
	);
};

export default AddCategoryModal;
