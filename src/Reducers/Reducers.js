import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  price: '',
  content: '',
  selectedId: null,
  list: [],
  error: null,
  loading: false
}

export const toolkitSlice = createSlice({
  name: 'myState',

  initialState,

  reducers: {
    fetchServicesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess(state, action) {
      const list = action.payload;
      return state = {...state, list, loading: false, error: null}
    },
    fetchServicesError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchServiceRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchServiceSuccess(state, action) {
      if (action.payload === null) return state;
      const { name, price, content } = action.payload;
      return state = {...state, name, price, content, loading: false, error: null}
    },
    setSelectedId(state, action) {
      const selectedId = action.payload;
      state.selectedId = selectedId;
    },
    clearSelectedId(state) {
      state.name = state.price = state.content = ''
      state.selectedId = null
    }
  }
})


export default toolkitSlice.reducer;
export const { setSelectedId, fetchServicesRequest, fetchServiceSuccess, fetchServicesSuccess, fetchServicesError, fetchServiceRequest, clearSelectedId } = toolkitSlice.actions;