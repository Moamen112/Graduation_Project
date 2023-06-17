import React from "react";
import styled from "styled-components";
import admin from "../images/admin.jpg";
import staff from "../images/staff.png";
import student from "../images/student.jpg";

function MainLogin() {
	return (
		<ColumnsContainer>
			<Column>
				<Image
					src={admin}
					alt="admin Image"
				/>
				<Title>Admin Login</Title>
				<Button>Log In</Button>
			</Column>
			<Column>
				<Image
					src={staff}
					alt="Staff Image"
				/>
				<Title>Staff Login</Title>
				<Button>Log In</Button>
			</Column>
			<Column>
				<Image
					src={student}
					alt="student Image"
				/>
				<Title>Student Login</Title>
				<Button>Log In</Button>
			</Column>
		</ColumnsContainer>
	);
}

export default MainLogin;

const ColumnsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url("../images/b.jpeg");
	background-size: cover;
`;

const Column = styled.div`
	flex: 1;
	padding: 20px;
	border: 1px solid #ccc;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100vh;
`;

const Image = styled.img`
	width: 100%;
	max-width: 200px;
	height: auto;
`;

const Title = styled.h2`
	margin-top: 10px;
`;

const Button = styled.button`
	border: none;
	background-color: #053344;
	color: #fff;
	padding: 15px 30px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
`;
