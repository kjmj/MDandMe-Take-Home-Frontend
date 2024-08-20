import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipients = createAsyncThunk('recipients/getRecipients', async () => {
    try {
        const getRecipients = await axios.get('/recipients');
        const res = await getRecipients.data;
        if (getRecipients.status === 200) {
            return res;
        } else {
            return res.error;
        }
    } catch (e) {
        return e.error;
    }
});

export const postRecipient = createAsyncThunk('recipients/postRecipient', async (recipient) => {
    const newRecipient = await axios.post('/recipients', recipient);
    const res = await newRecipient.data;
    return res;
});

export const recipientsSlice = createSlice({
    name: "recipients",
    initialState: {
        recipients: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
    },
    extraReducers: {
        [postRecipient.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.recipient = [...state.recipient, payload]
        },
        [postRecipient.pending]: (state) => {
            state.isFetching = true;
        },
        [postRecipient.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.error;
        },
        [fetchRecipients.fulfilled]: (state, { payload }) => {
            state.recipient = payload;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [fetchRecipients.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.error;
        },
        [fetchRecipients.pending]: (state) => {
            state.isFetching = true;
        },
    },
})