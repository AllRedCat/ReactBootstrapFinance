import { Container, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
// import { set } from 'firebase/database';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyASUf-PgdhfjbGlUinHE1eoS8TErb4kShs",
    authDomain: "financereact-77dac.firebaseapp.com",
    projectId: "financereact-77dac",
    storageBucket: "financereact-77dac.appspot.com",
    messagingSenderId: "257796398320",
    appId: "1:257796398320:web:8140b66dd4af3f85cf3635",
    measurementId: "G-8WPCJGQQNK"
});

const db = getFirestore(firebaseConfig);

export default function Account() {
    const [accounts, setAccounts] = useState<{ name: string; description: string; }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'Accounts'));
            const data = querySnapshot.docs.map(doc => doc.data() as { name: string; description: string; });
            setAccounts(data);
        };

        fetchData();
    }, []);



    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.currentTarget.reset();
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Container>
    );
}

// {/* {accountData.map((item, index) => (
//     <tr key={index}>
//         <td>{item.name}</td>
//         <td>{item.description}</td>
//     </tr>
// ))} */}



