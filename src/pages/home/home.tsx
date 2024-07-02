import { Row, Col, Container } from 'react-bootstrap';

export default function Home() {    
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Primeiro Gráfico</h2>
                </Col>
                <Col>
                    <h2>Segundo Gráfico</h2>
                </Col>
                <Col>
                    <h2>Terceiro Gráfico</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Gráfico visão geral</h2>
                </Col>
            </Row>
        </Container>
    );
}