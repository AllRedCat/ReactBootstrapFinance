import { Table, Container, Stack, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function TablePage() {
    const [valueIn, setValueIn] = useState<{ date: any, value: Number, account: string, category: string, description: string }[]>([]);
    const [valueOut, setValueOut] = useState<{ date: any, value: Number, account: string, category: string, description: string }[]>([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'TrEntrada'));
            const data = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: Number, account: string, category: string, description: string };
                return { id, ...transictionData };
            });
            const querySnapshotOut = await getDocs(collection(db, 'TrSaida'));
            const dataOut = querySnapshotOut.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: Number, account: string, category: string, description: string };
                return { id, ...transictionData };
            });
            setValueOut(dataOut);
            setValueIn(data);
            console.log(data);
            console.log(dataOut);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteAccount = async (id: string) => {
        const accountDoc = doc(db, 'TrEntrada', id);
        await deleteDoc(accountDoc);
        const accountDocOut = doc(db, 'TrSaida', id);
        await deleteDoc(accountDocOut);
        window.location.reload();
    }

    return (
        <Container className='mt-5'>
            <Stack gap={3}>
                <div>
                    <h2>Entrada</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Conta</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valueIn.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.value}</td>
                                    <td>{item.Account}</td>
                                    <td>{item.Category}</td>
                                    <td>{item.description}</td>
                                    <td><Button variant='danger' onClick={() => deleteAccount(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2>Saída</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Conta</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valueOut.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.value}</td>
                                    <td>{item.Account}</td>
                                    <td>{item.Category}</td>
                                    <td>{item.description}</td>
                                    <td><Button variant='danger' onClick={() => deleteAccount(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Stack>
        </Container >
    );
}