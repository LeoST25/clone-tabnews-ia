const nomes = ["Leonardo", "Dara", "Júpiter", "Saturno", "Marte"];

export default function Home() {
  return (
    <ul className="nomes">
      {nomes.map((nome) => (
        <li key={nome}>{nome}</li>
      ))}
    </ul>
  );
}
