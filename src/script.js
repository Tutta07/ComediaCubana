
const search_text=document.querySelector("#busqueda input[type=search]");
const search_button=document.querySelector("#busqueda button");
let ghipy={};
let contador=0;
let search_str="";
let pesquisa="";

search_button.addEventListener('click', searchGiphy);
function searchGiphy(){
    pesquisa = search_text.value;
    Resultado();
    document.addEventListener("scroll", function () {
      if ((window.innerHeight + window.pageYOffset ) >= document.body.offsetHeight) {
        Resultado();
      }
    }
)
}
function Resultado(){
  if(contador>=0 && contador<=90){
  search_str="http://api.giphy.com/v1/gifs/search?api_key=aaASJJgSQR21ky6nOFgQuga3EIBclGct&limit=10&offset=" + contador + "&q=" + encodeURI(pesquisa);
  console.log(search_str);
  search_text.value="";
  fetch(search_str).then((response)=>response.json()).then( (data) =>{
    console.log(data);
    contador=contador+10;
    ghipy=data.data;
    Resposta();
  })
}
else{
  search_str="";
}}
function Resposta(){
  const contenedor= document.querySelector("#busqueda");
    for(let item of ghipy){
        let img=document.createElement("img");
        img.src=item.images.fixed_width_small.url;
        contenedor.appendChild(img);
    }
}