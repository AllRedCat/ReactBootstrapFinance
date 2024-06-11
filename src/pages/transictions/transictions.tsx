import { Container, Stack, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';

export default function Transictions() {
    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form>
                    <Form.Group className='mb-3' controlId="trasactionForm">
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Valor</Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>R$</InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        if (!isNaN(value)) {
                                            const formattedValue = value.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                                minimumFractionDigits: 2,
                                            });
                                            // Use 'formattedValue' where you need to display the formatted currency.
                                            console.log(formattedValue); // Exemplo: R$ 1.234,56
                                        }
                                    }} />
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" placeholder="Data" name='transictionDate' />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Conta</Form.Label>
                                <Form.Select aria-label="Account">
                                    <option>Conta ...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select aria-label="Categories">
                                    <option>Categoria ...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {['radio'].map((type) => (
                            <div key={`reverse-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Entrada"
                                    name="group1"
                                    type={type}
                                    id={`reverse-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Saida"
                                    name="group1"
                                    type={type}
                                    id={`reverse-${type}-2`}
                                />
                            </div>
                        ))}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={2} />
                        </Form.Group>
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button type="reset" variant="secondary">Cancelar</Button>
                        <Button type="submit" variant="primary">Salvar</Button>
                    </Stack>
                </Form>
            </Stack>
        </Container>
    );
}