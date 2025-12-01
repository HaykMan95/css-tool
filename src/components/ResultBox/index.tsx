import type { TailwindMap } from "../../helpers";

interface ResultBoxProps {
    results: TailwindMap | undefined;
    error: string | null;
    loading: boolean;
  }
  
  export function ResultBox({ results, error, loading }: ResultBoxProps) {
    if (loading) {
      return (
        <div className="w-full p-6 border border-gray-300 rounded-lg bg-gray-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Converting...</span>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full p-6 border border-red-300 rounded-lg bg-red-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }
  
    if (!results || Object.keys(results).length === 0) {
      return (
        <div className="w-full p-6 border border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-500 text-center">Results will appear here after conversion</p>
        </div>
      );
    }
  
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">Conversion Results</h3>
        <div className="space-y-4">
          {Object.entries(results).map(([selector, classes]) => (
            <div
              key={selector}
              className="p-4 border border-gray-300 rounded-lg bg-white"
            >
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Selector:</span>
                <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-mono text-blue-600">
                  {selector}
                </code>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Tailwind Classes:</span>
                <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm font-mono text-green-600 break-all">
                  {classes}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  