// features/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modules: [1, 2, 3], // Assuming these are IDs or simple values
  pdfs: [],
  links: [],

  addmodulopen:false,
  addlinkopen:false,
  addpdfopen:false,

};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modules.push(action.payload);
    },
    addPdf: (state, action) => {
      state.pdfs.push(action.payload);
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    editModule: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.modules.findIndex(module => module.id === id);
      if (index !== -1) {
        state.modules[index] = { ...state.modules[index], ...newData };
      }
    },
    editPdf: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.pdfs.findIndex(pdf => pdf.id === id);
      if (index !== -1) {
        state.pdfs[index] = { ...state.pdfs[index], ...newData };
      }
    },
    editLink: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.links.findIndex(link => link.id === id);
      if (index !== -1) {
        state.links[index] = { ...state.links[index], ...newData };
      }
    },
    removeModule: (state, action) => {
      const id = action.payload;
      state.modules = state.modules.filter(module => module.id !== id);
    },
    removePdf: (state, action) => {
      const id = action.payload;
      state.pdfs = state.pdfs.filter(pdf => pdf.id !== id);
    },
    removeLink: (state, action) => {
      const id = action.payload;
      state.links = state.links.filter(link => link.id !== id);
    },

    closeaddmodulemodal:(state,action)=>{

      state.addmodulopen=!state.addmodulopen
    },
    closeaddlinkmodal:(state,action)=>{

      state.addlinkopen=!state.addlinkopen
    },
    closeaddpdfmodal:(state,action)=>{

      state.addpdfopen=!state.addpdfopen
    }
  },
});

export const { 
  addModule, 
  addPdf, 
  addLink, 
  editModule, 
  editPdf, 
  editLink, 
  removeModule, 
  removePdf, 
  removeLink ,
  closeaddmodulemodal,
  closeaddlinkmodal,
  closeaddpdfmodal

} = dataSlice.actions;

export default dataSlice.reducer;
