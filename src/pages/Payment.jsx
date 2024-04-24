/* eslint-disable react/prop-types */
import useRazorpay from "react-razorpay";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addReferral } from "../redux/actions";
import { loadUser } from "../redux/actions";

const Payment = () => {
	const [Razorpay] = useRazorpay();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, referralCode } = useSelector((state) => state.user);

	const [plan, setPlan] = useState("personal");

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const paymentHandler = async () => {
		const orderData = {
			amount: 580 * 100, // Amount in paise (100 paise = 1 INR)
			currency: "INR",
			receipt: "upgrade_order_receipt_1",
		};
		try {
			const token = Cookies.get("token"); // Get the token from the cookie
			// eslint-disable-next-line no-unused-vars
			const config = {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the Authorization header
				},
			};
			const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/rz/create-order`, orderData, config);

			const { order_id, razorpay_key } = response.data;

			const options = {
				key: razorpay_key, // Your Razorpay Key ID
				amount: orderData.amount,
				currency: orderData.currency,
				name: "Ganpati Balaji Trust",
				description: "Registration",
				order_id: order_id,
				handler: async function (response) {
					// Handle the success callback from Razorpay
					const paymentData = {
						order_id: order_id,
						payment_id: response.razorpay_payment_id,
					};
					// Send the payment data to your server for verification and processing
					const token = Cookies.get("token"); // Get the token from the cookie
					// eslint-disable-next-line no-unused-vars
					const config = {
						headers: {
							Authorization: `Bearer ${token}`, // Include the token in the Authorization header
						},
					};
					await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/rz/payment-verify`, paymentData, config);
					setPlan("premium");
					axios
						.post(
							`${import.meta.env.VITE_API_ENDPOINT}/update-plan`,
							{
								plan: "premium",
							},
							config
						)
						.then((res) => {
							// console.log(res);
							toast.success("payment done");
							dispatch(addReferral(referralCode));
							navigate("/dashboard");
						});
					// Display a success message to the user
				},
				prefill: {
					name: user.firstName,
					email: user.email,
				},
				notes: {
					plan: "Upgraded Plan", // Add any additional information as needed
				},
				theme: {
					color: "#F37254", // Customize the color as needed
				},
			};
			const rzp = new Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Error creating Razorpay order:", error);
			toast.error("payment not done done");
		}
	};

	return (
		<section className="payment">
			<h1>Welcome to GBT Family!!</h1>
			<h2>To start your GBT journey kindly payment through the given link below .</h2>
			<button onClick={paymentHandler} className="submitBtn" type="submit">
				Pay ₹ 580 Now
			</button>
		</section>
	);
};

export default Payment;
