import TitleSection from "@/components/TitleSection";

const PoliticaPrivacidad = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <TitleSection
        title="Política de Privacidad"
        image="/Banner/BannerPreguntas.jpg"
        position="top"
      />

      <div className="container max-w-4xl mx-auto px-6 py-10 text-gray-700">
        <section aria-labelledby="intro-section">
          <h2 id="intro-section" className="text-xl font-bold mb-4">
            Introducción
          </h2>
          <p className="mb-4">
            Reanda, domiciliada en Ibagué, Tolima, informa a sus grupos de
            interés sobre la actualización de su Política de Protección de Datos
            Personales, en conformidad con la Ley 1581 de 2012, el Decreto 1377
            de 2013, y demás normativas aplicables.
          </p>
        </section>

        <section aria-labelledby="policy-section">
          <h2 id="policy-section" className="text-xl font-bold mb-4">
            Política de Protección de Datos Personales
          </h2>
          <p className="mb-4">
            La compañía se compromete a proteger la privacidad de sus usuarios y
            a cumplir con las leyes y regulaciones en materia de protección de
            datos personales. Esta política describe cómo recogemos, utilizamos,
            almacenamos y protegemos los datos personales que nos proporcionan.
          </p>
        </section>

        <section aria-labelledby="definitions-section">
          <h3 id="definitions-section" className="text-lg font-semibold mb-4">
            Definiciones
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Dato Personal:</strong> Cualquier información vinculada o
              que pueda asociarse a una o varias personas naturales determinadas
              o determinables.
            </li>
            <li>
              <strong>Base de Datos:</strong> Conjunto organizado de datos
              personales que sea objeto de tratamiento.
            </li>
            <li>
              <strong>Autorización:</strong> Consentimiento expreso, previo e
              informado del titular del dato personal para llevar a cabo el
              tratamiento.
            </li>
            <li>
              <strong>Tratamiento:</strong> Operaciones o actividades que se
              pueden realizar con los datos personales, tales como la
              recolección, uso, almacenamiento, transferencia, transmisión o
              supresión.
            </li>
            <li>
              <strong>Datos Sensibles:</strong> Datos que afectan la intimidad
              del titular o cuyo uso indebido puede generar su discriminación,
              tales como aquellos que revelen el origen racial o étnico,
              orientación política, convicciones religiosas o filosóficas, entre
              otros.
            </li>
            <li>
              <strong>Encargado del Tratamiento:</strong> Persona natural o
              jurídica, pública o privada, que realiza el tratamiento de datos
              personales por cuenta del responsable del tratamiento.
            </li>
            <li>
              <strong>Responsable del Tratamiento:</strong> Persona natural o
              jurídica, pública o privada, que decide sobre la base de datos y/o
              el tratamiento de los datos.
            </li>
            <li>
              <strong>Titular:</strong> Persona natural cuyos datos personales
              sean objeto de tratamiento.
            </li>
            <li>
              <strong>Aviso de Privacidad:</strong> Comunicación generada por el
              responsable para informar al titular sobre la existencia de las
              políticas de tratamiento de datos, su acceso y finalidades.
            </li>
            <li>
              <strong>Transferencia:</strong> La transferencia de datos ocurre
              cuando el responsable del tratamiento envía la información a un
              receptor que puede estar dentro o fuera del país.
            </li>
          </ul>
        </section>

        <section aria-labelledby="exceptions-section">
          <h3
            id="exceptions-section"
            className="text-lg font-semibold mt-8 mb-4"
          >
            Excepciones de Autorización
          </h3>
          <p className="mb-4">
            No será necesaria la autorización del titular en los siguientes
            casos:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Información requerida por entidades públicas o judiciales.</li>
            <li>Datos de naturaleza pública.</li>
            <li>Casos de urgencia médica o sanitaria.</li>
            <li>
              Tratamiento autorizado por la ley para fines históricos,
              estadísticos o científicos.
            </li>
          </ul>
        </section>

        <section aria-labelledby="commitment-section">
          <p id="commitment-section" className="mt-8">
            <strong>Reanda</strong>, en el desarrollo de su actividad
            empresarial, lleva a cabo el tratamiento de datos personales en
            cumplimiento con la Constitución y las leyes aplicables.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
