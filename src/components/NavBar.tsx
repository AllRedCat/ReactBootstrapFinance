import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/accounts">Contas</Nav.Link>
                        <Nav.Link href="/categories">Categorias</Nav.Link>
                        <Nav.Link href="/transfections">Transações</Nav.Link>
                        <Nav.Link href="/tables">Tabela</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}