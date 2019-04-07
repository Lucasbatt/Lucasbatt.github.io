   
   
   
   /* mouse hover functions */
    function changeTo(x) {
        x.style.backgroundColor = "rgba(15, 119, 204, 0.548)";
    }
    function changeBack(x) {
        x.style.backgroundColor = "rgba(255, 255, 255, 0.753)";
    };


    /* Busca dados pelo callback */
     
    window.X = function (response) {
       esperador(response);
       };
    var src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    
var esperador = function(data) {
    const {reference} = data.data;
    console.log(reference,"oie")
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


    let liEls = document.querySelectorAll('ul li');
    let index = 0;
    window.show = function(increase) {
        itemlen = document.body.childNodes[1].childNodes[3].childNodes[3].childNodes[1].clientWidth;
        telalen = document.body.childNodes[1].childNodes[3].childNodes[3].clientWidth;
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