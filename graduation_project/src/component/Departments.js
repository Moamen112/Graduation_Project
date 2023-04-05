import React, { useState } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DepartmentCard from "../common/DepartmentCard";

function Departments() {
	const [departments, setDepartments] = useState([]);

	const addDepartment = () => {
		const newDepartment = () => {
			<DepartmentCard />;
		};
		setDepartments([...departments, newDepartment]);
	};

	function handleDeleteDepartment(index) {
		const newDepartments = [...departments];
		newDepartments.splice(index, 1);
		setDepartments(newDepartments);
	}

	return (
		<DepContainer>
			<Content>
				<Header>
					<h2>Departments</h2>
					<AddButton>
						<AddCircleOutlineIcon
							style={addStyle}
							onClick={addDepartment}
						/>
						Add
					</AddButton>
				</Header>

				<DepList>
					{departments.map((department, index) => (
						<DepSectionMain>
							<DepImage>
								<EventNoteIcon style={DepImageStyle} />
							</DepImage>
							<DepartmentCardStyle>
								<DepartmentCard
									key={index}
									departmentName={"Department Name"}
									departmentDescription={
										"description department description department description"
									}
								/>
							</DepartmentCardStyle>
							<EditSection>
								<EditIcon style={editSectionStyle} />
								<ClearOutlinedIcon
									onClick={() =>
										handleDeleteDepartment(index)
									}
									style={{ ...editSectionStyle, ...red }}
								/>
							</EditSection>
						</DepSectionMain>
					))}
				</DepList>
			</Content>
		</DepContainer>
	);
}

export default Departments;

const DepartmentCardStyle = styled.div`
	width: 70%;
`;

const DepContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100vh;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
	overflow: scroll;
`;

const Content = styled.div`
	margin-left: 3%;
`;

const Header = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
	text-align: left;
	gap: 10%;
	padding: 20px 0;
`;

const AddButton = styled.button`
	display: flex;
	align-items: center;
	font-size: 10px;
	justify-content: space-around;
	border: none;
	background-color: #053344;
	color: #fff;
	height: fit-content;
	width: fit-content;
	padding: 5px 10px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;

const DepList = styled.ul`
	list-style: none;
	padding: 0 10px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const DepSectionMain = styled.li`
	width: 90%;
	min-height: 150px;
	display: flex;
	align-items: center;
	border-radius: 40px;
	background-color: white;
	padding: 8px 10px;
	text-align: center;
	margin-bottom: 25px;
`;

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: right;
	justify-content: space-around;
`;

const DepImage = styled.div`
	color: white;
	width: 15%;
`;

const DepImageStyle = {
	fontSize: "65px",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "20px",
};

const editSectionStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
	cursor: "pointer",
};

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};
