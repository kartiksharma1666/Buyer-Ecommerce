import React, { useEffect } from "react";
import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  resendOtpAsync,
  verifyOtpAsync,
  selectLoggedInUser,
  selectOtpVerificationStatus,
  selectOtpVerificationError,
  selectResendOtpStatus,
  selectResendOtpError,
  selectResendOtpSuccessMessage,
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
} from "../AuthSlice";

export const OtpVerfication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);
  const navigateRef = React.useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if user data is missing
  useEffect(() => {
    if (loggedInUser === undefined) return; // Avoid redirect until state is defined
    console.log('loggedInUser is verified?', loggedInUser?.isVerified);
  }, [loggedInUser, navigate]);

  // Resend OTP
  const handleSendOtp = () => {
    dispatch(resendOtpAsync({ user: loggedInUser?._id }));
  };

  // Verify OTP
  const handleVerifyOtp = (data) => {
    dispatch(verifyOtpAsync({ ...data, userId: loggedInUser?._id }));
  };

  // Toast notifications
  useEffect(() => {
    if (resendOtpError) toast.error(resendOtpError.message);
    if (resendOtpSuccessMessage) toast.success(resendOtpSuccessMessage.message);
    if (otpVerificationError) toast.error(otpVerificationError.message);
    if (otpVerificationStatus === "fulfilled") {
      toast.success("Email verified! Redirecting...");
      navigate("/");
    }

    return () => {
      dispatch(clearResendOtpError());
      dispatch(clearResendOtpSuccessMessage());
      dispatch(clearOtpVerificationError());
      dispatch(resetResendOtpStatus());
      dispatch(resetOtpVerificationStatus());
    };
  }, [
    resendOtpError,
    resendOtpSuccessMessage,
    otpVerificationError,
    otpVerificationStatus,
    navigate,
    dispatch,
  ]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", p: 3 }}
    >
      <Paper
        elevation={2}
        sx={{ maxWidth: 400, width: "100%", p: 4, textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Verify Your Email Address
        </Typography>
        {resendOtpStatus === "fulfilled" ? (
          <form onSubmit={handleSubmit(handleVerifyOtp)} noValidate>
            <Typography>
              Enter the 4-digit OTP sent to <strong>{loggedInUser?.email}</strong>
            </Typography>
            <TextField
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Please enter a valid 4-digit OTP",
                },
              })}
              fullWidth
              label="OTP"
              type="number"
              error={!!errors.otp}
              helperText={errors.otp?.message}
              sx={{ mt: 2 }}
            />
            <LoadingButton
              loading={otpVerificationStatus === "pending"}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Verify OTP
            </LoadingButton>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                console.log("Go Back button clicked");

                // Check if there is enough history to go back
                if (window.history.length > 2) {
                  navigate(-1);  // Go back to the previous page if there's enough history
                } else {
                  navigate("/login");  // Fallback: if there's no history, go to the login page
                }
              }}
            >
              Go Back
            </Button>
          </form>
        ) : (
          <>
            <Typography>
              We will send a verification code to <strong>{loggedInUser?.email}</strong>
            </Typography>
            <LoadingButton
              onClick={handleSendOtp}
              loading={resendOtpStatus === "pending"}
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Send OTP
            </LoadingButton>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                console.log("Go Back button clicked");

                // Check if there is enough history to go back
                if (window.history.length > 2) {
                  navigate(-1);  // Go back to the previous page if there's enough history
                } else {
                  navigate("/login");  // Fallback: if there's no history, go to the login page
                }
              }}
            >
              Go Back
            </Button>
          </>
        )}
      </Paper>
    </Stack>
  );
};
