import React from 'react';
import Button from './Button';

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
	retryText?: string;
	showRetry?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
	title = 'Something went wrong',
	message = 'We encountered an error loading this data. Please try again.',
	onRetry,
	retryText = 'Try Again',
	showRetry = true,
}) => {
	return (
		<div className="flex flex-col items-center justify-center h-full py-12">
			<svg className="w-16 h-16 text-destructive mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
			<p className="text-sm text-muted-foreground text-center mb-6 max-w-md">{message}</p>
			{showRetry && onRetry && (
				<Button buttonType="button" variant="filled" size="sm" onClick={onRetry}>
					{retryText}
				</Button>
			)}
		</div>
	);
};

export default ErrorState;
