import React from "react";
import styled from "styled-components";

import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const DepartmentCard = ({ departmentName, departmentDescription }) => {
	return (
		<div>
			<DepInfo>
				<departmentName>
					<h2>{departmentName}</h2>
				</departmentName>

				<departmentDescription>
					{departmentDescription}
				</departmentDescription>
			</DepInfo>
		</div>
	);
};

export default DepartmentCard;

const DepInfo = styled.div`
	width: 100%;
	text-align: left;
`;
