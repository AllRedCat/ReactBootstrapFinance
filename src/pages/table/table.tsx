import { Table, Container, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '../../components/firebase';
import { getFirestore, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { ErrorBoundary } from 'react-error-boundary';

const db = getFirestore(firebaseConfig);

function ErrorFallback({ error, resetErrorBoundary }) {
    // Exiba uma mensagem de erro personalizada ou outra UI alternativa aqui
    return (
        <div>
            Algo deu errado: {error.message}
            <button onClick={resetErrorBoundary}>Tentar novamente</button>
        </div>
    );
}

export default function TablePage() {
    const [valueIn, setValueIn] = useState<{ date: any, value: Number, description: string }[]>([]);

    // const fetchData = async () => {
    //     const querySnapshot = await getDocs(collection(db, 'TrEntrada'));
    //     const data = querySnapshot.docs.map(doc => {
    //         const id = doc.id;
    //         const transictionData = doc.data() as { date: any, value: number, description: string };
    //         return { id, ...transictionData };
    //     });
    //     setValueIn(data);
    //     console.log(data);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const [valueIn, setValueIn] = useState([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'TrEntrada'));
            const data = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const transictionData = doc.data() as { date: any, value: Number, description: string };
                return { id, ...transictionData };
            });
            setValueIn(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function handleClick() {
        console.log(valueIn);
    };

    return (
        <Container className='mt-5'>
            <Stack gap={3}>
                <div>
                    <h2>Entrada</h2>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                                    </tr>
                                ))}
                                {/* <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr> */}
                            </tbody>
                        </Table>
                    </ErrorBoundary>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <button onClick={handleClick}>teste</button>
            </Stack>
        </Container >
    );
}