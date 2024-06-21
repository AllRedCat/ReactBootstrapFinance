import {Container, Stack, Form, InputGroup, Button, Row, Col} from 'react-bootstrap';
import React, {useState} from 'react';
import {firebaseConfig} from '../../components/firebase';
import {getFirestore, getDocs, collection, addDoc} from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function Transictions() {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (event) => {
        const opcao = event.target.name;
        if (selected.includes(opcao)) {
            // Se a opção já estiver selecionada, remova-a
            setSelected(selected.filter((item) => item !== opcao));
            console.log(selected);
        } else {
            // Caso contrário, adicione-a à lista de opções selecionadas
            setSelected([...selected, opcao]);
            console.log(selected);
        }
    };

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        try {   
            if (selected[0] === 'entrada') {
                await addDoc(collection(db, 'TrEntrada'), {
                    date: event.currentTarget.date.value,
                    value: event.currentTarget.value.value,
                    description: event.currentTarget.description.value
                });
            }
            else {
                await addDoc(collection(db, 'TrSaida'), {
                    date: event.currentTarget.date.value,
                    value: event.currentTarget.value.value,
                    description: event.currentTarget.description.value
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataTeste = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'TrEntrada'));
            const data = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: number, description: string };
                const data = new Date(transictionData.date.seconds * 1000);
                const formattedDate = data.toLocaleDateString('pt-BR', {

                    day: '2-digit',

                    month: '2-digit',

                    year: 'numeric'

                });
                return {id, ...transictionData, date: formattedDate};
            });
            console.log(data);
            const querySnapshotOut = await getDocs(collection(db, 'TrSaida'));
            const dataOut = querySnapshotOut.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: number, description: string };
                const data = new Date(transictionData.date.seconds * 1000);
                const formattedDate = data.toLocaleDateString('pt-BR', {

                    day: '2-digit',

                    month: '2-digit',

                    year: 'numeric'

                });
                return {id, ...transictionData, date: formattedDate};
            });
            console.log(dataOut);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

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
                                                  }}/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" placeholder="Data" name='date'/>
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
                                    name="entrada"
                                    type="radio"
                                    id={`reverse-${type}-1`}
                                    onChange={handleCheckboxChange}
                                    // checked={selected.includes('entrada')}
                                    checked={selected && selected.includes('entrada')}
                                />
                                <Form.Check
                                    inline
                                    label="Saida"
                                    name="saida"
                                    type="radio"
                                    id={`reverse-${type}-2`}
                                    onChange={handleCheckboxChange}
                                    // checked={selected.includes('saida')}
                                    checked={selected && selected.includes('saida')}
                                />
                            </div>
                        ))}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={2} name='description'/>
                        </Form.Group>
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Button type="reset" variant="secondary">Cancelar</Button>
                        <Button type="submit" variant="primary">Salvar</Button>
                        <Button variant='info' onClick={fetchDataTeste}>Teste</Button>
                    </Stack>
                </Form>
            </Stack>
        </Container>
    );
}