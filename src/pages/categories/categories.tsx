import { Container, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Categories() {
    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form>
                    <Form.Group className='mb-3' controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control type="text" placeholder="Categoria" name='category' />
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Descrição" name='categoryDescription' />
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