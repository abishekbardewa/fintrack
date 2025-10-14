import React, { memo } from 'react';

interface PaginationProps {
	totalCount: number;
	page: number;
	limit: number;
	onPageChange: (page: number) => void;
	pageClass?: string;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, page, limit, onPageChange, pageClass = '' }) => {
	const totalPages = Math.ceil(totalCount / limit);
	if (totalPages <= 1) return null;
	const getPageNumbers = () => {
		const pages = [];
		const startPage = Math.max(1, page - 2);
		const endPage = Math.min(totalPages, page + 2);

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (startPage > 1) {
			pages.unshift('...');
			pages.unshift(1);
		}

		if (endPage < totalPages) {
			pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex-1 flex justify-between sm:hidden">
				<button
					onClick={() => onPageChange(page - 1)}
					disabled={page === 1}
					className={`relative inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted ${
						page === 1 && 'cursor-not-allowed opacity-50'
					}`}
				>
					Previous
				</button>
				<button
					onClick={() => onPageChange(page + 1)}
					disabled={page === totalPages}
					className={`relative ml-3 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted ${
						page === totalPages && 'cursor-not-allowed opacity-50'
					}`}
				>
					Next
				</button>
			</div>
			<div className={`hidden sm:flex sm:flex-1 sm:items-center ${pageClass}`}>
				<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
					<button
						onClick={() => onPageChange(page - 1)}
						disabled={page === 1}
						className={`relative inline-flex items-center rounded-l-md px-2 py-2 bg-card text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 ${
							page === 1 && 'cursor-not-allowed opacity-50'
						}`}
					>
						<span className="sr-only">Previous</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					{getPageNumbers().map((pageNumber, index) => (
						<button
							key={index}
							onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
							className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
								pageNumber === page
									? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
									: 'text-foreground ring-1 ring-inset ring-border bg-card hover:bg-muted focus:z-20 focus:outline-offset-0'
							}`}
							disabled={pageNumber === '...'}
						>
							{pageNumber}
						</button>
					))}
					<button
						onClick={() => onPageChange(page + 1)}
						disabled={page === totalPages}
						className={`relative inline-flex items-center rounded-r-md px-2 py-2 bg-card text-muted-foreground ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0 ${
							page === totalPages && 'cursor-not-allowed opacity-50'
						}`}
					>
						<span className="sr-only">Next</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</nav>
			</div>
		</div>
	);
};

export default memo(Pagination);
