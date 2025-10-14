import React from 'react';
import Button from './Button';

interface FormActionsProps {
	onSubmit?: () => void;
	onCancel?: () => void;
	submitText?: string;
	cancelText?: string;
	isSubmitting?: boolean;
	isDisabled?: boolean;
	submitVariant?: 'filled' | 'outline' | 'error';
	layout?: 'horizontal' | 'vertical';
}

const FormActions: React.FC<FormActionsProps> = ({
	onSubmit,
	onCancel,
	submitText = 'Submit',
	cancelText = 'Cancel',
	isSubmitting = false,
	isDisabled = false,
	submitVariant = 'filled',
	layout = 'horizontal',
}) => {
	const layoutClasses = layout === 'horizontal' ? 'flex items-center gap-4' : 'flex flex-col gap-3';

	return (
		<div className={`w-full ${layoutClasses}`}>
			{onSubmit && (
				<Button
					buttonType={onSubmit ? 'submit' : 'button'}
					size="sm"
					variant={submitVariant}
					innerClass="w-full"
					disabled={isDisabled || isSubmitting}
					loading={isSubmitting}
					onClick={onSubmit}
				>
					{submitText}
				</Button>
			)}
			{onCancel && (
				<Button
					buttonType="button"
					size="sm"
					variant="outline"
					innerClass="w-full text-destructive border-destructive hover:bg-destructive/10"
					disabled={isSubmitting}
					onClick={onCancel}
				>
					{cancelText}
				</Button>
			)}
		</div>
	);
};

export default FormActions;
