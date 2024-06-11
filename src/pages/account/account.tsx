import { Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

export default function Account() {
    // const [accoutData, setAccoutData] = useState<{ name: string; description: string }[]>([]);

    const saveDatainCache = (key: string, array: any) => {
        const arrayCache = JSON.stringify(array);
        localStorage.setItem(key, arrayCache);
        console.log('Salvo no cache'); // teste
    };

    const getDataFromCache = (key: string) => {
        const arrayCache = localStorage.getItem(key);
        return arrayCache ? JSON.parse(arrayCache) : [];
        console.log('Carregado do cache'); // teste
    };

    const [accoutData, setAccoutData] = useState([
        { name: 'Banco do Brasil', description: 'Conta corrente' },
        { name: 'Nubank', description: 'Conta digital' }
    ]);

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = event.currentTarget.name.value;
        const description = event.currentTarget.description.value;

        setAccoutData(prevData => [
            ...prevData,
            { name, description }
        ]);

        saveDatainCache('accoutData', accoutData);
        getDataFromCache('accoutData');
        console.log(accoutData);
    }

    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId="formBasicEmail">
                        <Form.Label>Banco</Form.Label>
                        <Form.Control type="text" placeholder="Banco" name='name' />
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Descrição" name='description' />
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button type="reset" variant="secondary">Cancelar</Button>
                        <Button type="submit" variant="primary">Salvar</Button>
                    </Stack>
                </Form>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accoutData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Container>
    );
}