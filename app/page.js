'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Home() {

  // const [contKm, setCountKm] = useState(0);

  // function addKm() {
  //   setCountKm(contKm + 1);
  // }

  // OBJETO RUNS
  const runs = [
    {
      id: "1",
      distance: 5,
      location: "Parque del Arte",
      duration: "00:25:30",
      pace: "5:10"
    },
    {
      id: "2",
      distance: 10,
      location: "Parque del Arte",
      duration: "00:49:05",
      pace: "5:00"

    }
  ]
    
  

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #e8f5e8 0%, #e3f2fd 100%)" }}>
      <div className="container py-4">
        {/* HEADER */}
        <div>
          <h1 className="display-4 fw-bold text-dark mb-2">🏃‍♂️ Registro de Runnning</h1>
          <p className="text-muted">Lleva el control de todas tus carreras y entrenamientos</p>
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
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
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
        
      </div>
    </div>
    /* <div>
      <p>Me presionaste {contador} veces</p>
      <button onClick={addCount}>+</button>
    </div> */
  )
}
