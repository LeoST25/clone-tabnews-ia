import ConfettiEffect from "./confetti-effect";
import styles from "./under-construction.module.css";

type Props = {
  total: number | null;
};

export default function UnderConstruction({ total }: Props) {
  const formattedTotal =
    total !== null ? total.toLocaleString("pt-BR") : null;

  return (
    <main className={styles.construction}>
      <ConfettiEffect />
      <h1>Em Construção</h1>
      <p className={styles.message}>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <p className={styles.total}>
        {formattedTotal !== null ? (
          <>
            Já são <strong>{formattedTotal}</strong> conteúdos publicados no
            TabNews
          </>
        ) : (
          "Não foi possível carregar o total de conteúdos no momento."
        )}
      </p>
      <a href="https://www.tabnews.com.br" target="_blank" rel="noreferrer">
        Ir para o site oficial do TabNews
      </a>
    </main>
  );
}
