import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */

export const TableContainer = ({ className = "tableContainers", children }) => {
	return <section className={`tableContainers ${className}`}>{children}</section>;
};

export const Table = ({ children }) => {
	return <div className="Table">{children}</div>;
};

// !-- Table Heading
export const TableHeading = ({ children, className = "tableHeading" }) => {
	return <div className={className}>{children}</div>;
};

// ?-- Table Heading
export const TableHeaders = ({ style, headers }) => {
	return (
		<div className="headers" style={style}>
			{headers?.map((header, index) => {
				return <h3 key={index}>{header}</h3>;
			})}
		</div>
	);
};

export const EpinRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/epin/123`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button className={rowdata.status === "Successful" ? "green" : "red"}>{rowdata.status}</button>
		</Link>
	);
};

export const UserTransactionRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button className={rowdata.status === "pending" ? "red" : rowdata.status === "accepted" ? "green" : "purple"}>{rowdata.status}</button>
		</div>
	);
};

export const AdminTransactionRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/transfer/accept/${rowdata._id}`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button className={rowdata.status === "pending" ? "red" : rowdata.status === "accepted" ? "green" : "purple"}>{rowdata.status}</button>
		</Link>
	);
};

export const ongoingEventRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/epin/123`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
		</Link>
	);
};

export const ProgramRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button className={rowdata.status === "Approved" ? "green" : "red"}>{rowdata.status}</button>
		</div>
	);
};

export const Program2Row = ({ rowdata, className = "tableContents" }) => {
	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			{rowdata.status}
		</div>
	);
};

// kyc Row
export const KYCRow = ({ onClick, rowdata, className = "tableContents" }) => {
	return (
		<div onClick={() => onClick(rowdata)} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button className={rowdata.status === "Approved" ? "green" : "red"}>{rowdata.status}</button>
		</div>
	);
};

// !-- Table Body
export const TableBody = ({ data, children, TableRow, isSingleData = false, onClick }) => {
	return (
		<div className="tableContentBody">
			{!isSingleData &&
				data?.map((row) => {
					return <TableRow onClick={onClick} key={row._id} rowdata={row} />;
				})}
			{isSingleData && <TableRow onClick={onClick} rowdata={data} />}
			{children}
		</div>
	);
};

// !-- Table Footer

export const TableFooter = ({ children, footerClass = "billTotal" }) => {
	return <div className={`${footerClass} tableContents`}>{children}</div>;
};

// !-- Dashboard Row
export const DashboardRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={data}>{data}</h3>;
			})}

			{rowdata?.status && (
				<button
					className={
						rowdata.status === "Ongoing" ? "tableBtn greenbg" : rowdata.status === "Not Archieve" ? "tableBtn redbg" : "tableBtn yellowbg"
					}
				>
					{rowdata.status}
				</button>
			)}
		</div>
	);
};

// !! levelsrow
export const LevelRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/trip/${rowdata._id}`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={data}>{data}</h3>;
			})}

			{rowdata?.status && (
				<button
					className={
						rowdata.status === "Ongoing" ? "tableBtn greenbg" : rowdata.status === "Not Archieve" ? "tableBtn redbg" : "tableBtn yellowbg"
					}
				>
					{rowdata.status}
				</button>
			)}
		</Link>
	);
};

export const DriverDetailsRow = ({ rowdata, className }) => {
	return (
		<Link to={`/trip/${rowdata._id}`} className={`tableContents ${className}`} style={{ gridTemplateColumns: `repeat(${5},1fr)` }}>
			<h3>{rowdata.name}</h3>
			<h3>{rowdata.carno}</h3>
			<h3>{rowdata.cartype}</h3>
			<h3>{rowdata.tripDetails}</h3>
			<button
				className={
					rowdata.status === "ongoing" ? "tableBtn purplebg" : rowdata.status === "completed" ? "tableBtn greenbg" : "tableBtn purplebg"
				}
			>
				{rowdata.status}
			</button>
		</Link>
	);
};

// ?-- Driver Row

export const DriverRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/profile/driver/${rowdata.driver_id}`} className={className} style={{ gridTemplateColumns: `repeat(${2},1fr)` }}>
			{<h3>{rowdata.driverName}</h3>}
			<button
				className={rowdata.status === "On Trip" ? "tableBtn purplebg" : rowdata.status === "On Leave" ? "tableBtn redbg" : "tableBtn greenbg"}
			>
				{rowdata.status}
			</button>
		</Link>
	);
};

//  ?-- owner profile row

export const OwnerRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/profile/owner/${rowdata._id}`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			{rowdata?.status && (
				<button
					className={
						rowdata.status === "ongoing" ? "tableBtn purplebg" : rowdata.status === "Pending" ? "tableBtn redbg" : "tableBtn greenbg"
					}
				>
					{rowdata.status}
				</button>
			)}
		</Link>
	);
};

export const RequestRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/profile/owner/${rowdata._id}`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			{rowdata?.status && (
				<button
					className={
						rowdata.status === "ongoing" ? "tableBtn purplebg" : rowdata.status === "notapproved" ? "tableBtn redbg" : "tableBtn greenbg"
					}
				>
					{rowdata.status}
				</button>
			)}
		</Link>
	);
};
//  ?-- Invoice row

export const InvoiceRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<div className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length + 1},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
			<button
				className={rowdata.status === "unpaid" ? "tableBtn purplebg" : rowdata.status === "pending" ? "tableBtn redbg" : "tableBtn greenbg"}
			>
				{rowdata.status}
			</button>
		</div>
	);
};

// ?-- Bill List Row

export const BillListRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/billings/${rowdata._id}`} className={className} style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }}>
			{rowdata.data.map((data) => {
				return <h3 key={rowdata._id}>{data}</h3>;
			})}
		</Link>
	);
};

// ?-- Bill Details Row

export const BillDetailsRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<div style={{ gridTemplateColumns: `1fr 4fr 1fr 1fr 1fr 1fr` }} className={className}>
			{rowdata.data.map((data) => {
				return (
					<h3 style={{ textWrap: "balance", textAlign: "left" }} key={rowdata._id}>
						{data}
					</h3>
				);
			})}
		</div>
	);
};

// ?-- Default Row
export const CarRow = ({ rowdata, className = "tableContents" }) => {
	return (
		<Link to={`/cars/${rowdata._id}`} style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }} className={className}>
			{rowdata.data.map((data) => {
				return (
					<h3 style={{ textWrap: "balance", textAlign: "left" }} key={rowdata._id}>
						{data}
					</h3>
				);
			})}
		</Link>
	);
};
export const RowDefault = ({ rowdata, className = "tableContents" }) => {
	return (
		<div style={{ gridTemplateColumns: `repeat(${rowdata.data.length},1fr)` }} className={className}>
			{rowdata.data.map((data) => {
				return (
					<h3 style={{ textWrap: "balance", textAlign: "left" }} key={rowdata._id}>
						{data}
					</h3>
				);
			})}
		</div>
	);
};

export default function TableHOC() {
	return <div>TableHOC</div>;
}
