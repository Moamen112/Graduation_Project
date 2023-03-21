import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function Departments() {
	return (
		<DepContainer>
			<Content>
				<Header>
					<h2>Departments</h2>
					<AddButton>
						<AddCircleOutlineIcon style={addStyle} />
						Add
					</AddButton>
				</Header>

				<DepList>
					<DepSection>
						<DepImage>
							<EventNoteIcon style={DepImageStyle} />
						</DepImage>
						<DepInfo>
							<h2>Department Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. It has survived not only five centuries,
								but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						</DepInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</DepSection>

					<DepSection>
						<DepImage>
							<EventNoteIcon style={DepImageStyle} />
						</DepImage>
						<DepInfo>
							<h2>Department Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. It has survived not only five centuries,
								but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						</DepInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</DepSection>

					<DepSection>
						<DepImage>
							<EventNoteIcon style={DepImageStyle} />
						</DepImage>
						<DepInfo>
							<h2>Department Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. It has survived not only five centuries,
								but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						</DepInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</DepSection>

					<DepSection>
						<DepImage>
							<EventNoteIcon style={DepImageStyle} />
						</DepImage>
						<DepInfo>
							<h2>Department Name</h2>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. It has survived not only five centuries,
								but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						</DepInfo>

						<EditSection>
							<EditIcon style={editSectionStyle} />
							<ClearOutlinedIcon
								style={{ ...editSectionStyle, ...red }}
							/>
						</EditSection>
					</DepSection>
				</DepList>
			</Content>
		</DepContainer>
	);
}

export default Departments;

const DepContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100%;
	gap: 40px;
	margin-left: 15%;
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

const DepSection = styled.li`
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

const DepInfo = styled.div`
	width: 70%;
	text-align: left;
`;

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const DepImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DepImageStyle = {
	width: "80%",
	fontSize: "60px",
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
