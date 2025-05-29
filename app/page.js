'use client'

import "bootstrap/dist/css/bootstrap.min.css"

import { useState, useEffect } from "react"

//*!<-----------------------OBJETO INITIALRUNS (PRINCIPALES)----------------------->
const initialRuns = [
  // {
  //   id: "1",
  //   distance: 5,
  //   location: "Parque del Arte",
  //   duration: "00:25:30",
  //   pace: "5:10"
  // },
  // {
  //   id: "2",
  //   distance: 10,
  //   location: "Parque del Arte",
  //   duration: "00:49:05",
  //   pace: "5:00"
  // }
]

export default function Home() {

  //*! All useState
  const [runs, setRuns] = useState(initialRuns); //objeto initialRuns = runs(predeterminado)
  const [editarRuns, setEditarRuns] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ // inputs al editar/crear
    // date: "",
    distance: "",
    // duration: "",
    location: ""
  });


  useEffect(() => {
    // Importar dinámicamente Bootstrap JS (solo del lado del cliente)
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [hasLoaded, setHasLoaded] = useState(false)

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme && savedTheme !== "undefined") {
      setDarkMode(JSON.parse(savedTheme))
    }
    setHasLoaded(true) // Ya se cargó, ahora se puede guardar
  }, [])

  // Aplicar tema y guardar en localStorage
  useEffect(() => {
    if (!hasLoaded) return // Espera hasta que esté cargado

    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-bs-theme")
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode, hasLoaded])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  //*!<-----------------------ESTILOS MODO OSCURO----------------------->
  const backgroundStyle = darkMode
    ? { background: "linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)" }
    : { background: "linear-gradient(135deg, #e8f5e8 0%, #e3f2fd 100%)" }

  //*! Función para agregarRuns
  const addRuns = () => {
    const distance = Number.parseFloat(formData.distance);

    const newRun = {
      id: Date.now().toString(),
      distance,
      location: formData.location
    }
    setRuns([newRun, ...runs])
  }

  //*! Función para no cargar de nuevo la info de los inputs
  const keepModalData = (run) => {
    setEditarRuns(run)
    setFormData({
      distance: run.distance,
      location: run.location
    })
  };

  //*! Función para actualizarRuns
  const handleUpdate = () => {
    if (!editarRuns) return //si sí se están modificando

    const distance = Number.parseFloat(formData.distance)

    const updateRuns = runs.map((run) =>
      run.id === editarRuns.id
        ? {
          ...run,
          distance: formData.distance,
          location: formData.location,
        }
        : run,
    )
    setRuns(updateRuns)
    setEditarRuns(null) //ya no se está actualizando
  }

  //*! Función para borrar runs
  const handleDelete = (id) => {
    setRuns(runs.filter(run => run.id !== id))
  }
  
  return (
    <div className="min-vh-100" style={backgroundStyle}>
      <div className="container py-4">
        {/* HEADER TOGGLE MODO OSCURO*/}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="display-4 fw-bold mb-2">🏃‍♂️ Registro de Runnning</h1>
            <p className="text-muted">{formData.date}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">{darkMode ? "🌙" : "☀️"}</span>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                Modo Oscuro
              </label>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Total Carreras</small>
                  <h3 className="mb-0">Total Carreras</h3>
                </div>
                <div className="fs-1 text-primary">🏃</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Distancia Total</small>
                  <h3 className="mb-0">Distancia Total km</h3>
                </div>
                <div className="fs-1 text-success">📍</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Promedio</small>
                  <h3 className="mb-0">Promedio km</h3>
                </div>
                <div className="fs-1 text-warning">⚡</div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Esta Semana</small>
                  <h3 className="mb-0">Esta Semana</h3>
                </div>
                <div className="fs-1 text-info">🏆</div>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#createModal"
          >
            <span className="me-2">+</span>
            Registrar Carrera
            </button>
        </div>

        {/* RUNS GRID */}
        <div className="row g-4">
          {runs.map((run) => (
            <div key={run.id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-1 d-flex align-items-center gap-2">
                      {run.distance} km
                      <span></span>
                    </h5>
                    <small></small>
                  </div>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => keepModalData(run)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted">🕐</span>
                        <span className="fw-medium">{run.duration}</span>
                      </div>
                      <div>{run.pace} /km</div>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="text-muted">📍</span>
                      <small className="text-muted">{run.location}</small>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span>Tipo de entrenamiento (intervalo, longrun)</span>
                      <div>(Estrellas dificultad entrenamiento)</div>
                    </div>

                    {/* Implementar sistema de calorías */}
                    {/* Implementar notas del entrenamiento */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE (NO HAY CARRERAS REGISTRADAS*/}
        {runs.length === 0 && (
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-3">🏃</div>
            <h3 className="fw-bold mb-2">No hay carreras registradas</h3>
            <p className="text-muted mb-4">Comienza registrando tu primera carrera o entrenamiento</p>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              >
              <span className="me-2">+</span>
              Registrar Primera Carrera
            </button>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      <div className="modal fade" id="createModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registrar Nueva Carrera</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"/>
            </div>
            <div className="modal-body">
              <form>
                <div className="row g-3">
                  {/* <div className="col-md-6">
                    <label className="form-label">Fecha</label>
                    <input 
                      type="date"
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label className="form-label">Distancia (km)</label>
                    <input 
                      type="number"
                      step="0.1"
                      className="form-control"
                      placeholder="5.2"
                      value={formData.distance}
                      onChange={(e) => setFormData({...formData, distance: e.target.value})}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label className="form-label">Tiempo (HH:MM:SS)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="00:26:30"
                    />
                  </div> */}
                  {/* <div className="col-md-6">
                    <label className="form-label">Calorías (opcional)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="350"
                    />
                  </div> */}
                  <div className="col-12">
                    <label className="form-label">Ubicación</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Parque del Arte, Escaleras..."
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label className="form-label">Tipo de Carrera</label>
                    <select
                      className="form-select"
                    >
                      <option value="entrenamiento">Entrenamiento</option>
                      <option value="competencia">Competencia</option>
                      <option value="carrera-larga">Carrera Larga</option>
                      <option value="intervalos">Intervalos</option>
                      <option value="recuperacion">Recuperación</option>
                    </select>
                  </div> */}
                  {/* <div className="col-md-6">
                    <label className="form-label">Clima</label>
                    <select
                      className="form-select"
                    >
                      <option value="soleado">☀️ Soleado</option>
                      <option value="nublado">☁️ Nublado</option>
                      <option value="lluvia">🌧️ Lluvia</option>
                      <option value="viento">💨 Viento</option>
                      <option value="calor">🔥 Calor</option>
                      <option value="frio">❄️ Frío</option>
                    </select>
                  </div> */}
                  {/* <div className="col-12">
                    <label className="form-label">Dificultad (1-5)</label>
                    <select
                      className="form-select"
                    >
                      <option value="1">⭐ Muy Fácil</option>
                      <option value="2">⭐⭐ Fácil</option>
                      <option value="3">⭐⭐⭐ Moderado</option>
                      <option value="4">⭐⭐⭐⭐ Difícil</option>
                      <option value="5">⭐⭐⭐⭐⭐ Muy Difícil</option>
                    </select>
                  </div> */}
                  {/* <div className="col-12">
                    <label className="form-label">Notas</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="¿Cómo te sentiste? ¿Alguna observación especial?"
                    />
                  </div> */}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={addRuns}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Carrera</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form>
                <div className="row g-3">
                  {/* <div className="col-md-6">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label className="form-label">Distancia (km)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      value={formData.distance}
                      onChange={e => setFormData({ ...formData, distance: e.target.value })}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label className="form-label">Tiempo (HH:MM:SS)</label>
                    <input
                      type="text"
                      className="form-control"
                    />
                  </div> */}
                  {/* <div className="col-md-6">
                    <label className="form-label">Calorías</label>
                    <input
                      type="number"
                      className="form-control"
                    />
                  </div> */}
                  <div className="col-12">
                    <label className="form-label">Ubicación</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label className="form-label">Tipo</label>
                    <select
                      className="form-select"
                    >
                      <option value="entrenamiento">Entrenamiento</option>
                      <option value="competencia">Competencia</option>
                      <option value="carrera-larga">Carrera Larga</option>
                      <option value="intervalos">Intervalos</option>
                      <option value="recuperacion">Recuperación</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Clima</label>
                    <select
                      className="form-select"
                    >
                      <option value="soleado">☀️ Soleado</option>
                      <option value="nublado">☁️ Nublado</option>
                      <option value="lluvia">🌧️ Lluvia</option>
                      <option value="viento">💨 Viento</option>
                      <option value="calor">🔥 Calor</option>
                      <option value="frio">❄️ Frío</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Dificultad</label>
                    <select
                      className="form-select"
                    >
                      <option value="1">⭐ Muy Fácil</option>
                      <option value="2">⭐⭐ Fácil</option>
                      <option value="3">⭐⭐⭐ Moderado</option>
                      <option value="4">⭐⭐⭐⭐ Difícil</option>
                      <option value="5">⭐⭐⭐⭐⭐ Muy Difícil</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Notas</label>
                    <textarea
                      className="form-control"
                    />
                  </div> */}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¿Eliminar carrera?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"/>
            </div>
            <div className="modal-body">
              <p>El registro será eliminado permanentemente.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => editarRuns && handleDelete(editarRuns.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    /* <div>
      <p>Me presionaste {contador} veces</p>
      <button onClick={addCount}>+</button>
    </div> */
  )
}
