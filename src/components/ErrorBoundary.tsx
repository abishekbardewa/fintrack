import React, { Component, ReactNode } from 'react';
import Button from './common/Button';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log error details for debugging
		this.setState({
			error,
			errorInfo,
		});

		// You can also log to an error reporting service here
		console.error('Error caught by boundary:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
		// Optionally reload the page or navigate to home
		window.location.href = '/overview';
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-background p-8">
					<div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
						<div className="mb-6">
							<svg className="mx-auto h-16 w-16 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>

						<h1 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h1>
						<p className="text-muted-foreground mb-6">
							We encountered an unexpected error. Don't worry, your data is safe. Please try refreshing the page.
						</p>

						{import.meta.env.DEV && this.state.error && (
							<details className="mb-6 text-left bg-muted p-4 rounded-md">
								<summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">Error Details (Dev Only)</summary>
								<pre className="text-xs text-destructive overflow-auto max-h-40">
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}

						<div className="flex gap-3">
							<Button buttonType="button" variant="filled" innerClass="flex-1" onClick={this.handleReset}>
								Go to Dashboard
							</Button>
							<Button buttonType="button" variant="outline" innerClass="flex-1" onClick={() => window.location.reload()}>
								Refresh Page
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
