
const vizinhos =    [["A","B"],["A","C"],["B","P"],
                    ["B","G"],["C","O"],["C","F"],
                    ["G","N"],["G","L"],["G","O"],
                    ["F","M"]];
const custo = {"A":5, "C":10, "G":20, "L": 13, "O": 40, 
                "P": 10, "F": 50, "B": 5, "M": 13, "N": 13};
const prioridade = {"A":512, "C":256, "G":128, "L": 64, "O": 32, 
                "P": 16, "F": 8, "B": 4, "M": 2, "N": 1};
const beta = 95;

var aval = {ligados: ["A"], custo: custo.A, prior: prioridade.A}

class nodo {
    constructor(ligados, custo, prioridade) {
        this.ligados = ligados;
        this.custo = custo;
        this.prioridade = prioridade
    }

}


function religar(estado_nodos) {
    let new_states = [];
    for (let l = 0; l < estado_nodos.ligados.length; l++) {
        let lig = estado_nodos.ligados[l];
        for (let v = 0; v < vizinhos.length; v++) {
            let viz = vizinhos[v];
            let viz0 = viz[0];
            let viz1 = viz[1];
            if ((viz[0] === lig) && (!estado_nodos.ligados.includes(viz[1]))) {
                state = {ligados : estado_nodos.ligados + [viz[1]],custo: estado_nodos.custo +custo[viz[1]], prior: estado_nodos.prior + prioridade[viz[1]]}
                if (state.custo <= beta){
                    new_states.push(state)
                }
            }                    
            if ((viz[1] === lig) && (!estado_nodos.ligados.includes(viz[0]))){
                state = {ligados : estado_nodos.ligados + [viz[0]],custo: estado_nodos.custo +custo[viz[0]], prior: estado_nodos.prior + prioridade[viz[0]]}
                if (state.custo <= beta){
                    new_states.push(state)
                }
            }
            
        }
    }
    return new_states
}


function inicializa(ondecomeca){

}

function play() {
    var fila= [aval];
    let estado_max = aval;
    while (fila.length != 0) { /** while fila não vazia => faz */
        novos_estados = religar(fila.shift());
        for (let s = 0; s < novos_estados.length; s++) {
            let nstate = novos_estados[s];
            fila.push(nstate);
            if (nstate.prior > estado_max.prior) {
                estado_max = nstate;
            }
        }
    } /** end while */
    console.log("estado maximo é ", estado_max);

}

