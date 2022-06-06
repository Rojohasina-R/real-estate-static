import React from "react";
import { Field } from "formik";
import Form from 'react-bootstrap/Form';

const Textarea = props => {
	const { name, label, ...rest } = props;

	return (
		<Field name={name}>
			{
				({field, meta}) => (
					<Form.Group controlId={name}>
					    <Form.Control 
					    	as="textarea" 
					    	rows={5}
					    	{...rest}
					    	placeholder={label} 
					    	{...field}
					    	isInvalid={meta.touched && meta.error} />
					    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
					</Form.Group>
				)
			}
		</Field>
	);
};

export default Textarea;