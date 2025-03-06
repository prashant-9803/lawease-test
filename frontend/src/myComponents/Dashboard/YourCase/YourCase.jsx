import React, { useEffect, useState } from 'react';
import { getAllCasesWithClients } from '@/services/operations/caseAPI'; 
import { useSelector } from 'react-redux';
import { FileText, X } from 'lucide-react';

const YourCase = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [currentDocUrl, setCurrentDocUrl] = useState('');
  const token = useSelector((state) => state.auth.token);
  console.log("token from your case", token);
  const accountType = useSelector((state) => state.profile.user?.accountType);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        const fetchedCases = await getAllCasesWithClients(token);
        setCases(fetchedCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchCases();
    }
  }, [token]);

  const handleCardClick = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const openDocumentViewer = (url) => {
    setCurrentDocUrl(url);
    setShowDocViewer(true);
  };

  const closeDocumentViewer = () => {
    setShowDocViewer(false);
    setCurrentDocUrl('');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading cases...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cases</h1>
      
      {cases.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">You don't have any cases yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCardClick(caseItem)}
            >
              <h2 className="text-xl font-semibold mb-2 truncate">{caseItem.description}</h2>
              
              {accountType === "Provider" && caseItem.clientName && (
                <div className="mb-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Client:</span> {caseItem.clientName}
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    caseItem.status === "Open" ? "bg-blue-100 text-blue-800" : 
                    caseItem.status === "In-Progress" ? "bg-yellow-100 text-yellow-800" : 
                    caseItem.status === "Closed" ? "bg-green-100 text-green-800" : 
                    "bg-red-100 text-red-800"
                  }`}
                >
                  {caseItem.status}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(caseItem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Case Details</h2>
              <button 
                onClick={() => setSelectedCase(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Description</h3>
                <p className="text-gray-700">{selectedCase.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Status</h3>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCase.status === "Open" ? "bg-blue-100 text-blue-800" : 
                      selectedCase.status === "In-Progress" ? "bg-yellow-100 text-yellow-800" : 
                      selectedCase.status === "Closed" ? "bg-green-100 text-green-800" : 
                      "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedCase.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Created On</h3>
                  <p className="text-gray-700">{new Date(selectedCase.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {accountType === "Provider" && selectedCase.clientName && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Client Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-1"><span className="font-medium">Name:</span> {selectedCase.clientName}</p>
                    <p className="mb-1"><span className="font-medium">Email:</span> {selectedCase.clientEmail}</p>
                    <p><span className="font-medium">Contact:</span> {selectedCase.clientContact}</p>
                  </div>
                </div>
              )}
              
              {selectedCase.caseDocument && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Case Document</h3>
                  <button 
                    onClick={() => openDocumentViewer(selectedCase.caseDocument)}
                    className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 w-fit"
                  >
                    <FileText className="mr-2 size-4" />
                    View Document
                  </button>
                </div>
              )}
              
              {selectedCase.caseMilestones && selectedCase.caseMilestones.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Milestones</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedCase.caseMilestones.map((milestone, index) => (
                      <li key={index} className="text-gray-700">
                        {milestone.title || `Milestone ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {showDocViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Document Viewer</h3>
              <button 
                onClick={closeDocumentViewer}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {/* Check if URL is a PDF or image based on extension */}
              {currentDocUrl.match(/\.(pdf)$/i) ? (
                <iframe 
                  src={`${currentDocUrl}#view=FitH`} 
                  className="w-full h-full" 
                  title="Case Document"
                />
              ) : currentDocUrl.match(/\.(jpe?g|png|gif|bmp|webp)$/i) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img 
                    src={currentDocUrl} 
                    alt="Case Document" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="text-center">
                    <FileText className="mx-auto h-16 w-16 text-gray-400" />
                    <p className="mt-2">This document can't be previewed in the browser.</p>
                    <a 
                      href={currentDocUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourCase;