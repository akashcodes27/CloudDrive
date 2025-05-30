import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api'; // Corrected: Import Api instance, not axios
import '../Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      fetchFiles();
    }
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await Api.get('/api/files/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error('Failed to fetch files.', error.response?.data || error.message);
    }
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('file', uploadFile);

    try {
      await Api.post('/api/upload/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error('File upload failed.', error.response?.data || error.message);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await Api.get(`/api/files/${filename}/download/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      window.open(response.data.download_url, '_blank');
    } catch (error) {
      console.error('Download failed.', error.response?.data || error.message);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await Api.delete(`/api/files/${filename}/delete/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('File deleted successfully!');
      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error('Delete failed.', error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>CloudDrive Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <h2>My Files</h2>

      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet.</p>
      ) : (
        <div className="file-list">
          {files.map((filePath) => {
            const filename = filePath.split('/').pop();
            return (
              <div className="file-card" key={filePath}>
                <p className="filename">{filename}</p>
                <div className="file-actions">
                  <button onClick={() => handleDownload(filename)}>Download</button>
                  <button onClick={() => handleDelete(filename)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

  );
}

export default Dashboard;
