import React, { useState, useEffect } from 'react';
import { LuLoader2 } from 'react-icons/lu';

interface ConfirmModalProps {
	modalId: string;
	title: string;
	subtitle?: string;
	message: string;
	confirmText: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmDisabled?: boolean;
	cancelDisabled?: boolean;
	btnClass?: string;
	icon?: React.ReactNode;
	isBtn?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	modalId,
	title,
	subtitle,
	message,
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
	confirmDisabled = false,
	cancelDisabled = false,
	btnClass = '',
	icon,
	isBtn = true,
}) => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const toggleModal = () => setShowModal(!showModal);

		const modalTrigger = document.getElementById(`modal-trigger-${modalId}`);
		const modalElement = document.getElementById(`modal-${modalId}`);

		if (modalTrigger) {
			modalTrigger.addEventListener('click', toggleModal);
		}

		if (modalElement) {
			const closeButtons = modalElement.querySelectorAll('[data-modal-hide]');
			closeButtons.forEach((button) => {
				button.addEventListener('click', toggleModal);
			});
		}

		return () => {
			if (modalTrigger) {
				modalTrigger.removeEventListener('click', toggleModal);
			}

			if (modalElement) {
				const closeButtons = modalElement.querySelectorAll('[data-modal-hide]');
				closeButtons.forEach((button) => {
					button.removeEventListener('click', toggleModal);
				});
			}
		};
	}, [modalId, showModal]);

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
				<div className="fixed inset-0 bg-black/60" onClick={() => setShowModal(false)}></div>
				<div className="relative z-10 p-4 bg-card rounded-lg shadow max-w-md w-full m-4 border border-border">
					<button
						type="button"
						className="absolute top-3 end-2.5 text-muted-foreground bg-transparent hover:bg-muted hover:text-foreground rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
						data-modal-hide=""
						onClick={onCancel}
					>
						<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						<span className="sr-only">Close modal</span>
					</button>
					<div className="p-4 md:p-5 text-center">
						<div className="flex items-center justify-center mb-5">{icon}</div>
						<h3 className="mb-2 text-md font-normal text-muted-foreground">{title}</h3>
						{subtitle && <p className="mb-5 text-sm font-normal text-foreground">{subtitle}</p>}
						<p className="mb-5 text-sm text-foreground">{message}</p>
						{isBtn && (
							<div className="flex flex-col md:flex-row gap-3 md:gap-0  justify-center items-center">
								<button
									disabled={confirmDisabled}
									type="button"
									className={` ${btnClass} focus:ring-4 focus:outline-none  border  font-medium  rounded-full text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 w-full md:w-[50%] justify-center ${
										confirmDisabled ? 'cursor-not-allowed' : ''
									}`}
									onClick={onConfirm}
								>
									{confirmDisabled ? <LuLoader2 className="w-6 h-6 text-destructive-foreground animate-spin" /> : confirmText}
								</button>
								{onCancel && cancelText && (
									<button
										disabled={cancelDisabled}
										type="button"
										className={`py-2.5 px-5 w-full md:w-[50%] text-sm font-medium text-foreground focus:outline-none bg-card rounded-full border border-border hover:bg-muted hover:text-primary focus:z-10 focus:ring-4 focus:ring-ring ${
											cancelDisabled ? 'cursor-not-allowed' : ''
										}`}
										onClick={onCancel}
									>
										{cancelText}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
export default ConfirmModal;
