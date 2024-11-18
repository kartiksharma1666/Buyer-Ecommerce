import { Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ecommerceOutlookAnimation, shoppingBagAnimation } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { selectLoggedInUser, loginAsync, selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus } from '../AuthSlice';
import { toast } from 'react-toastify';
import { MotionConfig, motion } from 'framer-motion';

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // State to track if the user has already been redirected to OTP page
  const [redirected, setRedirected] = React.useState(false);

  // handles user redirection
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.isAdmin) {
        navigate("/admin/Home"); // Redirect to AdminHome page
      } else if (loggedInUser.isVerified) {
        navigate("/"); // Redirect to regular user home page
      } else {
        toast.error('Please verify your email to login.');
      }
    }
  }, [loggedInUser, navigate]);

  // handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === 'fullfilled' && loggedInUser?.isVerified === true) {
      toast.success(`Login successful`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(loginAsync(cred));
  };

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{ overflowY: "hidden" }}>
      {
        !is900 &&
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'}>
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      }

      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          <Stack rowGap={'.4rem'}>
            <Typography variant='h2' sx={{ wordBreak: "break-word" }} fontWeight={600}>Budget-Bites</Typography>
            <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop At Discounted Prices</Typography>
          </Stack>
        </Stack>

        <Stack mt={4} spacing={2} width={is480 ? "95vw" : '28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>
          <motion.div whileHover={{ y: -5 }}>
            <TextField fullWidth {...register("email", { required: "Email is required", pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, message: "Enter a valid email" } })} placeholder='Email' />
            {errors.email && <FormHelperText sx={{ mt: 1 }} error>{errors.email.message}</FormHelperText>}
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <TextField type='password' fullWidth {...register("password", { required: "Password is required" })} placeholder='Password' />
            {errors.password && <FormHelperText sx={{ mt: 1 }} error>{errors.password.message}</FormHelperText>}
          </motion.div>

          <motion.div whileHover={{ scale: 1.020 }} whileTap={{ scale: 1 }}>
            <LoadingButton fullWidth sx={{ height: '2.5rem' }} loading={status === 'pending'} type='submit' variant='contained'>Login</LoadingButton>
          </motion.div>

          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'}>
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.050 }}>
              <motion.div>
                <Typography mr={'1.5rem'} sx={{ textDecoration: "none", color: "text.primary" }} to={'/forgot-password'} component={Link}>Forgot password</Typography>
              </motion.div>

              <motion.div>
                {/* Ensure Link is correctly formatted */}
                <Typography sx={{ textDecoration: "none", color: "text.primary" }} component={Link} to={'/signup'}>
                  Don't have an account? <span style={{ color: theme.palette.primary.dark }}>Register</span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>

          {/* Display button to navigate to verify OTP page if user is not verified */}
          {!loggedInUser?.isVerified && (
            <Button
              component={Link}
              to="/verify-otp"
              variant="outlined"
              sx={{ marginTop: 2, fontSize: '0.875rem', padding: '8px 16px' }}
            >
              Verify OTP
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
