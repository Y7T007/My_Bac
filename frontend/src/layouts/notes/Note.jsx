import './note.css'
import props from "prop-types/prop-types";
import PropTypes from "prop-types";
export const Note = () => {
	console.log("type of note :",props.isCreateNote
	)
	return (
		<>
		<div className="note-name">
				<button>+</button>
		{props.isCreateNote?(
			<>
			</>
		):(
			<>
				<h3>{props.title}</h3>
				<p>{props.body}</p>
			</>
		)}
		</div>


		</>
	)

}

Note.propTypes = {
	title: PropTypes.string.isRequired, // title prop should be a required string
	body: PropTypes.string.isRequired,
	isCreateNote: PropTypes.bool.isRequired,// body prop should be a required string
};