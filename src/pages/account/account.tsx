import { Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

export default function Account() {
    const [accountData, setAccountData] = useState([
        { name: 'Banco do Brasil', description: 'Conta corrente' },
        { name: 'Nubank', description: 'Conta digital' }
    ]);

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = event.currentTarget.name.value;
        const description = event.currentTarget.description.value;

        setAccountData(prevData => [
            ...prevData,
            { name, description }
        ]);

        console.log(accountData);
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
                        {accountData.map((item, index) => (
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

