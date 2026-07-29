function Tableau({historique,prevision}){

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
        <table>
        <thead>
            <tr>
            <th>Mois</th>
            <th>Historique</th>
            <th>Prévision</th>
            </tr>
        </thead>
        <tbody>
            {tab.map(item => (
            <tr key={item.mois}>
                <td>{item.mois}</td>
                <td>{item.historique !== null ? item.historique : '-'}</td>
                <td>{item.prevision !== null ? item.prevision : '-'}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default Tableau;