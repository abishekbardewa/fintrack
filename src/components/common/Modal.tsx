import React from 'react';

interface ModalProps {
	isOpen?: boolean;
	onClose?: () => void;
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen = true, onClose, title, subtitle, children, size = 'md', showCloseButton = false }) => {
	if (!isOpen) return null;

	const sizeClasses = {
		sm: 'w-80',
		md: 'w-96',
		lg: 'w-[32rem]',
		xl: 'w-[48rem]',
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget && onClose) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex justify-center items-center" onClick={handleBackdropClick}>
			<div className={`relative bg-card p-8 rounded-lg shadow-lg ${sizeClasses[size]} max-w-[95vw]`}>
				{/* Close Button */}
				{showCloseButton && onClose && (
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Close modal"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				)}

				{/* Header */}
				{(title || subtitle) && (
					<div className="mb-6">
						{title && <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>}
						{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
					</div>
				)}

				{/* Content */}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
