import { Container, Nav, Navbar } from 'react-bootstrap';
// import {
//     createBrowserRouter,
//     RouterProvider,
//     Route,
//     Link,
// } from "react-router-dom";

export default function NavigationBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">React App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/accounts">Accounts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}