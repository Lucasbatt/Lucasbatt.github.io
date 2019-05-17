
const vizinhos =    [["A","B"],["A","C"],["B","P"],
                    ["B","G"],["C","O"],["C","F"],
                    ["G","N"],["G","L"],["G","O"],
                    ["F","M"]];
const custo = {"A":5, "C":10, "G":20, "L": 13, "O": 40, 
                "P": 10, "F": 50, "B": 5, "M": 13, "N": 13};
const prioridade = {"A":512, "C":256, "G":128, "L": 64, "O": 32, 
                "P": 16, "F": 8, "B": 4, "M": 2, "N": 1};
// const beta = 30;

//  var aval = {ligados: "A", custo: custo.A, prior: prioridade.A };
// var inicio = "A";

function religar(estado_nodos, beta) {
    let new_states = [];
    for (let l = 0; l < estado_nodos.ligados.length; l++) { /** estado_nodos.ligados eh um string com os estados ligados */
        let lig = estado_nodos.ligados[l];                  /** para cada letra que aparace, confere se existe uma possivel nova ligacao no vetor de vizinhos */
        for (let v = 0; v < vizinhos.length; v++) {         /** se tem, pega o outro vizinho (relacionado), se ja nao aparece na string de ligados, liga */
            let viz = vizinhos[v];
            if ((viz[0] === lig) && (!estado_nodos.ligados.includes(viz[1]))) {
                state = {ligados : estado_nodos.ligados + [viz[1]],custo: estado_nodos.custo +custo[viz[1]], prior: estado_nodos.prior + prioridade[viz[1]]}
                if (state.custo <= beta){ /** so adiciona na lista de retorno se o custo é atendivel */
                    new_states.push(state)
                }
            }                    
            if ((viz[1] === lig) && (!estado_nodos.ligados.includes(viz[0]))){
                state = {ligados : estado_nodos.ligados + [viz[0]],custo: estado_nodos.custo +custo[viz[0]], prior: estado_nodos.prior + prioridade[viz[0]]}
                if (state.custo <= beta) {
                    new_states.push(state)
                }
            }
            
        }
    }
    // console.log("novos estados adicionados nessa religa", new_states);
    return new_states
}
function tohtml(estado_max, beta) {
    estado_max.beta = beta;
    var box = document.getElementById("resultado");
    var template = document.getElementById("template").innerHTML;
    var html = Mustache.to_html(template, estado_max);
    box.innerHTML = box.innerHTML + html;
    
}
function resgata(){  /** pega os valores colocados nos inputs e executa play se for um nodo valido */
    origin = document.getElementById("origem_A").value;
    value = document.getElementById("numerobeta").value;
    // console.log("resultados", origin, value);
    if (typeof(prioridade[origin]) == "number"){
        play(origin, value);
    }
    else{
        alert("Digite um inicio valido");
    }
}


function play(inicio, beta) {
    // console.log(inicio , beta);
    let aval = {ligados: inicio, custo: custo[inicio], prior: prioridade[inicio]};
    // console.log(aval);
    if (beta>aval.custo) {  /** pode ligar o primeiro */
        var fila= [aval];
        let estado_max = aval;
        while (fila.length != 0) { /** while fila não vazia => faz */
            novos_estados = religar(fila.shift(), beta);
            for (let s = 0; s < novos_estados.length; s++) {
                let nstate = novos_estados[s];
                fila.push(nstate);
                // console.log("add mais um", nstate);
                if (nstate.prior > estado_max.prior) {
                    estado_max = nstate;
                    // console.log("melhorou");
                }
            }
        } /** end while */
        console.log("estado maximo é ", estado_max);
        tohtml(estado_max, beta);
    }
    else{ /** não deu pra ligar o primeiro */
        alert("Beta muito pequeno");
       // tohtml(" erro beta muito pequeno")    
    }

}

