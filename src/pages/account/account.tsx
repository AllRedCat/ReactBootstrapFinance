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
        try {
            await addDoc(collection(db, 'Accounts'), {
                name: event.currentTarget.name.value,
                description: event.currentTarget.description.value
            });
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
                                <td><Button variant='danger' onClick={() => deleteAccount(item.id)}>Deletar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Container>
    );
}