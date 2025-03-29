import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ExportButton() {
  const handleExport = () => {
    // In a real app, this would generate and download a report
    alert("Export functionality would generate a PDF/CSV report here");
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      Export Report
    </button>
  );
}
