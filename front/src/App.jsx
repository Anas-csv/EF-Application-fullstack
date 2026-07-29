import { useState } from "react";
import { useEffect } from "react";
import Indicateurs from "./Indicateurs";
import Graphique from "./Graphique";
import Tableau from "./Tableau";

function App() {

  const [donneesI, setDonnees] = useState(null);
  const [chargementI, setChargementI] = useState(true);
  const [erreurI, setErreurI] = useState(null);

  const [donneesH, setHistorique] = useState(null);
  const [chargementH, setChargementH] = useState(true);
  const [erreurH, setErreurH] = useState(null);

  const [donneesP, setPrevision] = useState(null);
  const [chargementP, setChargementP] = useState(true);
  const [erreurP, setErreurP] = useState(null);

  useEffect(() => {

    fetch("http://localhost:8000/indicateurs")
    .then(res => {
      if (!res.ok) {
        throw new Error("erreurI serveur");
      }
      return res.json();
    })
    .then(data => {
      setDonnees(data);
      setChargementI(false);
    })
    .catch(error => {
      setErreurI(error);
      setChargementI(false);
    });

    fetch("http://localhost:8000/historique")
    .then(res => {
      if (!res.ok) {
        throw new Error("erreurI serveur");
      }
      return res.json();
    })
    .then(data => {
      setHistorique(data);
      setChargementH(false);
    })
    .catch(error => {
      setErreurH(error);
      setChargementH(false);
    });

    fetch("http://localhost:8000/prevision")
    .then(res => {
      if (!res.ok) {
        throw new Error("erreurI serveur");
      }
      return res.json();
    })
    .then(data => {
      setPrevision(data);
      setChargementP(false);
    })
    .catch(error => {
      setErreurP(error);
      setChargementP(false);
    });

  },[])

  return (
    <div>
      {chargementI && <div>chargement des indicateurs...</div>}
      {erreurI && <div>erreurI</div>}
      {(donneesI && !erreurI) && <Indicateurs indicateurs={donneesI} />}

      {(chargementH || chargementP) && <div>Chargement des données Historique et Prévision...</div>}
      {(erreurH || erreurP) && <div>Erreur Historique/Prévision.</div>} 
      {(donneesH && donneesP && !erreurH && !erreurP) && <Graphique historique={donneesH} prevision={donneesP}/>}
      {(donneesH && donneesP && !erreurH && !erreurP) && <Tableau historique={donneesH} prevision={donneesP}/>}
    </div>
  );

}

export default App;