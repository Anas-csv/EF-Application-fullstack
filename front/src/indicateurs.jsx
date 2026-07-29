function Indicateurs({ indicateurs }) {
  return (
    <div>
      <div>
        <span>Moyenne : </span>
        <span>{ indicateurs.moyenne }</span>
      </div>
      <div>
        <span>Variance : </span>
        <span>{ indicateurs.variance }</span>
      </div>
      <div>
        <span>Évolution globale : </span>
        <span>{ indicateurs.evolution_globale_pct }%</span>
      </div>
    </div>
  );
}

export default Indicateurs;