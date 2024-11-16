import { Stack, TextField, Typography, Button, Grid, FormControl, Radio, Paper, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { Cart } from '../../cart/components/Cart';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressAsync, selectAddressStatus, selectAddresses } from '../../address/AddressSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { createOrderAsync, selectCurrentOrder, selectOrderStatus } from '../../order/OrderSlice';
import { resetCartByUserIdAsync, selectCartItems } from '../../cart/CartSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SHIPPING, TAXES } from '../../../constants';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QBxopCdTGo2U9CybFJWOZaoz4gpL661TKLvA6l1PhvNcBwUnbP1aNb2L8LMA5AvyUoCPCkjCXAi7EBXPDLBi66j008Ar0JlMj');

export const Checkout = () => {
    const addresses = useSelector(selectAddresses);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0] || null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const addressStatus = useSelector(selectAddressStatus);
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const orderStatus = useSelector(selectOrderStatus);
    const currentOrder = useSelector(selectCurrentOrder);
    const orderTotal = cartItems.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0);
    const theme = useTheme();
    const is900 = useMediaQuery(theme.breakpoints.down(900));
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    useEffect(() => {
        if (addressStatus === 'fulfilled') {
            reset();
        } else if (addressStatus === 'rejected') {
            alert('Error adding your address');
        }
    }, [addressStatus]);

    useEffect(() => {
        if (currentOrder && currentOrder._id) {
            dispatch(resetCartByUserIdAsync(loggedInUser._id));
            navigate(`/order-success/${currentOrder._id}`);
        }
    }, [currentOrder, dispatch, loggedInUser, navigate]);

    const handleAddAddress = (data) => {
        const address = { ...data, user: loggedInUser._id };
        dispatch(addAddressAsync(address));
    };

    const handleCreateOrder = () => {
        const order = {
            user: loggedInUser._id,
            items: cartItems,
            address: selectedAddress,
            paymentMode: selectedPaymentMethod,
            total: orderTotal + SHIPPING + TAXES
        };
        dispatch(createOrderAsync(order));
    };

    const makePayment = async () => {
        const stripe = await stripePromise;
        console.log('Creating payment session...');

        const body = { products: cartItems };
        const headers = { "Content-Type": "application/json" };

        try {
            const response = await fetch("http://localhost:8000/api/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            const session = await response.json();

            if (stripe && session?.id) {
                await stripe.redirectToCheckout({ sessionId: session.id });
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    const handleOrderSubmission = () => {
        if (selectedPaymentMethod === 'CARD') {
            makePayment(); // Redirect to Stripe checkout only if 'CARD' is selected
        } else {
            handleCreateOrder(); // Handle order directly if 'COD' is selected
        }
    };

    return (
        <Stack flexDirection={'row'} p={2} rowGap={10} justifyContent={'center'} flexWrap={'wrap'} mb={'5rem'} mt={2} columnGap={4} alignItems={'flex-start'}>
            {/* Left box */}
            <Stack rowGap={4}>
                {/* Heading */}
                <Stack flexDirection={'row'} columnGap={is480 ? 0.3 : 1} alignItems={'center'}>
                    <IconButton component={Link} to={"/cart"}><ArrowBackIcon fontSize={is480 ? "medium" : 'large'} /></IconButton>
                    <Typography variant='h4'>Shipping Information</Typography>
                </Stack>

                {/* Address form */}
                <Stack component={'form'} noValidate rowGap={2} onSubmit={handleSubmit(handleAddAddress)}>
                    {/* Address fields */}
                    <TextField label="Type" placeholder='Eg. Home, Business' {...register("type", { required: true })} />
                    <TextField label="Street" {...register("street", { required: true })} />
                    <TextField label="Country" {...register("country", { required: true })} />
                    <TextField label="Phone Number" type='number' {...register("phoneNumber", { required: true })} />
                    <Stack flexDirection={'row'}>
                        <TextField label="City" {...register("city", { required: true })} />
                        <TextField label="State" {...register("state", { required: true })} />
                        <TextField label="Postal Code" type='number' {...register("postalCode", { required: true })} />
                    </Stack>
                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={1}>
                        <LoadingButton loading={addressStatus === 'pending'} type='submit' variant='contained'>Add</LoadingButton>
                        <Button color='error' variant='outlined' onClick={() => reset()}>Reset</Button>
                    </Stack>
                </Stack>

                {/* Existing address */}
                <Typography variant='h6'>Address</Typography>
                <Typography variant='body2' color={'text.secondary'}>Choose from existing Addresses</Typography>
                <Grid container gap={2} width={is900 ? "auto" : '50rem'}>
                    {addresses.map((address, index) => (
                        <FormControl key={address._id}>
                            <Paper elevation={1} sx={{ padding: 2 }}>
                                <Radio checked={selectedAddress === address} onChange={() => setSelectedAddress(address)} />
                                <Typography>{address.type}</Typography>
                                <Typography>{address.street}</Typography>
                                <Typography>{address.state}, {address.city}, {address.country}, {address.postalCode}</Typography>
                                <Typography>{address.phoneNumber}</Typography>
                            </Paper>
                        </FormControl>
                    ))}
                </Grid>

                {/* Payment methods */}
                <Typography variant='h6'>Payment Methods</Typography>
                <Typography variant='body2' color={'text.secondary'}>Please select a payment method</Typography>
                <Stack>
                    <Radio checked={selectedPaymentMethod === 'COD'} onChange={() => setSelectedPaymentMethod('COD')} />
                    <Typography>Cash</Typography>
                    <Radio checked={selectedPaymentMethod === 'CARD'} onChange={() => setSelectedPaymentMethod('CARD')} />
                    <Typography>Card</Typography>
                </Stack>
            </Stack>

            {/* Right box */}
            <Stack width={is900 ? '100%' : 'auto'} alignItems={is900 ? 'flex-start' : ''}>
                <Typography variant='h4'>Order Summary</Typography>
                <Cart checkout={true} />
                <LoadingButton fullWidth loading={orderStatus === 'pending'} variant='contained' onClick={handleOrderSubmission} size='large'>Pay and Order</LoadingButton>
            </Stack>
        </Stack>
    );
};
