import React, { useState } from "react";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";

createTheme(
	"solarized",
	{
		text: {
			primary: "#268bd2",
			secondary: "#2aa198",
		},
		background: {
			default: "#002b36",
		},
		context: {
			background: "#cb4b16",
			text: "#FFFFFF",
		},
		divider: {
			default: "#073642",
		},
		action: {
			button: "rgba(0,0,0,.54)",
			hover: "rgba(0,0,0,.08)",
			disabled: "rgba(0,0,0,.12)",
		},
	},
	"dark",
);

function Faculty() {
	const columns = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true,
		},
		{
			name: "Year",
			selector: (row) => row.year,
			sortable: true,
		},
	];

	const data = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988",
		},
		{
			id: 2,
			title: "Ghostbusters",
			year: "1984",
		},
		{
			id: 2,
			title: "sada",
			year: "1984",
		},
		{
			id: 2,
			title: "Hello",
			year: "1984",
		},
		{
			id: 2,
			title: "dadas",
			year: "1984",
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
		<>
			<Container>
				<Cards>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/graduate.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Student</h4>
							<h2>9855568</h2>
						</div>
					</Card>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/teacher.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Professors</h4>
							<h2>9855568</h2>
						</div>
					</Card>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/online-library.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Departments</h4>
							<h2>9855568</h2>
						</div>
					</Card>
				</Cards>
				<Analysis>
					<div className="left-analysis">
						<img
							src="/imgs/analysis1.png"
							alt="analysis1"
						/>
					</div>
					<div className="right-analysis">
						<div className="upper-analysis">
							{" "}
							<img
								src="/imgs/analysis2.png"
								alt="analysis1"
							/>
						</div>
						<div className="bottom-analysis">
							<img
								src="/imgs/analysis3.png"
								alt="analysis1"
							/>
						</div>
					</div>
				</Analysis>
				<Tables>
					<div className="prof">
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
								conditionalRowStyles={conditionalRowStyles}
							/>
						</div>
					</div>
					<div className="depa">
						<div className="headers">
							<h1>Departments</h1>
							<button>Add</button>
						</div>
						<DataTable
							columns={[...columns, { cell: deleteButton }]}
							data={data}
							customStyles={customStyles}
							pagination={true}
							conditionalRowStyles={conditionalRowStyles}
						/>
					</div>
				</Tables>

				<Subjects>
					<div className="subjects">
						<div className="headers">
							<h1>Subjects</h1>
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
				</Subjects>
			</Container>
		</>
	);
}

export default Faculty;

const Container = styled.section`
	width: 85%;
	margin-left: 15%;
	padding-top: 8%;
	background-color: #cddee4;
`;

const Cards = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
`;

const ImgContainer = styled.div`
	width: 50%;
	height: 85%;
	border-radius: 50%;

	img {
		height: 100%;
		width: 100%;
	}
`;

const Card = styled.div`
	width: 320px;
	height: 150px;
	background-color: #063443;
	border-radius: 15px;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: space-between;
	padding: 0 30px;
	transition: background-color 0.2s ease-in-out;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		color: #fff;
	}

	&:hover {
		background-color: #041f2a;
	}
`;

const Analysis = styled.div`
	margin-top: 3%;
	padding: 30px 5%;
	width: 100%;
	display: flex;
	justify-content: space-evenly;

	.left-analysis {
		width: 70%;
		background-color: #fff;
		height: 450px;
		border-radius: 20px;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);

		img {
			width: 100%;
			height: 100%;
		}
	}

	.right-analysis {
		width: 25%;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.upper-analysis {
			background-color: #fff;
			box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 48%;
			border-radius: 20px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.bottom-analysis {
			background-color: #fff;
			box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 48%;
			border-radius: 20px;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
`;

const Tables = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	padding: 0 5%;
	margin-bottom: 20px;

	.prof {
		width: 30%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
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

	.depa {
		width: 65%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
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

const Subjects = styled.div`
	width: 100%;
	padding: 0 6%;

	.subjects {
		width: 100%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
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