import React from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import TwoColumnForm from "../common/TwoColumnForm";

function EditSubject() {
	return (
		<Container>
			<Content>
				<Header>
					<h2>Subject Name </h2>
					<EditIcon style={editSectionStyle} />
				</Header>

				<TwoColumnForm />
			</Content>
		</Container>
	);
}

export default EditSubject;

const Container = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 85%;
	height: 100%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
`;

const Content = styled.div`
	margin-left: 3%;
`;

const Header = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: left;
	text-align: left;
	gap: 10%;
`;

const editSectionStyle = {
	fontSize: "15px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
};

/*
	const EditSubject = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	border-radius: 40px;
	align-items: center;
	background-color: white;
	padding: 8px 10px;
	text-align: center;
	transition: background-color 0.2s ease-in-out;
	margin-bottom: 25px;
	justify-content: space-around;
`;

const SubInfo = styled.ul`
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

const SubInfoItems = styled.li``;

const ListOfContent = styled.input``;

*/
