const tablaAlumnos = document.querySelector("#tablaAlumnos tbody");
const tablaRegistro = document.querySelector("#tablaRegistro tbody");
const curso = document.getElementById("curso");
const materia = document.getElementById("materia");
const fecha = document.getElementById("fecha");

fecha.valueAsDate = new Date();

 function cargarCursos() {
   fetch('http://localhost:3000/api/cursos');
        const data = await res.json();

        const select = document.querySelector('#curso');
        select.innerHTML = '';

        for (let curso of data) {
            const option = document.createElement('option');
            option.textContent = ${curso.anio} ${curso.division} ${curso.esp};
            option.value = curso.id;
            select.append(option);
        }
    } catch (err) {
        alert(err.stack);
    }
}
 function cargarAlumnos(e) {
    e.preventDefault();
   Let lista = e.target.lista.value.split('\n');
    Let data = [];

    for (let elem of lista) {
        const alumno = {};
        alumno.nombres = elem.split(' ')[0];
        alumno.apellidos = elem.split(' ')[1];
        alumno.curso = e.target.curso.value;
        data.push(alumno);
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const res = await fetch('http://localhost:3000/api/alumnos', options);
    

        console.log('Alumnos cursos');
    } catch (err) {
        alert(err.stack);
    }

    e.target.reset();
    cargarCursos();
}

 function marcar(id, estado) {
    
    await fetch("/api/asistencia", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            alumno_id: id,
            fecha: fecha.value,
            estado: estado,
            materia_id: materia.value,
            hora: document.getElementById(hora-${id}).value
        })
    });
    cargarRegistro();
}
 function cargarRegistro() {
    
    const res = await fetch(/api/asistencia/${fecha.value});
    const datos = await res.json();

    tablaRegistro.innerHTML = "";
    datos.forEach((a, i) => {
        tablaRegistro.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${a.apellido}</td>
                <td>${a.nombre}</td>
                <td>${a.estado}</td>
                <td>${a.hora_ingreso || ""}</td>
                <td>${a.hora_egreso || ""}</td>
            </tr>
        `;
    });
}

curso.addEventListener("change", cargarAlumnos);
fecha.addEventListener("change", cargarRegistro);

cargarCursos();
