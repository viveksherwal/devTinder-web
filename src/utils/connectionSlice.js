import { createSlice } from '@reduxjs/toolkit';

const connectionSclice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        removeConnections: (state) => {
            return null;
        }
  },
});

export const { addConnections, removeConnections } = connectionSclice.actions;
export default connectionSclice.reducer;    