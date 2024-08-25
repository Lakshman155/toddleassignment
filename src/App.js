import React, { useState } from 'react';
import './App.css';
import { FaLink } from "react-icons/fa"; 
import { HiUpload } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs"; 
import { IoMdArrowDropdown } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDownloadLine } from "react-icons/ri";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(''); // 'create', 'edit', 'upload', 'rename', 'addLink'
  const [editIndex, setEditIndex] = useState(null);
  const [modules, setModules] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [links, setLinks] = useState([]);
  const [moduleName, setModuleName] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleAddModule = () => {
    setModalMode('create');
    setModuleName('');
    setShowModal(true);
  };

  const handleEditModule = (index) => {
    setModalMode('edit');
    setModuleName(modules[index].name);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleRenameUpload = (index) => {
    setModalMode('rename');
    setModuleName(uploads[index].name);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleAddLink = () => {
    setModalMode('addLink');
    setLinkName('');
    setLinkUrl('');
    setShowModal(true);
  };

  const handleSaveModule = () => {
    if (modalMode === 'create') {
      setModules([...modules, { name: moduleName }]);
    } else if (modalMode === 'edit') {
      const updatedModules = [...modules];
      updatedModules[editIndex] = { ...updatedModules[editIndex], name: moduleName };
      setModules(updatedModules);
    } else if (modalMode === 'rename') {
      const updatedUploads = [...uploads];
      updatedUploads[editIndex].name = moduleName;
      setUploads(updatedUploads);
    } else if (modalMode === 'addLink') {
      if (editIndex === null) {
        setLinks([...links, { name: linkName, url: linkUrl }]);
      } else {
        const updatedLinks = [...links];
        updatedLinks[editIndex] = { name: linkName, url: linkUrl };
        setLinks(updatedLinks);
      }
    }
    setShowModal(false);
    setModuleName('');
    setLinkName('');
    setLinkUrl('');
    setLoading(false);
  };

  const handleDeleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
    if (updatedModules.length === 0) {
      setLoading(true);
    }
  };

  const handleDeleteUpload = (index) => {
    const updatedUploads = uploads.filter((_, i) => i !== index);
    setUploads(updatedUploads);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleEditLink = (index) => {
    setModalMode('addLink');
    setLinkName(links[index].name);
    setLinkUrl(links[index].url);
    setEditIndex(index);
    setShowModal(true);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleUploadClick = () => {
    setModalMode('upload');
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      setUploads([...uploads, { name: selectedFile.name, file: selectedFile }]);
      setSelectedFile(null);
      setShowModal(false);
    }
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <div className="top-bar">
        <div className="course-builder-title">Course Builder</div>
        <div className="add-dropdown">
          <button className="add-btn">
            <i className="icon">+</i> Add<i className="icon"></i>
          </button>
          <div className="dropdown-content">
            <a href="#" onClick={handleAddModule}>Create module</a>
            <div style = {{
              display:"flex",
              alignItems:"center"
            }}>
              <HiUpload style = {{
                marginLeft:"8px"
              }}/>
            <a href="#" onClick={handleUploadClick}>Upload PDF</a>
            </div>
            <div style = {{
              display:"flex",
              alignItems:"center"
            }}>
              <FaLink style = {{
                marginLeft:"8px"
              }}/>
            <a href="#" onClick={handleAddLink}>Add link</a>
            </div>
          </div>
        </div>
      </div>

      {loading && modules.length === 0 && uploads.length === 0 ? (
        <div className="content">
          <img src="./screenshot.png" alt="Box with items" />
          <p>Nothing added here yet</p>
          <span>Click on the [+] Add button to add items to this course</span>
        </div>
      ) : (
        <div className="modules">
          {modules.map((module, index) => (
            <div className="module-item" key={index}>
              <div>
              <IoMdArrowDropdown />
              <span className="module-name" style={{marginLeft: '10px'}}>{module.name}</span>
              </div>
              <div className="actions">
                <button className="dots" onClick={() => toggleDropdown(index)}>
                <BsThreeDotsVertical/>
                </button>
                {activeDropdown === index && (
                  <div className="dropdown-menu">
                    <div style={{display: 'flex'}}>
                    <CiEdit style={{marginTop: '7px', marginLeft: '5px'}}/>
                    <button onClick={() => handleEditModule(index)}>Edit</button>
                    </div>
                    <div style={{display: 'flex'}}>
                    <MdDelete style={{marginTop: '7px', marginLeft: '5px'}} />
                    <button onClick={() => handleDeleteModule(index)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {uploads.map((upload, index) => (
            <div className="module-item" key={index}>
              <div>
              <img src='./icons8-pdf-40.png' alt='logo'/>
              <span className="module-name">{upload.name}</span>
              </div>
              <div className="actions">
                <button className="dots" onClick={() => toggleDropdown(index + modules.length)}><BsThreeDotsVertical/></button>
                {activeDropdown === index + modules.length && (
                  <div className="dropdown-menu">
                    <div style={{display: 'flex'}}>
                    <MdDriveFileRenameOutline style={{marginTop: '7px', marginLeft: '5px'}} />
                    <button onClick={() => handleRenameUpload(index)}>Rename</button>
                    </div>
                    <div style={{display: 'flex'}}>
                    <RiDownloadLine style={{marginTop: '7px', marginLeft: '5px'}}/>
                    <button onClick={() => handleDownload(upload.file)}>Download</button>
                    </div>
                    <div style={{display: 'flex'}}>
                    <MdDelete style={{marginTop: '7px', marginLeft: '5px'}}/>
                    <button onClick={() => handleDeleteUpload(index)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {links.map((link, index) => (
            <div className="module-item" key={index}>
              <div>
              <FaLink />
              <span className="module-name">
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
              </span>
              </div>
              <div className="actions">
                <button className="dots" onClick={() => toggleDropdown(index + modules.length + uploads.length)}><BsThreeDotsVertical/></button>
                {activeDropdown === index + modules.length + uploads.length && (
                  <div className="dropdown-menu">
                    <div style={{display: 'flex'}}>
                    <CiEdit style={{marginTop: '7px', marginLeft: '5px'}}/>
                    <button onClick={() => handleEditLink(index)}>Edit</button>
                    </div>
                    <div style={{display: 'flex'}}>
                    <MdDelete style={{marginTop: '7px', marginLeft: '5px'}} />
                    <button onClick={() => handleDeleteLink(index)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>
                {modalMode === 'create' ? 'Create new module' :
                modalMode === 'edit' ? 'Edit module' :
                modalMode === 'upload' ? 'Upload PDF' :
                modalMode === 'rename' ? 'Rename PDF' :
                'Add/Edit Link'}
              </h2>
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            </div>
            {modalMode === 'upload' ? (
              <>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <div className="modal-actions">
                  <button onClick={handleUploadFile}>Upload</button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </>
            ) : modalMode === 'addLink' ? (
              <>
                <input
                  type="text"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  placeholder="Link name"
                />
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Link URL"
                />
                <div className="modal-actions">
                  <button onClick={handleSaveModule}>
                    {editIndex === null ? 'Save Changes' : 'Add'}
                  </button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  placeholder="Module name"
                />
                <div className="modal-actions">
                  <button onClick={handleSaveModule}>
                    {modalMode === 'create' ? 'Create' : 'Save changes'}
                  </button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
