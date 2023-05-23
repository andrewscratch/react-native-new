import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    userEmail: null,
    userId: null,
    avatar: null,
    stateChange: false,
    isLoading: false,
    isLoadAvatarOnServer: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (state, action) => ({
            ...state,
            userId: action.payload.userId,
            userName: action.payload.userName,
            userEmail: action.payload.userEmail,
            avatar: action.payload.avatar,
            stateChange: action.payload.stateChange,
        }),
        logoutUser: () => initialState,
        authStateChange: (state, action) => ({ ...state, stateChange: action.payload.stateChange }),
         updateIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
        updateIsLoadAvatarOnServer: (state, { payload }) => {
      state.isLoadingPhotoToServer = payload;
        },
         updateAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    }
});

export const { updateIsLoadAvatarOnServer } = authSlice.actions;