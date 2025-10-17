import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state = {
		hasError: false,
		error: null as Error | null,
	};

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log to console in development
		if (import.meta.env.DEV) {
			console.error('Error caught by boundary:', error, errorInfo);
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-background p-8">
					<div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
						<h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
						<p className="text-muted-foreground mb-6">An unexpected error occurred. Please refresh the page to continue.</p>

						{import.meta.env.DEV && this.state.error && (
							<details className="mb-6 text-left bg-muted p-4 rounded text-xs">
								<summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
								<pre className="text-destructive overflow-auto">{this.state.error.toString()}</pre>
							</details>
						)}

						<button
							onClick={() => window.location.reload()}
							className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90"
						>
							Refresh Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
