import { Row, Col, Container } from 'react-bootstrap';
import './home.css';
import MyChart from './chart';

export default function Home() {    
    return (
        <Container fluid="md" className="mt-3">
            <Row>
                <Col className="Box">
                    <h2>Primeiro Gráfico</h2>
                    {/* <MyChart /> */}
                </Col>
                <Col className="Box">
                    <h2>Segundo Gráfico</h2>
                </Col>
                <Col className="Box">
                    <h2>Terceiro Gráfico</h2>
                </Col>
            </Row>
            <Row>
                <Col className="Box">
                    <h2>Gráfico visão geral</h2>
                </Col>
            </Row>
        </Container>
    );
}