import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-8 p-10 bg-muted/30 rounded-3xl border border-border/50 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-center">
              <div className="p-4 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tighter">Opps, Terjadi Kesalahan</h1>
              <p className="text-muted-foreground leading-relaxed">
                Aplikasi mengalami gangguan teknis yang tidak terduga. Kami telah mencatat masalah ini.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-4 bg-black/5 rounded-xl text-left text-xs font-mono overflow-auto max-h-32 text-destructive">
                  {this.state.error.toString()}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={this.handleReset}
                className="w-full py-4 px-6 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <RefreshCcw className="w-5 h-5" />
                Muat Ulang Halaman
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full py-4 px-6 bg-secondary text-secondary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-80 transition-all"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
