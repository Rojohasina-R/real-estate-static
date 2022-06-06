import React, { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/form/FormikControl";
import axios from "axios";
import swal from 'sweetalert';
import Container from 'react-bootstrap/Container';

const Contact = () => {
	const [loading, setLoading] = useState(false);

	const subjectOptions = [
		{ key: "Objet de votre message", value: "" },
		{ key: "J'ai des biens à louer", value: "J'ai des biens à louer"},
		{ key: "Je cherche des biens à louer", value: "Je cherche des biens à louer"},
		{ key: "Autre", value: "Autre"},
	];

	const initialValues = {
		name: '',
		email: '',
		phone: '',
		subject: '',
		otherSubject: '',
		message: '',
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('Ce champ est requis.'),
		email: Yup.string().required('Ce champ est requis.').email('Veuillez entrer une adresse e-mail valide.'),
		phone: Yup.string().required('Ce champ est requis.').matches(/^(0|261|\+261)[-. ]?(20|32|33|34)[-. ]?\d{2}[-. ]?\d{3}[-. ]?\d{2}$/, 'Veuillez entrer un numéro de téléphone valide.'),
		subject: Yup.string().required('Ce champ est requis.'),
		otherSubject: Yup.string().when('subject', {
			is: 'Autre',
			then: Yup.string().required('Ce champ est requis.')
		}),
		message: Yup.string().required('Ce champ est requis.'),
	});
	const onSubmit = values => {
		setLoading(true);
		axios
		    .post('https://admin-tranoahofa.serasera-mahasoa.com/api/contact', values, {
		    	headers: {
		    		'Authorization': 'Bearer P8ThZ7i3oSJnoXqG1aBd3cJD4Cv51fEbswPIuu7y'
		    	}
		    })
		    .then(response => {
		    	setLoading(false);
		    	if(response.data.result)
		    		swal({
		    		  title: "Merci de nous avoir contacté!",
					  text: "Nous avons bien reçu votre message. Nous vous recontacterons très bientôt!",
					  icon: "success",
					});
		    	else
		    		swal({
					  text: "Une erreur s'est produite!",
					  icon: "error",
					});
		    })
		    .catch(error => {
		    	setLoading(false);
		    	swal({
				  text: "Une erreur s'est produite!",
				  icon: "error",
				});
		    });
	};

	return (
		<Layout>
			<Container className="p-md-5 p-sm-4 p-3">
				<Row>
					<Col md="6">
						<h2 className="mb-4">Parlez-nous de vos besoins</h2>
						<p className="mb-4 text-justify">
							Si vous avez des biens à louer, ou si vous cherchez des biens à louer mais que vous n'avez pas encore trouvé ce que vous cherchez <Link href="/#filter"><a>ici</a></Link>, ou si vous avez des questions et/ou remarques et/ou suggestions, n'hésitez pas à nous contacter.
						</p>
						<ListGroup variant="flush" className="mb-4">
						  <ListGroup.Item>
						  	<FaMapMarkerAlt />
						  	<span className="ml-2">Antsahavola, en face Palm Hotel</span>
						  </ListGroup.Item>
						  <ListGroup.Item>
						  	<FaPhoneAlt />
						  	<span className="ml-2">033 91 992 28 / 034 98 478 75</span>
						  </ListGroup.Item>
						  <ListGroup.Item>
						  	<FaEnvelope />
						  	<span className="ml-2">contact@example.com</span>
						  </ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md="6">
						<Formik 
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={validationSchema} >
								{props => (
									<Form className="mb-4">
										<FormikControl control="input" name="name" label="Votre nom" type="text" />
										<FormikControl control="input" name="email" label="Votre adresse e-mail" type="text" />
										<FormikControl control="input" name="phone" label="Votre numéro de téléphone" type="text" />
										<FormikControl control="select" name="subject" label="Objet de votre message" options={subjectOptions} />
										{
											props.values.subject === "Autre" &&
												<FormikControl 
													control="input" 
													name="otherSubject" 
													label="Veuillez préciser l'objet de votre message" 
													type="text"
												/>
										}
								        <FormikControl control="textarea" name="message" label="Votre message" />
								        <Button 
								          	type="submit" 
								          	variant="primary"
								          	disabled={loading}>
								          		{loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-2" />}
								          		Envoyer
								        </Button>
							        </Form>
								)}
						</Formik>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Contact;