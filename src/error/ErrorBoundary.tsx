import { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./interface";
import ErrorMessage from "./ErrorMessage";

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    state: ErrorBoundaryState = {
        hasError: false
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <ErrorMessage />;
        }
        return this.props.children;
    }
}