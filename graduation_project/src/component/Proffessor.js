import React, { useState } from "react";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";

function Proffessor() {
	const columns = [
		{
			name: "Professor name",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Professor Subject",
			selector: (row) => row.year,
			sortable: true,
		},
		{
			name: "Hiring Date",
			selector: (row) => row.Date,
			sortable: true,
		},
		{
			name: "Professor rate",
			selector: (row) => row.rate,
			sortable: true,
		},
	];

	const data = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
		},
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
			rate: "1988",
			Date: "12-3-2020",
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
						<h1>Professors</h1>
						<button>Add</button>
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
