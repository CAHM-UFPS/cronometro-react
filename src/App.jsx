import { useState, useEffect, useRef } from "react";

function App() {
  const [milesimas, setMilesimas] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [vuelta, setVuelta] = useState([]);
  const [hayIntervalo, setHayIntervalo] = useState(false);
  const refMilesimas = useRef(0);
  const refSegundos = useRef(0);
  const refMinutos = useRef(0);
  const refHoras = useRef(0);
  const idIntervalo = useRef(null);

  function iniciar() {
    setHayIntervalo(true);

    if (!hayIntervalo) {
      idIntervalo.current = setInterval(conteo, 10);
    }
  }

  function conteo() {
    setMilesimas((mil) => mil + 1);
  }

  useEffect(() => {
    if (milesimas > 99) {
      setMilesimas(0);
      setSegundos((seg) => seg + 1);
      if (segundos > 58) {
        setSegundos(0);
        setMinutos((min) => min + 1);
        if (minutos > 58) {
          setMinutos(0);
          setHoras((hor) => hor + 1);
        }
      }
    }
  }, [milesimas]);

  function pausar() {
    clearInterval(idIntervalo.current);
    idIntervalo.current = null;
    setHayIntervalo(false);
  }

  function listar() {
    if (milesimas > 0 && segundos >= 0) {
      refMilesimas.current = milesimas;
      refSegundos.current = segundos;
      refMinutos.current = minutos;
      refHoras.current = horas;

      setVuelta((elemento) => [...elemento, {
        horas: refHoras.current,
        minutos: refMinutos.current,
        segundos: refSegundos.current,
        milesimas: refMilesimas.current
      }]);
    }
  }

  function reiniciar() {
    setMilesimas(0);
    setSegundos(0);
    setMinutos(0);
    setHoras(0);
    setVuelta([]);
  }

  return (
    <>
      <div>
        <h1>{`${horas >= 0 && horas <= 9 ? `0${horas}` : `${horas}`}:${minutos >= 0 && minutos <= 9 ? `0${minutos}` : `${minutos}`}:${segundos >= 0 && segundos <= 9 ? `0${segundos}` : `${segundos}`}:${milesimas >= 0 && milesimas <= 9 ? `0${milesimas}` : `${milesimas}`}`}</h1>
        <input type='submit' value='Iniciar' onClick={iniciar} />
        <input type='submit' value='Pausar' onClick={pausar} />
        <input type='submit' value='Vuelta' onClick={listar} />
        <input type='submit' value='Reinciar' onClick={reiniciar} />
      </div>
      <div className="scroll">
        <table>
          <thead>
              <tr>
                <th>Horas</th>
                <th>Minutos</th>
                <th>Segundos</th>
                <th>Milesimas</th>
              </tr>
          </thead>
          <tbody>
            {vuelta.map((datos) => (
              <tr>
                <td>{datos.horas}</td>
                <td>{datos.minutos}</td>
                <td>{datos.segundos}</td>
                <td>{datos.milesimas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
