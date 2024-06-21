import { Container, Stack, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function Categories() {
    const [categories, setCategories] = useState<{
        id(id: any): void; name: string; description: string;
    }[]>([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'Categories'));
        // const data = querySnapshot.docs.map(doc => doc.data() as { name: string; description: string; });
        const data = querySnapshot.docs.map(doc => {
            const id = doc.id;
            const categoryData = doc.data() as { name: string; description: string; }; 
            return { id, ...categoryData };
        });
        setCategories(data);
    };

    const deleteCategory = async (id: string) => {
        const categoryDoc = doc(db, 'Categories', id);
        await deleteDoc(categoryDoc);
        window.location.reload();
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        try {
            await addDoc(collection(db, 'Categories'), {
                name: event.currentTarget.name.value,
                description: event.currentTarget.description.value
            });
            setCategories([...categories, { name: event.currentTarget.name.value, description: event.currentTarget.description.value }]);
        } catch (error) {
            console.log(error);
            event.preventDefault();
        }
    }

    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control type="text" placeholder="Categoria" name='name' />
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
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    {/* <Button variant="primary">Editar</Button> */}
                                    <Button variant="danger" onClick={() => deleteCategory(item.id)}>Excluir</Button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Categoria 1</td>
                            <td>Descrição 1</td>
                            <td>
                                <Button variant="primary">Editar</Button>
                                <Button variant="danger">Excluir</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Categoria 2</td>
                            <td>Descrição 2</td>
                            <td>
                                <Button variant="primary">Editar</Button>
                                <Button variant="danger">Excluir</Button>
                            </td>
                        </tr> */}
                    </tbody>
                </Table>
            </Stack>
        </Container>
    );
}