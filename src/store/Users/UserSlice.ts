import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    email: string;
    mobile: string | null;
    dateOfBirth: string;
    createdAt: number; 
  }

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser(
      state,
      action: PayloadAction<{ userId: string; updatedUserData: Partial<User> }>
    ) {
      const { userId, updatedUserData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...updatedUserData,
        };
      }
    },
    reset(state) {
        state.users = initialState.users;
      },
    searchUsers(state, action) {
      const { searchString } = action.payload;

      state.users = state.users.filter(
        (user: { name: string; email: string }) =>
          user.name.toLowerCase().includes(searchString?.toLowerCase()) ||
          user.email.toLowerCase().includes(searchString?.toLowerCase())
      );
     
    }
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
