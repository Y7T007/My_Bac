import React from 'react';
import PropTypes from 'prop-types';
import './InputElement.css';

const InputElement = ({ name, required, type, id, value, onChange, icon,path,path2,isInvalid,message  }) => {
	return (
		<>
		<div className="input-elementor">

		<div className={`formiyy ${isInvalid ? 'is-invalid' : ''}`}>
			<button>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={`${isInvalid ? 'red' : 'currentColor'}`}
					 className={icon} viewBox="0 0 16 16">
					<path d={path}/>
					<path d={path2}/>
				</svg>
			</button>
			<input
				className={`input`}
				required={required}
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={name}
			/>

				<button className="reset" type="reset">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						 stroke={`${isInvalid ? 'red' : 'currentColor'}`} strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
		</div>
			{isInvalid && (
				<p className="errorMessage">{message}</p>
			)}
		</div>

		</>
	);
};

InputElement.propTypes = {
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	icon: PropTypes.string,
	path: PropTypes.string,
	path2: PropTypes.string,
	isInvalid: PropTypes.bool,
	message: PropTypes.string,
};

export default InputElement;
