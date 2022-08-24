const paginacion = document.getElementById('paginacion')
const tabla = document.getElementById('tabla')

let tbody

addEventListener('load', cargar())

function cargar() {
    fetch('./src/carga.php')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((habilidad) =>
                llenarTabla(habilidad, data.indexOf(habilidad))
            )
            paginar(1)
        })
        .then(() =>
            document
                .querySelectorAll('#paginacion a')
                .forEach((a) =>
                    a.addEventListener('click', () => paginar(a.dataset.pag))
                )
        )
}

function llenarTabla(habilidad, index) {
    if (index % 2 === 0) {
        tbody = document.createElement('tbody')
        tbody.id = 'pag' + (index / 2 + 1)
    }

    const fila = tbody.insertRow()
    fila.insertCell(0).innerHTML = habilidad.name
    fila.insertCell(1).innerHTML = habilidad.url

    if (index % 2 !== 0) {
        const a = document.createElement('a')
        const pagina = (index + 1) / 2

        a.setAttribute('data-pag', pagina)
        a.innerText = pagina

        tabla.append(tbody)
        paginacion.append(a)
    }
}

function paginar(pagina) {
    document
        .querySelectorAll('tbody')
        .forEach((tbody) => (tbody.style.display = 'none'))
    document.getElementById('pag' + pagina).style.display = 'table-row-group'
}
