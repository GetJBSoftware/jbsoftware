import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Términos del Servicio — JB Software",
  description:
    "Los términos que se aplican cuando utilizas el sitio web de JB Software.",
  alternates: {
    canonical: "/es/terms",
    languages: { en: "/terms", es: "/es/terms" },
  },
  openGraph: {
    title: "Términos del Servicio — JB Software",
    description:
      "Los términos que se aplican cuando utilizas el sitio web de JB Software.",
    url: "/es/terms",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos del Servicio — JB Software",
    description:
      "Los términos que se aplican cuando utilizas el sitio web de JB Software.",
    images: ["/og.png"],
  },
};

export default function TermsPageEs() {
  return (
    <LegalPage
      title="Términos del Servicio"
      updated="Noviembre de 2026"
      lang="es"
    >
      <p>
        Estos términos se aplican cuando utilizas el sitio web y los servicios de
        JB Software. Al crear una cuenta o usar el sitio, los aceptas. Si no
        estás de acuerdo, no uses el sitio.
      </p>

      <section>
        <h2>Qué es este sitio</h2>
        <p>
          JB Software es un estudio de software independiente. Los productos que
          se muestran en este sitio siguen en desarrollo y están marcados como
          próximamente. Las descripciones, funciones, plataformas y precios
          previstos pueden cambiar antes del lanzamiento.
        </p>
      </section>

      <section>
        <h2>Cuentas</h2>
        <ul>
          <li>
            Debes proporcionar información precisa y mantener tus credenciales
            seguras.
          </li>
          <li>
            Eres responsable de la actividad que ocurra bajo tu cuenta.
          </li>
          <li>
            Debes tener la edad suficiente para celebrar un contrato en tu país.
          </li>
          <li>
            Podemos suspender o cerrar cuentas que abusen del servicio o
            incumplan estos términos.
          </li>
        </ul>
      </section>

      <section>
        <h2>Compras</h2>
        <p>
          Las herramientas de pago están previstas como compras únicas con
          actualizaciones de por vida para la versión principal comprada, salvo
          que se indique lo contrario en el momento del pago. Los precios y la
          disponibilidad se mostrarán antes de pagar. Los pagos los procesa Lemon
          Squeezy, que actúa como comerciante registrado y gestiona los impuestos
          sobre ventas y el IVA. Nada de este sitio es una suscripción a menos que
          lo digamos explícitamente.
        </p>
        <p>
          Si un producto no se entrega o difiere sustancialmente de su
          descripción, contáctanos y lo resolveremos. Nada de lo aquí dispuesto
          limita los derechos que te concede la legislación de consumo
          imperativa.
        </p>
      </section>

      <section>
        <h2>Licencias de software</h2>
        <p>
          Cuando se publique un producto, tu descarga y uso del mismo se regirán
          por la licencia incluida con ese producto. Salvo que esa licencia
          indique lo contrario, no puedes revender, redistribuir ni aplicar
          ingeniería inversa al software.
        </p>
      </section>

      <section>
        <h2>Uso aceptable</h2>
        <p>
          No utilices el sitio para infringir la ley, interferir con otros
          usuarios, sondear o atacar nuestros sistemas, extraer datos a gran
          escala ni vulnerar derechos de propiedad intelectual.
        </p>
      </section>

      <section>
        <h2>Disponibilidad y exenciones de responsabilidad</h2>
        <p>
          El sitio se proporciona tal cual mientras lo construimos. Pretendemos
          mantenerlo disponible y preciso, pero no prometemos un acceso
          ininterrumpido ni que todas las funciones previstas se publiquen. En la
          medida en que la ley lo permita, no somos responsables de pérdidas
          indirectas o consecuentes.
        </p>
      </section>

      <section>
        <h2>Cambios</h2>
        <p>
          Podemos actualizar estos términos a medida que cambie el servicio. La
          fecha de la parte superior de esta página muestra la última revisión. El
          uso continuado del sitio tras un cambio significa que aceptas los
          términos actualizados.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          ¿Preguntas sobre estos términos? Escribe a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
