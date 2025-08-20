import { Header } from "./header"

const About = () => (
  <>
    <Header />
    <main className="main-about">
      <section>
        <div>
          <h1>Sobre o ViajouAnotou.</h1>
          <p>
            O ViajouAnotou nasceu do desejo dos amigos Paulo e Roberto de
            compartilharem de forma rápida suas aventuras pelo mundo.
          </p>
          <p>
            Aos poucos, esse desejo virou realidade em forma de software entre
            amigos e familiares. Hoje, você também pode ser parte dessa
            comunidade.
          </p>
        </div>
        <img
          className="img"
          src="sobre-viajou-anotou.jpg"
          alt="Logo da viajou anotou"
        />
      </section>
    </main>
  </>
)

export { About }
