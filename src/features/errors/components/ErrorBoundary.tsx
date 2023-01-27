import { ReactNode } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";

type MarginSize = "3" | "5";

interface ErrorBoundaryProps {
  children: ReactNode;
  errorMessage: string;
  marginY: MarginSize;
}

function AppErrorBoundary({
  children,
  errorMessage,
  marginY,
}: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <FallbackComponent
          errorMessage={errorMessage}
          marginY={marginY}
          reset={resetErrorBoundary}
        />
      )}
      onError={() => toast.error("Unknown error occurred")}
    >
      {children}
    </ErrorBoundary>
  );
}

interface FallbackComponentProps {
  errorMessage: string;
  marginY: MarginSize;
  reset: () => void;
}

function FallbackComponent({
  errorMessage,
  marginY,
  reset,
}: FallbackComponentProps) {
  return (
    <div
      className={`text-center my-${marginY} p-4 bg-danger text-white w-75 mx-auto`}
    >
      <h2>{errorMessage}</h2>
      <button className="fs-4 bg-white rounded" type="button" onClick={reset}>
        Refresh
      </button>
    </div>
  );
}

export default AppErrorBoundary;
