import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from 'react-bootstrap/Form';

const Select = props => {
	const { name, label, options, ...rest } = props;

	return (
		<Field name={name}>
			{
				({field, meta}) => (
					<Form.Group controlId={name}>
					    <Form.Control 
					    	as="select" 
					    	custom
					    	{...rest}
					    	{...field}
					    	isInvalid={meta.touched && meta.error}>
						    	{options.map(option => (
		    						<option key={option.value} value={option.value}>{option.key}</option>
		    					))}
					    </Form.Control>
					    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
					</Form.Group>
				)
			}
		</Field>
	);
};

export default Select;