import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../app/api';
import { Plan, RazorpayOrder, SubscriptionState } from './types';
import { fetchUserStatus } from '../userDashboard/userDashboardSlice';

/**
 * Thunk to fetch ALL subscription plans.
 * This is used to display all available options to the user on the subscription page.
 */
export const fetchAllPlans = createAsyncThunk<Plan[], void, { rejectValue: string }>(
    'subscription/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // This endpoint should return all plans (Initial, Half-Yearly, Annual).
            const { data } = await api.get<{ plans: Plan[] }>('/user/subscriptions/all-plans');
            return data.plans;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription plans.');
        }
    }
);

/**
 * Thunk to create a Razorpay order before initiating payment.
 * It sends a planId to the backend and expects a Razorpay order object in return.
 */
export const createOrder = createAsyncThunk<RazorpayOrder, string, { rejectValue: string }>(
    'subscription/createOrder',
    async (planId, { rejectWithValue }) => {
        try {
            const { data } = await api.post<RazorpayOrder>('/user/subscriptions/create-order', { planId });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create payment order.');
        }
    }
);

/**
 * Thunk to verify the payment after it's completed on Razorpay's end.
 * It sends the payment details to the backend to confirm and activate the subscription.
 */
export const verifyPayment = createAsyncThunk<
    { success: boolean, message: string },
    { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; planId: string },
    { dispatch: any; rejectValue: string }
>(
    'subscription/verifyPayment',
    async (paymentData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await api.post('/user/subscriptions/verify', paymentData);
            
            // After successful payment, we dispatch fetchUserStatus.
            // This is a crucial step to update the user's dashboard and access rights
            // across the entire application immediately.
            dispatch(fetchUserStatus());
            
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Payment verification failed.');
        }
    }
);

const initialState: SubscriptionState = {
    availablePlans: [],
    isLoading: true,
    error: null,
};

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Cases for fetching all plans
            .addCase(fetchAllPlans.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllPlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
                state.isLoading = false;
                state.availablePlans = action.payload;
            })
            .addCase(fetchAllPlans.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'An unknown error occurred';
            })
            
            // Optional: Cases for createOrder and verifyPayment to handle errors
            .addCase(createOrder.rejected, (state, action) => {
                state.error = action.payload ?? 'Failed to initialize payment.';
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.error = action.payload ?? 'Payment could not be confirmed.';
            });
    },
});

export default subscriptionSlice.reducer;