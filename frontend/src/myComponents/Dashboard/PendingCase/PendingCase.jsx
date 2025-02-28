import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllPendingCases, acceptCase, rejectCase } from '@/services/operations/caseAPI';
import { toast } from 'sonner';
import { FileIcon, FileText } from 'lucide-react';

const PendingCase = () => {
  const [pendingCases, setPendingCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(false);
const [actionCaseId, setActionCaseId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    const fetchPendingCases = async () => {
      try {
        setIsLoading(true);
        const cases = await getAllPendingCases(token);
        setPendingCases(cases);
      } catch (error) {
        console.error("Error fetching pending cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPendingCases();
    }
  }, [token]);

  const handleCardClick = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleAcceptCase = async (caseId) => {
    try {
      setActionInProgress(true);
      setActionCaseId(caseId);
      const success = await acceptCase(token, caseId);
      if (success) {
        setPendingCases(prevCases => prevCases.filter(c => c._id !== caseId));
        setSelectedCase(null);
      }
    } catch (error) {
      console.error("Error accepting case:", error);
    } finally {
      setActionInProgress(false);
      setActionCaseId(null);
    }
  };

  const handleRejectCase = async (caseId) => {
    try {
      const success = await rejectCase(token, caseId);
      if (success) {
        setPendingCases(prevCases => prevCases.filter(c => c._id !== caseId));
        setSelectedCase(null);
        toast.success("Case rejected successfully!");
      }
    } catch (error) {
      console.error("Error rejecting case:", error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading pending cases...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Case Requests</h1>
      
      {pendingCases.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">You don't have any pending case requests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCases.map((caseItem) => (
            <div 
              key={caseItem._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 cursor-pointer" onClick={() => handleCardClick(caseItem)}>
                <h2 className="text-xl font-semibold mb-2 truncate">{caseItem.description}</h2>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Pending
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(caseItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 flex">
              <button 
  onClick={() => handleAcceptCase(caseItem._id)}
  disabled={actionInProgress && actionCaseId === caseItem._id}
  className={`flex-1 py-3 text-center ${
    actionInProgress && actionCaseId === caseItem._id 
      ? "bg-gray-200 text-gray-500" 
      : "bg-green-50 hover:bg-green-100 text-green-700"
  } font-medium transition-colors`}
>
  {actionInProgress && actionCaseId === caseItem._id ? "Accepting..." : "Accept"}
</button>
                <div className="w-px bg-gray-200"></div>
                <button 
                  onClick={() => handleRejectCase(caseItem._id)}
                  className="flex-1 py-3 text-center bg-red-50 hover:bg-red-100 text-red-700 font-medium transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Case Request Details</h2>
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
              
              <div>
                <h3 className="text-lg font-medium mb-1">Created On</h3>
                <p className="text-gray-700">{new Date(selectedCase.createdAt).toLocaleDateString()}</p>
              </div>
              
              {selectedCase.clientInfo && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Client Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-1"><span className="font-medium">Name:</span> {selectedCase.clientInfo.name}</p>
                    <p><span className="font-medium">Contact:</span> {selectedCase.clientInfo.contact || "No contact provided"}</p>
                  </div>
                </div>
              )}
              
              {selectedCase.caseDocument && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Case Document</h3>
                  <a 
                    href={selectedCase.caseDocument} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 w-fit"
                  >
                    <FileText className="mr-2 size-4" />
                    View Document
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleRejectCase(selectedCase._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reject Case
              </button>
              <button 
                onClick={() => handleAcceptCase(selectedCase._id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Accept Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingCase;