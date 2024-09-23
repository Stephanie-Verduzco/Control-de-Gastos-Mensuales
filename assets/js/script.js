let listaNombresGastos = [];
let listaValorGastos = [];
let listaDescripcionGastos = [];

let estaEditando = false;
let indiceGastoEditado = null;

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGastos = document.getElementById('descripcionGasto').value;

    if(estaEditando) {
      listaNombresGastos[indiceGastoEditado] = nombreGasto;
      listaValorGastos[indiceGastoEditado] = valorGasto;
      listaDescripcionGastos[indiceGastoEditado] = descripcionGastos;

      document.getElementById('botonFormulario').textContent = "Guardar Cambios";

      estaEditando = false;
      indiceGastoEditado = null;

    } else {
      listaNombresGastos.push(nombreGasto);
      listaValorGastos.push(valorGasto);
      listaDescripcionGastos.push(descripcionGastos);
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const cantidadTotalGastos = document.getElementById('totalGastos');
    const listaDescripcion = document.getElementById('listaDescripcionGastos');

    let listaHtml = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValorGastos[posicion]);
        const descripcion = listaDescripcionGastos[posicion];

        listaHtml += `<li>${elemento} - (${descripcion}) - USD ${valorGasto.toFixed(2)}
                    <button  class="botonEdit"; onclick="editarGasto(${posicion});">Editar</button>
                    <button  class="botonElim"; onclick="eliminarGasto(${posicion});">Eliminar</button>
                    </li>`;
        
        listaElementos.innerHTML = listaHtml;

        //Calcular el total de los gastos
        totalGastos += Number(valorGasto);
        console.log(totalGastos);
    });

        if(totalGastos > 150) {
          let respuesta = confirm("Los gastos han excedido los $150 USD. ¿Desea continuar?");

          if(respuesta) {
            listaElementos.innerHTML = listaHtml;
            cantidadTotalGastos.innerHTML = totalGastos.toFixed(2); 
            console.log("Nuevo gasto agregado exitosamente");

            limpiar();

          } else {
            listaNombresGastos.pop();
            listaValorGastos.pop();
            alert("Se ha cancelado el registro del nuevo gasto.");

            limpiar();

          }
        } else {
            listaElementos.innerHTML = listaHtml;
            cantidadTotalGastos.innerHTML = totalGastos.toFixed(2);

            limpiar();

          } 
          limpiar();
}

function limpiar() {
    nombreGasto.value = '';
    valorGasto.value = '';
    descripcionGasto.value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValorGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
  const nombreGastoEdit = document.getElementById('nombreGasto');
  const valorGastoEdit = document.getElementById('valorGasto');
  const descripcionGastoEdit = document.getElementById('descripcionGasto');

  nombreGastoEdit.value = listaNombresGastos[posicion];
  valorGastoEdit.value = listaValorGastos[posicion];
  descripcionGastoEdit.value = listaDescripcionGastos[posicion];

  let botonAgregarGasto = document.getElementById('botonFormulario');
  botonAgregarGasto.textContent = "Actualizar Datos";

  estaEditando = true;
  indiceGastoEditado = posicion;
}