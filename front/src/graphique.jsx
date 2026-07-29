import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Graphique({historique,prevision}){

    const tabH = historique.map(item => ({
        mois:item.mois,
        historique:item.consommation,
        prevision:null,
    })
    )

    const tabP = prevision.map(item =>({
        mois:item.mois,
        historique:null,
        prevision:item.consommation,
    }))

    const tab = [...tabH,...tabP]

    return (
        <LineChart
        style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={tab}
        margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mois" stroke="#666" />
        <YAxis width="auto" stroke="#666" />
        <Tooltip
            cursor={{
            stroke: '#ccc',
            }}
            contentStyle={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            }}
        />
        <Legend />
        <Line
            type="monotone"
            dataKey="historique"
            stroke="#8884d8"
            dot={{
            fill: '#8884d8',
            }}
            activeDot={{ r: 8, fill: '#8884d8' }}
        />
        <Line
            type="monotone"
            dataKey="prevision"
            stroke="#82ca9d"
            dot={{
            fill: '#82ca9d',
            }}
            activeDot={{ r: 8, fill: '#82ca9d' }}
        />
        </LineChart>
    );
}

export default Graphique;