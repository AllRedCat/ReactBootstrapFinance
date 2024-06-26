import { Container, Stack, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function Transactions() {
    const [selected, setSelected] = useState<string | null>(null);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const opcao = event.target.name;
        setSelected((prevState) => (prevState === opcao) ? null : opcao );
        console.log(selected);
    };

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            if (selected === 'entrada') {
                await addDoc(collection(db, 'TrEntrada'), {
                    date: event.currentTarget.date.value,
                    value: event.currentTarget.value.value,
                    account: event.currentTarget.account.value,
                    category: event.currentTarget.category.value,
                    description: event.currentTarget.description.value
                });
            }
            else {
                await addDoc(collection(db, 'TrSaida'), {
                    date: event.currentTarget.date.value,
                    value: event.currentTarget.value.value,
                    account: event.currentTarget.account.value,
                    category: event.currentTarget.category.value,
                    description: event.currentTarget.description.value
                });
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const [dataAccounts, setDataAccounts] = useState<string[]>([]);
    const [dataCategories, setDataCategories] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const querySnapshotAcc = await getDocs(collection(db, 'Accounts'));
            const dataAcc = querySnapshotAcc.docs.map(doc => {
                const accountData = doc.data() as { name: string, description: string };
                return accountData.name;
            });
            const querySnapshotCat = await getDocs(collection(db, 'Categories'));
            const dataCat = querySnapshotCat.docs.map(doc => {
                const categoryData = doc.data() as { name: string, description: string };
                return categoryData.name;
            });
            setDataAccounts(dataAcc);
            setDataCategories(dataCat);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className='mt-5' fluid='sm'>
            <Stack gap={3}>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId="trasactionForm">
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Valor</Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>R$</InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" name='value'

                                        onChange={(e) => {
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
                                <Form.Control type="date" placeholder="Data" name='date' />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Conta</Form.Label>
                                <Form.Select aria-label="Account" name='account'>
                                    {dataAccounts.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select aria-label="Categories" name='category'>
                                    {dataCategories.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {['radio'].map((type) => (
                            <div key={`reverse-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Entrada"
                                    name="entrada"
                                    type="radio"
                                    id={`reverse-${type}-1`}
                                    onChange={handleCheckboxChange}
                                    // checked={selected && selected.includes('entrada')}
                                    checked={selected === 'entrada'}
                                />
                                <Form.Check
                                    inline
                                    label="Saida"
                                    name="saida"
                                    type="radio"
                                    id={`reverse-${type}-2`}
                                    onChange={handleCheckboxChange}
                                    // checked={selected && selected.includes('saida')}
                                    checked={selected === 'saida'}
                                />
                            </div>
                        ))}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={2} name='description' />
                        </Form.Group>
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button type="reset" variant="secondary">Cancelar</Button>
                        <Button type="submit" variant="primary">Salvar</Button>
                        <Button variant='info'>Teste</Button>
                    </Stack>
                </Form>
            </Stack>
        </Container>
    );
}