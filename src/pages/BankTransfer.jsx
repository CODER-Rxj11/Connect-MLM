import AdminSidebar from "../components/AdminSidebar";
import { Bar, TableBody, Table, TableContainer, TableHeaders, TableHeading, UserTransactionRow, AdminTransactionRow, Transfer } from "../components";
import Select, { components } from "react-select";
import { FaRupeeSign, FaWallet, FaSort } from "react-icons/fa";
import { CUSTOME_STYLES } from "../assets/data/constants";
import { IoIosArrowForward } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { bankTransferHeaders, bankTransferSortOptions } from "../assets/data/owner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransferRequest, getTransferRequestById, getBankDetails } from "../redux/actions/index";

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<FaSort />
		</components.DropdownIndicator>
	);
};

function BankTransfer() {
	const { user } = useSelector((state) => state.user);
	const { transfers, allTransfers } = useSelector((state) => state.transfer);
	const [transferRequests, setTransferRequests] = useState([]);
	const [alltransferRequests, setAllTransferRequests] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (transfers) {
			const data = transfers.map((transfer) => {
				return {
					data: [
						transfer.transferId,
						transfer.user.firstName + " " + transfer.user.lastName,
						transfer.amount,
						new Date(transfer.createdAt).toLocaleDateString(),
					],
					status: transfer.status,
				};
			});
			setTransferRequests(data);
		}
	}, [transfers]);

	useEffect(() => {
		if (allTransfers) {
			const data = allTransfers.map((transfer) => {
				return {
					data: [
						transfer.transferId,
						transfer.user.firstName + " " + transfer.user.lastName,
						transfer.amount,
						new Date(transfer.createdAt).toLocaleDateString(),
					],
					status: transfer.status,
					_id: transfer._id,
				};
			});
			setAllTransferRequests(data);
		}
	}, [allTransfers]);

	useEffect(() => {
		if (user) {
			dispatch(getBankDetails(user._id));
			dispatch(getTransferRequestById());
			dispatch(getAllTransferRequest());
		}
	}, [user]);

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="bankTransfer">
				<Bar heading="Transfer" />
				<div className="cardWidget">
					<CardWidget heading="Total Balance" value={user?.balance} Icon={FaRupeeSign} Action={IoIosArrowForward} />
					<CardWidget heading="Deposits" value={0} Icon={FaRupeeSign} Action={IoIosArrowForward} />
					<CardWidget style={{ backgroundColor: "#003D79" }} heading="Transfer Amount" Icon={RiBankFill} Action={IoIosArrowForward} />
				</div>


				{user?.role === "user" ? (
					<div className="wallet-pin-container">
						<section className="my-wallet">
							<div className="wallet-header">
								<FaWallet />
								<h1>My Wallet</h1>
								<BsThreeDots />
							</div>
							<div className="wallet-amount">
								<h1> ₹ {user?.balance}</h1>
							</div>

							<div className="wallet-buttons">
								<button className="btn btn-primary">Withdrawal</button>
								<button className="btn btn-primary" style={{ backgroundColor: "#003D79", margin: "0.5rem" }}>
									Transfer
								</button>
							</div>
						</section>
						<div className="top_performer">
							<div className="heading">Withdrawal Request</div>
							<div className="table-performer">
								
							</div>
						</div>
					</div>
				) : null}


				{user?.role === "user" ? <Transfer /> : null}

				{user?.role === "user" && (
					<TableContainer>
						<TableHeading>
							<p>Transaction Details</p>
							<Select
								defaultValue={bankTransferSortOptions[0]}
								options={bankTransferSortOptions}
								components={{ DropdownIndicator }}
								styles={CUSTOME_STYLES}
							/>
						</TableHeading>
						<Table>
							<TableHeaders
								style={{
									gridTemplateColumns: `repeat(${bankTransferHeaders.length},1fr)`,
								}}
								headers={bankTransferHeaders}
							/>
							<TableBody TableRow={UserTransactionRow} data={transferRequests} />
						</Table>
					</TableContainer>
				)}
				{user?.role === "admin" ? (
					<TableContainer>
						<TableHeading>
							<p>Transaction Details</p>
							<Select
								defaultValue={bankTransferSortOptions[0]}
								options={bankTransferSortOptions}
								components={{ DropdownIndicator }}
								styles={CUSTOME_STYLES}
							/>
						</TableHeading>
						<Table>
							<TableHeaders
								style={{
									gridTemplateColumns: `repeat(${bankTransferHeaders.length},1fr)`,
								}}
								headers={bankTransferHeaders}
							/>
							<TableBody TableRow={AdminTransactionRow} data={alltransferRequests} />
						</Table>
					</TableContainer>
				) : null}
			</main>
		</div>
	);
}

export default BankTransfer;

export const CardWidget = ({ heading, Icon, value, style }) => {
	return (
		<article className="pinCard" style={style}>
			<Icon />
			<div>
				<h3>{heading}</h3>
				{value && <p>{value}</p>}
			</div>
		</article>
	);
};
