import { Container, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Table() {
    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form>
                    <Form.Group className='mb-3' controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" name='name' />
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Descrição" name='description' />
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