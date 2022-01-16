import React,{useState, useEffect } from 'react'
import { firebase } from './firebase'

import './App.css';

function App() {
  const [ID, setID] = useState('')
  const [Nombre, setnombre] = useState('')
  const [ApellidoP, setapellidop] = useState('')
  const [ApellidoM, setapellidom] = useState('')
  const [IDS, setIDS] = useState([])
  const [modoEdicion,setModoEdicion] = useState(true)

  const agregar = async(e) => {
    e.preventDefault()
    console.log(ID,Nombre,ApellidoP,ApellidoM)
    if(!ID.trim()){
      console.log("Esta vacío el campo")
      return
    }
    try{
      const db = firebase.firestore()
      const nuevoRegistro = {
        Id_del_Alumno: ID,
        Nombre_Alumno: Nombre,
        Apellido_Paterno: ApellidoP,
        Apellido_Materno: ApellidoM,
        fecha: Date.now(),
      }
      const data = await db.collection('Datos del Alumno').add(nuevoRegistro)
      setIDS([
        ...IDS,
        {
          id: data.id, ...nuevoRegistro,
        },
      ])
      setID('')
      setnombre('')
      setapellidop('')
      setapellidom('')
    } catch(error) {
      console.log(error)
    }

  } 

  useEffect(() => {
   const obtenerData = async (id) => {
     const db = firebase.firestore()
     const data = await db.collection('Datos del Alumno').get()
     console.log(data.docs)
     const arrayData = data.docs.map((doc) => {
       return {
         id: doc.id, 
         ...doc.data(),
       }
     })
     console.log(arrayData)
     setIDS(arrayData)
    } 
   obtenerData()  
  }, [])
  
  const eliminar = async(id) => {
    try {
      const db = firebase.firestore()
      await db.collection('Datos del Alumno').doc(id).delete()
      const arrayFilter = IDS.filter((item) => {
        return (
          item.id !== id
        )
      })
      setIDS(arrayFilter)
    } catch (error) {
      console.log(error)
    }
  }
  
  const activarEdicion =  (item) => {
    setModoEdicion(true)
    setID(item.Id_del_Alumno)
    setnombre(item.Nombre_Alumno)
    setapellidop(item.Apellido_Paterno)
    setapellidom(item.Apellido_Materno)
  }

  return (
    <div className="container">
      <h1 className="text-center mt-3">CRUD ESCUELA PRUEBA</h1>
      <hr />
      <div className="row">
         <div className="col-8">
          <h4 className="text-center">Identidad del Alumno</h4>
          <ul className="list-group">
            {
              IDS.map((item) => {
                return(
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.ID, Nombre, ApellidoP, ApellidoM }</span>
                    <button className='btn btn-danger  btn-small float-right mx-2'
                    onClick={() => eliminar(item.id)}
                    >
                    Eliminar
                    </button>
                    <button className='btn btn-warning  btn-small float-right '
                    onClick={() => activarEdicion(item)}>
                    Modificar
                    </button>
                 </li>
                )
              })
            }
            
          </ul>
         </div>
         <div className="col-4">
          <h4 className="text-center">{modoEdicion ? 'Ingresar Datos del Alumno' : 'Agregar'}</h4>
          <form onSubmit={agregar}>
            <input type="text" className="form-control mb-4" placeholder="ID" onChange={(e) => setID(e.target.value)} value={ID}></input>
            <input type="text" className="form-control mb-4" placeholder="Nombre(s)" onChange={(e) => setnombre(e.target.value)} value={Nombre}></input>
            <input type="text" className="form-control mb-4" placeholder="Apellido Paterno"onChange={(e) => setapellidop(e.target.value)} value={ApellidoP}></input>
            <input type="text" className="form-control mb-4" placeholder="Apellido Materno"onChange={(e) => setapellidom(e.target.value)} value={ApellidoM}></input>
            <button className={modoEdicion ? 'btn btn-dark btn-block': 'btn btn-warning btn-block'}>{modoEdicion ? 'Agregar' : 'Editar'}</button>
          </form>
         </div>
      </div>
    </div>
     );
}

export default App;
