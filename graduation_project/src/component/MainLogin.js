import React from "react";
import styled from "styled-components";
import admin from "../images/admin.png";
import staff from "../images/staff.png";
import student from "../images/student2.png";
import bg from "../images/b2.jpg";

function MainLogin() {
	return (
		<ColumnsContainer>
			<Column>
				<PortalContainer>
					<Image
						src={admin}
						alt="admin Image"
					/>
					<Title>Admin Login</Title>
					<Button>Log In</Button>
				</PortalContainer>
			</Column>

			<Column>
				<PortalContainer>
					<Image
						src={staff}
						alt="Staff Image"
					/>
					<Title>Staff Login</Title>
					<Button>Log In</Button>
				</PortalContainer>
			</Column>
			<Column>
				<PortalContainer>
					<Image
						src={student}
						alt="student Image"
					/>
					<Title>Student Login</Title>
					<Button>Log In</Button>
				</PortalContainer>
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

const PortalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300px;
	padding: 3rem;
	background-color: rgba(205, 222, 228, 0.4);
	backdrop-filter: blur(5px);
	border-radius: 10px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
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
	background-color: rgba(240, 240, 240, 0.2);
`;

const Image = styled.img`
	width: 100%;
	max-width: 180px;
	max-height: 220px;
`;

const Title = styled.h2`
	margin-top: 10px;
	color: #053344;
`;

const Button = styled.button`
	border: solid 3px #053344;
	background-color: #053344;
	font-size: 20px;
	font-weight: bolder;
	color: #fff;
	padding: 15px 30px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: #fff;
		color: #053344;
		border: solid 3px #053344;
	}
`;
