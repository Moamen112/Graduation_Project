import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Link } from "react-router-dom";

function Subjects() {
	return (
		<SubContainer>
			<Content>
				<Header>
					<h2>Subjects</h2>
					<AddButton>
						<AddCircleOutlineIcon style={addStyle} />
						Add
					</AddButton>
				</Header>

				<SubList>
					<SubSection>
						<SubImage>
							<EventNoteIcon style={SubImageStyle} />
						</SubImage>
						<SubInfo>
							<h2>Subject Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book.
							</p>
						</SubInfo>

						<EditSection>
							<Link to={"/facultyeditsubj"}>
								<EditIcon style={editSectionStyle} />
							</Link>
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</SubSection>

					<SubSection>
						<SubImage>
							<EventNoteIcon style={SubImageStyle} />
						</SubImage>
						<SubInfo>
							<h2>Subject Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book.
							</p>
						</SubInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</SubSection>

					<SubSection>
						<SubImage>
							<EventNoteIcon style={SubImageStyle} />
						</SubImage>
						<SubInfo>
							<h2>Subject Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book.
							</p>
						</SubInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</SubSection>
				</SubList>
			</Content>
		</SubContainer>
	);
}

export default Subjects;

const SubContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100vh;
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

const SubList = styled.ul`
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

const SubSection = styled.li`
	width: 90%;
	display: flex;
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

const SubInfo = styled.div`
	width: 70%;
	text-align: left;
`;

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const SubImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SubImageStyle = {
	fontSize: "55px",
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
};

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};
