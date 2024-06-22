import { Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function Account() {
    const [accounts, setAccounts] = useState<{
        id(id: any): void; name: string; description: string;
    }[]>([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'Accounts'));
        // const data = querySnapshot.docs.map(doc => doc.data() as { name: string; description: string; });
        const data = querySnapshot.docs.map(doc => {
            const id = doc.id;
            const accountData = doc.data() as { name: string; description: string; };
            return { id, ...accountData };
        });
        setAccounts(data);
        console.log(data);
    };

    const deleteAccount = async (id: string) => {
        const accountDoc = doc(db, 'Accounts', id);
        await deleteDoc(accountDoc);
        window.location.reload();
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await addDoc(collection(db, 'Accounts'), {
                name: event.currentTarget.name.value,
                description: event.currentTarget.description.value
            });
            window.location.reload();
            setAccounts([...accounts, { name: event.currentTarget.name.value, description: event.currentTarget.description.value }]);
        } catch (error) {
            console.log(error);
        }
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
                        {accounts.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td><Button variant='danger' onClick={() => deleteAccount(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Container>
    );
}