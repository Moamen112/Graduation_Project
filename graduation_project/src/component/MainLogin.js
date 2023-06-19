import React from "react";
import styled from "styled-components";
import admin from "../images/admin.png";
import staff from "../images/staff.png";
import student from "../images/student.png";
import bg from "../images/b.jpeg";

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
	background-image: url(${bg});
	background-size: cover;
	background-position: center;
	overflow: hidden;
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
	background-color: rgba(240, 240, 240, 0.6);
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
