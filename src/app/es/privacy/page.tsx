import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Política de Privacidad — JB Software",
  description:
    "Cómo JB Software recoge, usa y protege tu información.",
  alternates: {
    canonical: "/es/privacy",
    languages: { en: "/privacy", es: "/es/privacy" },
  },
  openGraph: {
    title: "Política de Privacidad — JB Software",
    description: "Cómo JB Software recoge, usa y protege tu información.",
    url: "/es/privacy",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad — JB Software",
    description: "Cómo JB Software recoge, usa y protege tu información.",
    images: ["/og.png"],
  },
};

export default function PrivacyPageEs() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updated="Noviembre de 2026"
      lang="es"
    >
      <p>
        Esta política explica qué información recoge JB Software cuando utilizas
        este sitio web y nuestros servicios, y cómo la usamos. Es una política
        sencilla y en lenguaje claro para un pequeño estudio de software
        independiente.
      </p>

      <section>
        <h2>Información que recogemos</h2>
        <ul>
          <li>
            <strong>Datos de la cuenta.</strong> Si creas una cuenta, guardamos
            tu nombre, tu dirección de correo electrónico y, cuando usas el inicio
            de sesión con Google, el nombre y el avatar de tu perfil de Google. Si
            usas correo y contraseña, solo guardamos un hash con sal de tu
            contraseña, nunca la contraseña en sí.
          </li>
          <li>
            <strong>Compras.</strong> Guardamos registros de los productos que
            compras, incluidos el importe, la moneda, el estado y el identificador
            del pedido del proveedor de pagos.
          </li>
          <li>
            <strong>Lista de lanzamiento.</strong> Si nos pides que te avisemos
            cuando lancen nuestras herramientas, guardamos tu dirección de correo
            y la página desde la que te registraste hasta que enviemos ese correo
            o nos pidas que la eliminemos.
          </li>
          <li>
            <strong>Mensajes de contacto.</strong> Si nos contactas, recibimos el
            nombre, la dirección de correo y el mensaje que decidas enviarnos.
          </li>
          <li>
            <strong>Datos técnicos.</strong> Nuestros proveedores de alojamiento
            y base de datos pueden procesar registros de servidor estándar (como
            la dirección IP, el tipo de navegador y la hora de la solicitud) para
            mantener el servicio seguro y disponible.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cómo usamos la información</h2>
        <ul>
          <li>Para crear y gestionar tu cuenta y mantener tu sesión iniciada.</li>
          <li>Para procesar compras y dar acceso al software de pago.</li>
          <li>Para responder a tus mensajes y solicitudes de soporte.</li>
          <li>
            Para mantener el servicio seguro, prevenir abusos y corregir
            problemas.
          </li>
        </ul>
        <p>
          No vendemos tu información personal. No ejecutamos rastreadores
          publicitarios ni analíticas de terceros en este sitio.
        </p>
      </section>

      <section>
        <h2>Cookies y sesiones</h2>
        <p>
          Usamos una cookie de sesión para mantener tu sesión iniciada. Lemon
          Squeezy puede establecer cookies mientras completas un pago. No usamos
          cookies para publicidad.
        </p>
      </section>

      <section>
        <h2>Proveedores de servicios</h2>
        <p>
          Confiamos en proveedores de confianza para operar el servicio: Google
          para el inicio de sesión opcional, Lemon Squeezy para pagos e impuestos
          sobre ventas, Supabase para la base de datos y Vercel para el
          alojamiento. Estos proveedores procesan datos en nuestro nombre y bajo
          sus propias condiciones de privacidad.
        </p>
      </section>

      <section>
        <h2>Conservación y tus derechos</h2>
        <p>
          Conservamos los registros de cuenta y transacciones durante el tiempo
          necesario para prestar el servicio y cumplir obligaciones legales.
          Puedes pedirnos que accedamos, corrijamos o eliminemos tu información
          personal escribiendo a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Es posible que
          necesitemos conservar ciertos registros cuando la ley lo exija.
        </p>
      </section>

      <section>
        <h2>Cambios</h2>
        <p>
          Podemos actualizar esta política a medida que el servicio crezca. La
          fecha de la parte superior de esta página muestra la última revisión.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          ¿Preguntas sobre privacidad? Escribe a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
