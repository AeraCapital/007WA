import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getChats as getChatsApi,
  getGroups as getGroupsApi,
  getContacts as getContactsApi,
  getMessages as getMessagesApi,
  addMessage as addMessageApi,
} from "../../helpers/fakebackend_helper";

export const getChats = createAsyncThunk("chats/getChats", async () => {
  try {
    const response = getChatsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getGroups = createAsyncThunk("chats/getGroups", async () => {
  try {
    const response = getGroupsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getContacts = createAsyncThunk("chats/getContacts", async () => {
  try {
    const response = getContactsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getMessages = createAsyncThunk("chats/getMessages", async (roomId: any) => {
  try {
    const response = getMessagesApi(roomId);
    return response;
  } catch (error) {
    return error;
  }
});

export const addMessage = createAsyncThunk("chats/addMessage", async (message: any) => {
  try {
    const response = addMessageApi(message);
    return response;
  } catch (error) {
    return error;
  }
});

