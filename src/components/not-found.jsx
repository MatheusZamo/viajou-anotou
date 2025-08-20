import { Link } from "react-router-dom"
import { Header } from "./header"

const NotFound = () => (
  <>
    <Header />
    <main className="main-not-found">
      <section>
        <div>
          <h1>Pagina não encontrada =/</h1>
          <p>
            Volte para a <Link patch="/">página inicial</Link>
          </p>
        </div>
      </section>
    </main>
  </>
)

export { NotFound }
