import { Table, Container, Stack, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig);

export default function TablePage() {
    const [valueIn, setValueIn] = useState<{ date: any, value: Number, description: string }[]>([]);
    const [valueOut, setValueOut] = useState<{ date: any, value: Number, description: string }[]>([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'TrEntrada'));
            const data = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: Number, description: string };
                const data = new Date(transictionData.date.seconds * 1000);
                const formattedDate = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                return { id, ...transictionData, date: formattedDate };
            });
            const querySnapshotOut = await getDocs(collection(db, 'TrSaida'));
            const dataOut = querySnapshotOut.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: Number, description: string };
                const dateOut = new Date(transictionData.date.seconds * 1000);
                const formattedDate = dateOut.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                return { id, ...transictionData, date: formattedDate };
            });
            setValueOut(dataOut);
            setValueIn(data);
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

    function handleClick() {
        console.log(valueIn);
        console.log(valueOut);
    };

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
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valueIn.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.value}</td>
                                    <td>teste</td>
                                    <td>{item.description}</td>
                                    <td><Button variant='danger' onClick={() => deleteAccount(item.id)}>Deletar</Button></td>
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
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valueOut.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.value}</td>
                                    <td>teste</td>
                                    <td>{item.description}</td>
                                    <td><Button variant='danger' onClick={() => deleteAccount(item.id)}>Deletar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <button onClick={handleClick}>teste</button>
            </Stack>
        </Container >
    );
}