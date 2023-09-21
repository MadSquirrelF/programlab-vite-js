import '../scss/app.scss';

fetch("/src/js/data.json").then(response => response.json()).then(data => {
    for (let i = 0; i < data.results.length; i = i + 1) {
        let link = document.createElement('li');
        link.classList.add('header__result-item');
        link.innerText = data.results[i];
        document.querySelector('.header__result-list').append(link);
    }
})

document.querySelector('#elastic').oninput = function() {
  let val = this.value.trim().toLowerCase();
  let elasticItems = document.querySelectorAll('.header__result-box .header__result-list .header__result-item');
  let resultBox = document.querySelector('.header__result-box');
  let input = document.querySelector('.header__search-box .header__input-container');
  if (val != ''){
      resultBox.classList.add('active');
      input.classList.add('active');
      let emptySearch = 0;
      elasticItems.forEach(function (elem) {
        if (elem.innerText.search(val) == -1) {
            elem.classList.add('hide');
            emptySearch = emptySearch + 1;
            elem.innerHTML = elem.innerText.toLowerCase();
        }
        else{ 
            elem.classList.remove('hide');
            let str = elem.innerText.toLowerCase();
            elem.innerHTML = insertMark(str,elem.innerText.search(val), val.length);
        }    
      });
      if (emptySearch === elasticItems.length){
        resultBox.classList.remove('active');
        input.classList.remove('active');
      }
  }
  else{
      resultBox.classList.remove('active');
      input.classList.remove('active');
      elasticItems.forEach(function (elem){
              elem.classList.remove('hide');
              elem.innerHTML = elem.innerText.toLowerCase();
      });
  }
}

function insertMark(string,pos,len){
   return string.slice(0, pos)+'<span>'+string.slice(pos,pos+len)+'</span>'+string.slice(pos+len);
}