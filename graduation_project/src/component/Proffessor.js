import React, { useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

function Proffessor() {
	const columns = [
		{
			name: "Professor Name",
			selector: (row) => row.name,
		},
		{
			name: "Email",
			selector: (row) => row.email,
		},
		{
			name: "Phone Number",
			selector: (row) => row.phoneNumber,
		},
		{
			name: "Professor Rate",
			selector: (row) => row.rate,
		},
		{
			name: "",
			cell: (row) => (
				<EditIcon
					style={editSectionStyle}
					// onClick={() => handleEdit(row.id)}
				/>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
		{
			name: "",
			cell: (row) => (
				<CancelIcon
					style={{ ...editSectionStyle, ...red }}
					onClick={() => handleDelete(row.id)}
				/>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const data = [
		{
			id: 1,
			name: "Hamza Yisri",
			email: "Hamza.Yisri@example.com",
			phoneNumber: "01256543256",
			rate: "0",
		},
	];

	const customStyles = {
		headRow: {
			style: {
				minHeight: "30px",
			},
		},

		rows: {
			style: {
				minHeight: "30px",
				// override the row height
			},
		},
		headCells: {
			style: {
				paddingLeft: "8px", // override the cell padding for head cells
				paddingRight: "8px",
				backgroundColor: "#063443",
				color: "#FFF",
				height: "30px",
			},
		},
		cells: {
			style: {
				paddingLeft: "8px", // override the cell padding for data cells
				paddingRight: "8px",
			},
		},
	};

	const [tableData, setTableData] = useState(data);

	const handleDelete = (index) => {
		const newData = [...tableData];
		newData.splice(index, 1);
		setTableData(newData);
	};

	const conditionalRowStyles = [
		{
			when: (row) => true,
			style: {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
		{
			when: (row) => true,
			style: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
		},
	];
	return (
		<Container>
			<Table>
				<div className="subjects">
					<div className="headers">
						<h1>Professors</h1>
						<button>Add</button>
					</div>
					<div>
						<DataTable
							//
							columns={[...columns]}
							data={data}
							customStyles={customStyles}
							pagination
							dense
							conditionalRowStyles={conditionalRowStyles}
						/>
					</div>
				</div>
			</Table>
		</Container>
	);
}

export default Proffessor;

const Container = styled.section`
	width: 85%;
	margin-left: 15%;
	padding-top: 8%;
	background-color: #cddee4;
	min-height: 100vh;
`;

const Table = styled.div`
	width: 100%;
	padding: 0 6%;
	height: 100%;

	.subjects {
		width: 100%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 900px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20px;
		padding: 10px;

		.headers {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 5px;

			button {
				padding: 2px 10px;
				background-color: #063443;
				color: #fff;
				border-radius: 10px;
			}
		}
	}
`;

const editSectionStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	cursor: "pointer",
};

const red = {
	backgroundColor: "#F7433A",
};
