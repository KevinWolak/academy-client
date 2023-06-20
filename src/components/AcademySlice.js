import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const createUser = createAsyncThunk(
  "academy/createUser",
  async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/user", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const login = createAsyncThunk("academy/login", async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/signin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getAuth = createAsyncThunk("academy/getAuth", async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/getAuth");
    return response.data.user;
  } catch (error) {
    throw error;
  }
});

export const classList = createAsyncThunk("academy/classList", async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "token"
  )}`;
  try {
    const response = await axios.get("http://localhost:3000/api/user");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchUserData = createAsyncThunk(
  "academy/fetchUserData",
  async (userId, { dispatch }) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}`
      );
      const user = response.data.data;
      console.log("UserOne", user);
      dispatch(setUserData(user));
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchUserAnswers = createAsyncThunk(
  "academy/fetchUserAnswers",
  async (userId, { dispatch }) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/userAnswers/${userId}`
      );
      const userAnswers = response.data.data;
      console.log("UserTwo", userAnswers);
      dispatch(setUserAnswers(userAnswers));
      return userAnswers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchAssessmentData = createAsyncThunk(
  "academy/fetchAssessmentData",
  async (assessmentId, { rejectWithValue }) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
        "token"
      )}`;
      const response = await axios.get(
        `http://localhost:3000/api/assessment/${assessmentId}`
      );
      const assessment = response.data.data;
      if (assessment) {
        return assessment;
      } else {
        console.log(`Assessment with ID ${assessmentId} not found.`);
        return rejectWithValue("Assessment not found.");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const submitQuestionAnswers = createAsyncThunk(
  "assessment/submitQuestionAnswers",
  async ({ answers, selectedUserId }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/question/answers",
        {
          answers,
          selectedUserId,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAssessment = createAsyncThunk(
  "assignment/deleteAssessment",
  async (assessmentId, { rejectWithValue }) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/assessment/${assessmentId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAssessments = createAsyncThunk(
  "assignment/fetchAssessments",
  async (_, { rejectWithValue }) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
        "token"
      )}`;
      const response = await axios.get("http://localhost:3000/api/assessment");
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postAssessment = createAsyncThunk(
  "assessment/postAssessment",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/assessment",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  users: [],
  userData: null,
  userAnswers: null,
  isLoading: false,
  error: null,
};

const academySlice = createSlice({
  name: "martinAcademy",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserAnswers: (state, action) => {
      state.userAnswers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(classList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(classList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Update the 'users' state with the fetched data
      })
      .addCase(classList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAssessmentData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAssessmentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Update the 'users' state with the fetched data
      })
      .addCase(fetchAssessmentData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(submitQuestionAnswers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuestionAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Update the 'users' state with the fetched data
      })
      .addCase(submitQuestionAnswers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Update the 'users' state with the fetched data
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        // Handle the successful response here if needed
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAssessment.fulfilled, (state) => {
        state.isLoading = false;
        // Handle the successful response here if needed
      })
      .addCase(postAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserData, setUserAnswers } = academySlice.actions;
export default academySlice.reducer;
