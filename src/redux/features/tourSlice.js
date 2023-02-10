import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Create createTour Action
export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTourAPI(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create GetTour Action
export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTourAPI(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetching a single Tour
export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getOneTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetching tour for specific User
export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getTourByUserAPI(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete Tour
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTourAPI(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update Tour
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTourAPI(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Search Tour
export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearchAPI(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Search Tour
export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagToursAPI(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedToursAPI(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Like Tour
export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTourAPI(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",

  initialState: {
    tour: {},
    tours: [],
    tagTours: [],
    userTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Create Tour
    builder.addCase(createTour.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createTour.fulfilled, (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    });

    builder.addCase(createTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Get all Tours
    builder.addCase(getTours.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTours.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    });

    builder.addCase(getTours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Get a Single Tour
    builder.addCase(getTour.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTour.fulfilled, (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    });

    builder.addCase(getTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    //Tour for a Specific user
    builder.addCase(getToursByUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getToursByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    });

    builder.addCase(getToursByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    //Update Tour
    builder.addCase(updateTour.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTour.fulfilled, (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    });

    builder.addCase(updateTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    //Delete Tour
    builder.addCase(deleteTour.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.loading = false;

      const { id } = action.meta.arg;
      // console.log(id);
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    });

    builder.addCase(deleteTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Search Tours
    builder.addCase(searchTours.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(searchTours.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    });

    builder.addCase(searchTours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Tag Tours
    builder.addCase(getToursByTag.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getToursByTag.fulfilled, (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    });

    builder.addCase(getToursByTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Related Tours
    builder.addCase(getRelatedTours.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getRelatedTours.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    });

    builder.addCase(getRelatedTours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    //Like Tour
    builder.addCase(likeTour.pending, (state) => {});

    builder.addCase(likeTour.fulfilled, (state, action) => {
      state.loading = false;
      const { _id } = action.meta.arg;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    });

    builder.addCase(likeTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default tourSlice.reducer;
export const { setCurrentPage } = tourSlice.actions;
