import { createSlice } from "@reduxjs/toolkit";

import { getChats ,getGroups,getContacts,getMessages,addMessage} from "./thunk";

export const initialState = {
    chats: [],
    groups : [],
    contacts:[],
    messages:[],
    error: {}
};

const ChatsSlice = createSlice({
    name: 'ChatsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChats.fulfilled, (state: any, action: any) => {
            state.chats = action.payload;
        });
        builder.addCase(getChats.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        
        builder.addCase(getGroups.fulfilled, (state: any, action: any) => {
            state.groups = action.payload;
        });
        builder.addCase(getGroups.rejected, (state: any, action: any) => {
            state.groups = action.payload.error || null;
        });

        builder.addCase(getContacts.fulfilled, (state: any, action: any) => {
            state.contacts = action.payload;
        });
        builder.addCase(getContacts.rejected, (state: any, action: any) => {
            state.contacts = action.payload.error || null;
        });

        builder.addCase(getMessages.fulfilled, (state: any, action: any) => {
            state.messages = action.payload;
        });
        builder.addCase(getMessages.rejected, (state: any, action: any) => {
            state.messages = action.payload.error || null;
        });

        builder.addCase(addMessage.fulfilled, (state: any, action: any) => {
            state.messages.push(action.payload);

        });
        builder.addCase(addMessage.rejected, (state: any, action: any) => {
            state.messages = action.payload.error || null;
        });
    }
})

export default ChatsSlice.reducer;