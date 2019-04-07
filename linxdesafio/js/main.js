   /** Desafio Linx vaga de estagio fullstack Abril de 2019
    *  Lucas Battistella
    *  Implementacao de uma vitrine
    *  com callback para obter conteudo
    */

    /** Funcoes de efeito visual por mouseover mouseoff 
     *  @param {div} x 
     *  muda o estilo com ~inline css
     *  para mudar para outro estilo com css externo:
     *  x.style = "estiloDesejado";
     */
    function changeTo(x) {
        x.style.backgroundColor = "rgba(15, 119, 204, 0.548)";
    }
    function changeBack(x) {
        x.style.backgroundColor = "rgba(255, 255, 255, 1)";
    };


    /** Busca dados pelo callback 
     *  adiciona aos recursos o endereço do servico e
     *  com a resposta executa a funcao esperador
     */
     
    window.X = function (response) {
       esperador(response);
       };
    var src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    
    /** Para garantir execuçao sequencial
     * todas as funcoes que operam sobre a pagina
     * sao filhas da que recebe os dados
     * @param {objeto JSONP} data 
     * (~ Linhas parecem iguais em secoes, 
     * talvez encapsular em uma funcao que seja chamada duas vezes ~)
     */
var esperador = function(data) {

    /*preenche referencia*/
    var itemref = data.data.reference.item;
    var box = document.getElementById("reference");
    var templateitem = document.getElementById("templateitem").innerHTML;
    var html = Mustache.to_html(templateitem, itemref);
    box.innerHTML = html;

    /*preenche widget.size * recomendados*/
    var itemrec = data.data.recommendation;
    var holder = document.getElementById("recomendation");
    for (i=0; i<data.data.widget.size; i++){
        var htmlcontent = Mustache.to_html(templateitem, itemrec[i]);
        holder.innerHTML =holder.innerHTML + htmlcontent;
    }




    /** funcao que trata os botoes de navegacao
     *  @param {number} index
     * @param {number} increase
     * @param {number} itemlen
     * @param {number} telalen
     * Toda vez que clica um dos botoes
     * pega o tamanho do item
     * pega o tamanho do espaco dos recomendados que está sendo exibido
     * avanca/recua (dependendo do increase) o index pra exibir totalmente
     * o primeiro que ainda não foi exibido totalmente  
     * (~ Talvez nao seja o comportamento desejado, mas é razoavel ~)
     */
    let liEls = document.querySelectorAll('ul li');
    let index = 0;
    window.show = function(increase) {
        itemlen = document.getElementById("reference").clientWidth;
        telalen = document.getElementById("recomendation").clientWidth;
        if (increase > 0){
            index += Math.floor(telalen/itemlen);
        }
        else {
            index -= Math.floor(telalen/itemlen);        
        }
        index = Math.min (Math.max(index,0), liEls.length-1);
        liEls[index].scrollIntoView({behavior: 'smooth'});
    }
}