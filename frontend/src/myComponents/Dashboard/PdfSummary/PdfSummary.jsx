import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileDigit } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PDFSummary = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Get token from Redux store
  const { token } = useSelector((state) => state.auth);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadSuccess(false);
      setPdfUrl('');
    } else {
      toast.error('Please select a valid PDF file');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a PDF file first');
      return;
    }
    
    setIsLoading(true);
    toast.loading('Uploading PDF...', { id: 'pdf-upload' });
    
    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('pdfFile', file);
      
      // Using the correct API path pattern: /api/v1/case
      const response = await axios.post('/api/v1/case/upload-pdf-summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setPdfUrl(response.data.pdfUrl);
        setUploadSuccess(true);
        toast.success('PDF uploaded successfully', { id: 'pdf-upload' });
      } else {
        toast.error('Failed to upload PDF', { id: 'pdf-upload' });
      }
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Upload failed', { id: 'pdf-upload' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">PDF Upload</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload a PDF document to securely store in the cloud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="pdf-upload">Select PDF File</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center">
                  <FileDigit className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your PDF here, or click to select
                  </p>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById("pdf-upload")?.click()}
                  >
                    Select PDF
                  </Button>
                </div>
                {file && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Selected file:</p>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      {file.name}
                    </div>
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={!file || isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload PDF'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Results</CardTitle>
            <CardDescription>
              View and access your uploaded document
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border rounded-md p-4 bg-gray-50">
              {!uploadSuccess ? (
                <div className="text-center text-gray-400">
                  {isLoading ? 
                    'Uploading document...' : 
                    'Upload a PDF document to see the result here'
                  }
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="mx-auto h-16 w-16 text-primary" />
                  <p className="mt-4 font-medium">PDF uploaded successfully!</p>
                  <p className="text-sm text-gray-500 mt-2">Your document is now securely stored in the cloud</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {pdfUrl && (
              <Button 
                onClick={() => window.open(pdfUrl, '_blank')}
                variant="outline"
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                View PDF in Browser
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PDFSummary;