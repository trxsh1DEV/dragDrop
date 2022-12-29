// o target me retorna exatamente o elemento clicado a partir do evento que eu cliquei
// o current target retorna o elemento que tem o evento, no caso o evento "pai"
let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(el=> {
    el.addEventListener('dragstart', dragStart); // Comecei a arrastar o item/elemento.
    el.addEventListener('dragend', dragEnd); // Parei de arrastar.
});

document.querySelectorAll('.area').forEach(area => {
    // Criando e adicionando eventos a area onde podemos soltar os elementos
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

// Transformando neutralArea em uma área "dropável"
document.querySelector('.neutralArea').addEventListener('dragover', (e) => {
    const el = e.currentTarget;
    e.preventDefault();
    el.classList.add('hover');
});
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeave);

document.querySelector('.neutralArea').addEventListener('drop', (e) => {
    const el = e.currentTarget;
    let dragItem = document.querySelector('.item.dragging');
    el.appendChild(dragItem);
    updateAreas();
});

// Functions
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
};

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
};

function dragOver(e){ // Passando por cima
    const el = e.currentTarget;
    if(el.querySelector('.item') === null){
        e.preventDefault(); // Tirando comportamento padrão de negar o drop, ou seja, liberando a função de "dropar"
        el.classList.add('hover');
    }
};

function dragLeave(e){ // Saindo
    // console.log('Saindo da area de drop');
    const el = e.currentTarget;
    el.classList.remove('hover');
};

function drop(e) { // Soltando item nesse local
    const el = e.currentTarget;
    el.classList.remove('hover');
    // console.log(dragItem);

    if(el.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging');
        el.appendChild(dragItem);
        updateAreas();
    }
};

// Logic functions
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let nameArea = area.getAttribute('data-name'); // a,b ou c

        if(!area.querySelector('.item')) return areas[nameArea] = null;

        areas[nameArea] = area.querySelector('.item').innerHTML;
        
        if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
            document.querySelector('.areas').classList.add('correct');
        } else {
            document.querySelector('.areas').classList.remove('correct');
        }
    });
    // if(areas)
}