import React, { useEffect, useState } from 'react';
import api from "../../../Axios_api_cfg";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from "prop-types";
import levels from "../../../context/levels";


const openFileInNewWindow = (fileUrl) => {
	const server = "http://localhost:3001/";

	const fullPath = `${server}media${fileUrl}`;
	console.log(fullPath)

	window.open(fullPath, '_blank');
};

function Row({ row }) {
	const level = JSON.parse(localStorage.getItem('userInfos')).level;
	console.log(level)

	const subjects = levels.find((l) => l.levelId === level).subjects;
	console.log(subjects);
	const { course, function: func, status, employed, files } = row;
	const [open, setOpen] = useState(false);

	Row.propTypes = {
		row: PropTypes.shape({
			course: PropTypes.shape({
				name: PropTypes.string.isRequired,
			}).isRequired,
			function: PropTypes.shape({
				Difficulty: PropTypes.string.isRequired,
				supply_item: PropTypes.string.isRequired,
			}).isRequired,
			status: PropTypes.string.isRequired,
			employed: PropTypes.string.isRequired,
			files: PropTypes.shape({
				coufses: PropTypes.object.isRequired,
			}).isRequired,
		}).isRequired,
	};

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{course.name}
				</TableCell>
				<TableCell align="right">{func.Difficulty}</TableCell>
				<TableCell align="right">{func.supply_item}</TableCell>
				<TableCell align="right">{status}</TableCell>
				<TableCell align="right">{employed}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>

							<Table size="small" aria-label="purchases">

								<TableBody>
									<TableRow >
										<TableCell style={{fontWeight:'bolder'}}>course_id</TableCell>
										<TableCell style={{fontWeight:'bolder'}}>course_title</TableCell>
										<TableCell style={{fontWeight:'bolder'}}>File</TableCell>
										<TableCell style={{fontWeight:'bolder'}}>course_description</TableCell>
										<TableCell style={{fontWeight:'bolder'}}>course_author_name</TableCell>
									</TableRow>
									{Object.keys(files.coufses).map((key) => {
										return (
											<TableRow key={key}>
												<TableCell>{files.coufses.course_id}</TableCell>
												<TableCell>{files.coufses.course_title}</TableCell>
												<TableCell><button onClick={() => openFileInNewWindow(files.coufses.course_path)}>Open File</button></TableCell>
												<TableCell>{files.coufses.course_description}</TableCell>
												<TableCell>{files.coufses.course_author_name}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function SideBar() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/courses');
				console.log(response.data);


				setData(response.data.course);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	console.log(data);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableBody>
					{data.map((row) => (
						<Row key={row._id} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
