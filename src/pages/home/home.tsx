import { Row, Col, Container } from 'react-bootstrap';
import './home.css';
import { Chart } from "react-google-charts";



export default function Home() {

    const data = [
        ["Name", "Popularity"],
        ["Cesar", 370],
        ["Rachel", 600],
        ["Patrick", 700],
        ["Eric", 1500]
    ];

    const dataGeneral = [
        // nome da coluna, valor1, valor2, valor3
        [
            "Day",
            "Guardians of the Galaxy",
            "The Avengers",
            "Transformers: Age of Extinction",
        ],
        // linha horizontal, Guardians of the Galaxy, The Avengers, Transformers: Age of Extinction
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 69.5, 32.4],
        [3, 25.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
        [13, 4.8, 6.3, 3.6],
        [14, 4.2, 6.2, 3.4],
    ];

    const optionsIn = {
        title: "Entradas",
        titleTextStyle: { fontName: "JetBrains Mono", fontSize: 14 },
        colors: ["#008FFB"],
        legend: { position: "none" },
    };

    const optionsOut = {
        title: "Saídas",
        titleTextStyle: { fontName: "JetBrains Mono", fontSize: 14 },
        colors: ["#FF4560"],
        legend: { position: "none" },
    };

    const optionsPie = {
        title: "Orçamento",
        titleTextStyle: { fontName: "JetBrains Mono", fontSize: 14 },
        pieHole: 0.4,
        is3D: false,
        legend: { position: "none" },
        pieSliceText: "none",
        colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
        chartArea: { width: '80%', height: '80%' },
    };

    const optionsGeneral = {
        title: "Visão Geral",
        titleTextStyle: { fontName: "JetBrains Mono", fontSize: 14 },
        legend: { position: "none" },
    };

    return (
        <Container fluid="md" className="mt-3">
            <Row>
                <Col className="Box">
                    {/* <h2>Primeiro Gráfico</h2> */}
                    <Chart
                        chartType="ColumnChart"
                        data={data}
                        options={optionsIn}
                        width="100%"
                        min-height="100px"
                        max-height="100%"
                    />
                </Col>
                <Col className="Box">
                    {/* <h2>Segundo Gráfico</h2> */}
                    <Chart
                        chartType="ColumnChart"
                        data={data}
                        options={optionsOut}
                        width="100%"
                        height="100%"
                    />
                </Col>
                <Col className="Box">
                    {/* <h2>Terceiro Gráfico</h2> */}
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={optionsPie}
                        width="100%"
                        height="100%"
                    />
                </Col>
            </Row>
            <Row>
                <Col className="Box">
                    {/* <h2>Gráfico visão geral</h2> */}
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="90%"
                        data={dataGeneral}
                        options={optionsGeneral}
                    />
                </Col>
            </Row>
        </Container>
    );
}