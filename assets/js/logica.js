const asignarEventos = () => {
    document.getElementById('divPopulares').addEventListener('mouseenter', pintarPopulares);
    document.getElementById('divSecundarios').addEventListener('mouseenter', pintarSecundarios);
    document.getElementById('divOtros').addEventListener('mouseenter', pintarOtros);
};

let contadorPopulares = 1;
let contadorSecundarios = 6;
let contadorOtros = 12;

const generadorCrearCardPopulares = crearCardPopulares();
const generadorCrearCardSecundarios = crearCardSecundarios();
const generadorCrearCardOtros = crearCardOtros();

const consumirAPIStarWars = (contador, color) => {
    let url = `https://swapi.dev/api/people/${contador}/`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            let divCard = document.createElement('div');
            divCard.setAttribute("class", "card estilosCards");
            let laClaseCirculo = '';

            switch (color) {
                case 'rojo':
                    laClaseCirculo = "circuloRojo";
                    break;
                case 'verde':
                    laClaseCirculo = "circuloVerde";
                    break;
                case 'azul':
                    laClaseCirculo = "circuloAzul";
                    break;
                default:
                    laClaseCirculo = "circuloDefault";
            }

            divCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">
                        <span class="${laClaseCirculo}"></span> ${data.name}
                    </h5>
                    <p class="card-text">Altura: ${data.height} cm</p>
                    <p class="card-text">Peso: ${data.mass} kg</p>
                </div>
            `;
            document.getElementById('contenedorCards').appendChild(divCard);
        })
        .catch(error => console.log('Error consumiendo la API:', error));
};

const pintarPopulares = () => generadorCrearCardPopulares.next();
const pintarSecundarios = () => generadorCrearCardSecundarios.next();
const pintarOtros = () => generadorCrearCardOtros.next();

function* crearCardPopulares() {
    while (contadorPopulares <= 5) {
        consumirAPIStarWars(contadorPopulares, 'rojo');
        yield contadorPopulares++;
    }
}

function* crearCardSecundarios() {
    while (contadorSecundarios <= 11) {
        consumirAPIStarWars(contadorSecundarios, 'verde');
        yield contadorSecundarios++;
    }
}

function* crearCardOtros() {
    while (contadorOtros <= 17) {
        consumirAPIStarWars(contadorOtros, 'azul');
        yield contadorOtros++;
    }
}
