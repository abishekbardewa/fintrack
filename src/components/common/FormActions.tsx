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
	showSubmit?: boolean;
	showCancel?: boolean;
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
	showSubmit = true,
	showCancel = true,
}) => {
	const layoutClasses = layout === 'horizontal' ? 'flex items-center gap-4' : 'flex flex-col gap-3';

	return (
		<div className={`w-full ${layoutClasses}`}>
			{showCancel && onCancel && (
				<Button buttonType="button" size="sm" variant="outline" fullWidth disabled={isSubmitting} onClick={onCancel}>
					{cancelText}
				</Button>
			)}
			{showSubmit && (
				<Button
					buttonType={onSubmit ? 'button' : 'submit'}
					size="sm"
					variant={submitVariant}
					fullWidth
					disabled={isDisabled || isSubmitting}
					loading={isSubmitting}
					onClick={onSubmit}
				>
					{submitText}
				</Button>
			)}
		</div>
	);
};

export default FormActions;
