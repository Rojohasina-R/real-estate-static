import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from 'next/router';

const Header = () => {
	const pathname = useRouter().pathname;

	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
		  <Link href="/">
		  	<a><Navbar.Brand className="d-flex align-items-center"><FaHome size="1.2rem" /></Navbar.Brand></a>
		  </Link>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="mr-auto">
		      <li className="nav-item">
		        <Link href="/">
		        	<a className={pathname === "/" ? "nav-link active" : "nav-link"}>Accueil</a>
		        </Link>
		      </li>
		      <li className="nav-item">
		        <Link href="/contact">
		        	<a className={pathname === "/contact" ? "nav-link active" : "nav-link"}>Contact</a>
		        </Link>
		      </li>
		    </Nav>
		    <span className="navbar-text ml-auto d-flex align-items-center">
			    <FaPhoneAlt />
			    <span className="ml-2">033 91 992 28 / 034 98 478 75</span>
			</span>
		  </Navbar.Collapse>
		</Navbar>
	);
};

export default Header;