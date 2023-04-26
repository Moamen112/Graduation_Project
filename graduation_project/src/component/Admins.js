import React, { useState } from "react";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";

function Admins() {
	const columns = [
		{
			name: "Admin name",
			selector: (row) => row.name,
		},
		{
			name: "Admin UserName",
			selector: (row) => row.userName,
		},
		{
			name: "Hiring Date",
			selector: (row) => row.hiringDate,
		},
	];

	const data = [
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
		},
		{
			id: 1,
			name: "Ahmed Mohsen",
			userName: "hassona",
			hiringDate: "1998",
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

	const deleteButton = (cell, row, rowIndex) => {
		return <CancelIcon onClick={() => handleDelete(rowIndex)} />;
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
						<h1>Admins</h1>
						<AddButton>Add</AddButton>
					</div>
					<div>
						<DataTable
							columns={[...columns, { cell: deleteButton }]}
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

export default Admins;

const Container = styled.section`
	width: 100%;
	padding-top: 8%;
	background-color: #cddee4;
	min-height: 100vh;
`;

const AddButton = styled.button`
	font-size: 10px;
	border: none;
	background-color: #053344;
	color: #fff;
	padding: 25px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;

const Table = styled.div`
	width: 85%;
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
