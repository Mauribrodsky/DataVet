import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

//Creamos un objeto con la información de la cita
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

//Agregamos datos al objeto de la cita
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

//Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
    e.preventDefault();

    //Extraer información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar
    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === ""){
        ui.imprimirAlerta("Todos los campos son obligatorios", 'error');
        return;
    }

    if(editando){
        console.log("Editado correctamente");

        //Pasar el objeto de la edición
        administrarCitas.editarCita({...citaObj})

        //Regresa el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        //Quitar modo edición
        editando = false;

    }else{
        //Generamos un id
        citaObj.id = Date.now();

        //Crear una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //Mensaje
        ui.imprimirAlerta("Se agregó correctamente");
    }

    

    //Reiniciar objeto para la validación
    reiniciarObjeto();

    //Reiniciamos el formulario
    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

export function eliminarCita(id){
    //Eliminar cita
    administrarCitas.eliminarCita(id);
    //Muestra mensaje
    ui.imprimirAlerta("La cita se eliminó correctamente");

    //Refresh de las citas
    ui.imprimirCitas(administrarCitas);
}

export function editarCita(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    //Editamos los imputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenamos el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
    editando = true;
    
}

