import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import swal from 'sweetalert';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import { FaMapMarkerAlt } from "react-icons/fa";
import { numberWithCommas } from "../utility/utility";
import { useFormik } from 'formik';
import * as Yup from "yup";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

const initialValues = {
	email: '',
	filter: {
   		type: '',
    	nombreDePiecesMinimum: '',
    	loyerMaximum: 2000000,
    	quartiers: '',
	},
};
const validationSchema = Yup.object({
	email: Yup.string()
				.required('Ce champ est requis.')
				.email('Veuillez entrer une adresse email valide.'),
});

const Newsletter = () => {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onSubmit = (values, actions) => {
		setLoading(true);
		axios
		    .post('https://admin-tranoahofa.serasera-mahasoa.com/api/newsletter', values, {
		    	headers: {
		    		'Authorization': 'Bearer P8ThZ7i3oSJnoXqG1aBd3cJD4Cv51fEbswPIuu7y'
		    	}
		    })
		    .then(response => {
		    	setLoading(false);
		    	setShow(false);
		    	actions.resetForm();
		    	swal({
				  text: "Vous vous êtes abonné à notre Newsletter avec succès.",
				  icon: "success",
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

	const formik = useFormik({
	    initialValues,
	    onSubmit,
	    validationSchema
	});

	return (
		<Jumbotron fluid className="mb-0 bg-info">
			<Container>
				<h2>Abonnez-vous à notre Newsletter</h2>
				<p className="text-justify text-secondary">
					Si vous n'avez pas encore trouvé la maison/l'appartement que vous cherchez, vous pouvez vous abonnez à notre Newsletter en précisant vos critères, et vous recevrez automatiquement des emails à chaque fois qu'on publie de nouvelles offres correspondant à vos critères.
				</p>
				<Button variant="primary" onClick={handleShow}>
			        S'abonner à la Newsletter
			    </Button>
			    <Modal show={show} onHide={handleClose} size="lg">
			        <Modal.Header closeButton>
			          <Modal.Title>S'abonner à la Newsletter</Modal.Title>
			        </Modal.Header>
						<Form onSubmit={formik.handleSubmit}>
				        	<Modal.Body>
				        		<Form.Group controlId="email">
								    <Form.Control 
								    	type="text" 
								    	placeholder="Votre adresse email" 
								    	name="email" 
								    	onChange={formik.handleChange} 
								    	onBlur={formik.handleBlur}
								    	value={formik.values.email}
								    	className={formik.touched.email && formik.errors.email ? 'is-invalid' : null} />
								    <Form.Control.Feedback type="invalid">
							            {formik.errors.email}
							        </Form.Control.Feedback>
							        <Form.Text className="text-muted">
								    	Vous recevrez les nouvelles offres correspondant à vos critères à cette adresse.
								    </Form.Text>
								</Form.Group>
								<h5>Vos critères</h5>
								<Alert variant="success">
								    Tous les champs ci-dessous sont optionnels.
								</Alert>
								<Form.Group controlId="type">
								    <Form.Control 
								    	as="select" 
								    	name="filter.type" 
								    	onChange={formik.handleChange} 
								    	value={formik.values.filter.type}
								    	custom>
									      <option value="">Type</option>
									      <option value="Appartement">Appartement</option>
									      <option value="Maison">Maison</option>
								    </Form.Control>
								</Form.Group>
								<Form.Group controlId="nombreDePiecesMinimum">
								    <Form.Control 
								    	as="select" 
								    	name="filter.nombreDePiecesMinimum" 
								    	onChange={formik.handleChange} 
								    	value={formik.values.filter.nombreDePiecesMinimum}
								    	custom>
									      <option value="">Nombre de pièces minimum</option>
									      <option value="1">1</option>
									      <option value="2">2</option>
									      <option value="3">3</option>
									      <option value="4">4</option>
									      <option value="5">5</option>
								    </Form.Control>
								</Form.Group>
								<Form.Group controlId="loyerMaximum">
								    <Form.Label>
								    	<span className="d-inline-block mr-1">Loyer maximum:</span>
								    	<span className="d-inline-block">
								    		{numberWithCommas(formik.values.filter.loyerMaximum)} Ar
								    	</span>
								    </Form.Label>
								    <Form.Control 
								    	type="range" 
								    	custom
								    	min="100000" 
								    	max="2000000" 
								    	step="100000"
								    	name="filter.loyerMaximum" 
								    	onChange={formik.handleChange} 
								    	value={formik.values.filter.loyerMaximum} />
								</Form.Group>
								<InputGroup>
							        <InputGroup.Prepend>
							          <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
							        </InputGroup.Prepend>
							        <FormControl 
							        	placeholder="Quartier(s)"
								    	name="filter.quartiers" 
								    	onChange={formik.handleChange} 
								    	value={formik.values.filter.quartiers} />
							    </InputGroup>
						        <Form.Text className="text-muted">
							    	Vous pouvez entrer plusieurs quartiers séparés par des espaces.
							    </Form.Text>
					        </Modal.Body>
					        <Modal.Footer>
					          <Button variant="secondary" onClick={handleClose}>
					            Fermer
					          </Button>
					          <Button 
					          	type="submit" 
					          	variant="primary"
					          	disabled={loading}>
					          		{loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-2" />}
					          		S'abonner
					          </Button>
					        </Modal.Footer>
				        </Form>
			    </Modal>
			</Container>
		</Jumbotron>
	);
};

export default Newsletter;