// counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/AxiosInstance";
import { findMatch as findMatchStructure } from "../../services/gameService";
import SessionStorageService, { StorageKeys } from "../../services/sessionStorageService";

const sessionService = new SessionStorageService();

export const findMatch = createAsyncThunk('main/findMatch', async (userName: string) => {
  try {
      const response = await findMatchStructure(userName);
      return response;
  } catch (error) {
      console.log(error)
  }
});

export const getMatchById = createAsyncThunk('main/getMatchById', async ({ matchId, ownerId }: { matchId: string; ownerId: string }) => {
  try {
      const response = await http.get(`/match/${matchId}/${ownerId}`);
      return response.data?.data;
  } catch (error) {
      console.log(error);
  }
});

const mainSlice = createSlice({
  name: "main",
  initialState: { match: null, matchId: '', ownerId: '', loader: false, userActions: null },
  reducers: {
    setUserActions: (state, action) => {
      state.userActions = action.payload;
    },

    setMatch: (state, action) => {
      state.match = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(findMatch.fulfilled, (state, action) => {
        state.loader = false;
        if(action.payload) {
          state.matchId = action.payload;
          sessionService.setItem(StorageKeys.MATCH_ID, action.payload);
        }
      })
      .addCase(findMatch.pending, (state) => {
        state.loader = true;
      })

      .addCase(getMatchById.fulfilled, (state, action) => {
        if(action.payload) {
          const match = action.payload;
          let flag = true;
          match.panels.map((panel) => {
            panel.active = flag;
            flag = !flag;
            return panel;
          });
          state.match = match;
        }
      }
    )
      
      
  }, 
});


export const selectMatch = (state) => state.main.match;
export const selectMatchId = (state) => state.main.matchId;
export const selectLoader = (state) => state.main.loader;
export const selectUserActions = (state) => state.main?.userActions;


export const { setUserActions, setMatch } = mainSlice.actions;
export default mainSlice.reducer;
