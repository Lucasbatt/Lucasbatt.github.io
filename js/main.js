   /** Desafio Linx vaga de estagio fullstack Abril de 2019
    *  Lucas Battistella
    *  Implementacao de uma vitrine
    *  com callback para obter conteudo
    */

    /** Funcoes de efeito visual por mouseover mouseoff 
     *  @param {Element} itemExib - incremento do slider 
     *  muda o estilo com ~inline css
     *  para mudar para outro estilo com css externo:
     *  itemExib.style = "estiloDesejado";
     */
    function changeTo(itemExib) {
        itemExib.style.backgroundColor = "rgba(15, 119, 204, 0.548)";
    }
    function changeBack(itemExib) {
        itemExib.style.backgroundColor = "rgba(255, 255, 255, 1)";
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
     * @param {Object} resp - resposta do JSONP
     * @param {Object} resp.data - contem 3 objetos:
     * @param {Object} resp.data.widget - contem um {number} size 
     * (provavelmente usado para definir quantas recomendacoes devem 
     * ser exibidas)
     * @param {Object} resp.data.reference - contem {string} timestamp
     *                                            e {Object} item 
     * @param {Object} resp.data.reference.item - contem:
     *                                              {string} businessID - não usado
     *                                              {string} name - descrição do produto exibida abaixo da imagem
     *                                              {string} imageName - endereco da imagem a ser usada
     *                                              {string} detailUrl - endereco destino, quando clica vai para
     *                                              {string} price - exibido abaixo da descricao
     *                                              {string} oldPrice - se existe esse valor deve se exibido acima do price
     *                                              {Object} productInfo - que cotem: 
     *                                                       {string} paymentConditions
     * @param {Object} resp.data.recommendation - uma lista de Object iguais ao anterior
     * 
     * (~ Linhas parecem iguais em secoes, 
     * talvez encapsular em uma funcao que seja chamada duas vezes ~)
     */
var esperador = function(resp) {

    /*preenche referencia*/
    var itemref = resp.data.reference.item;
    var box = document.getElementById("reference");
    var templateitem = document.getElementById("templateitem").innerHTML;
    var html = Mustache.to_html(templateitem, itemref);
    box.innerHTML = html;

    /*preenche widget.size * recomendados*/
    var itemrec = resp.data.recommendation;
    var holder = document.getElementById("recomendation");
    for (i=0; i<resp.data.widget.size; i++){
        var htmlcontent = Mustache.to_html(templateitem, itemrec[i]);
        holder.innerHTML =holder.innerHTML + htmlcontent;
    }




    /** funcao que trata os botoes de navegacao
     *  @param {number} index
     * @param {number} increase
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
        var itemlen = document.getElementById("reference").clientWidth;
        var telalen = document.getElementById("recomendation").clientWidth;
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