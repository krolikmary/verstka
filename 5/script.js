var btn = document.querySelector("button");
var aa = document.getElementById("words");
var strok = document.getElementById("stroka");
var buttons = document.getElementById("bttns");
var str = aa.value;

var squares = document.getElementsByClassName('square');    //наши передвигающиеся элементы
var rightBox = document.getElementById('col');
var leftBox = document.getElementById('left');
var description = document.getElementById('added_words');


btn.onclick = function() {
   if(aa.value!==""){
        description.innerHTML='';
        leftBox.innerHTML='';
        buttons.innerHTML='';
        str = aa.value;
        strok.innerHTML = 'Строка: ' + str;
        zapoln();
    }
    
};

function zapoln() {
    var arr = str.split("-");
    for (var el in arr) {  
        console.log(el)
    }    
    
    var map = new Array(arr.length);   
    var arr1 = new Array(); //массив слов
    var arr2 = new Array(); //массив цифр
    var count1 = 0; //счетчики
    var count2 = 0;
    
//сортируем массив на массив слов и массив цифр
    const regex = new RegExp(/(\s{2,})/, "g");  //\s- пробел, замена множественных пробелов
    for (var ind in arr) {                          
        if (!/^\s*$/.test(arr[ind])) {  //если не пустое значение
            arr[ind] = arr[ind].trim().replace(regex, " "); //убираем лишние пробелы
            if (/^\d+$/.test(arr[ind])) {   //если число
                arr2[count2] = arr[ind];
                count2++;
            } else {                        //если символьный тип
                arr1[count1] = arr[ind];
                count1++;
            }
        }
    }

    arr1.sort((a, b) => a.localeCompare(b));    //сортировка слов по алфавиту

    arr2.sort(function (a, b) {     //сортировка чисел по возрастанию
        return a - b
    });


    for (var i = 0; i < count1; i++) {  
        map["a" + (i + 1)] = arr1[i];
        console.log(map["a" + (i + 1)])
    }
    for (var j = 0; j < count2; j++) {  
        map["n" + (j + 1)] = arr2[j];
        console.log(map["n" + (j + 1)])
    }

    for (var k in map) {   
        var sq = document.createElement('div');
        sq.innerHTML = k + "   " + map[k];
        sq.id = k;
        sq.classList.add('square');
        sq.draggable = true;
        buttons.appendChild(sq);
    }

    var txt='';
   
    for(subj of squares){
        subj.addEventListener("dragstart", function(e){
            let selected = e.target;

            leftBox.addEventListener("dragover", function(e){
                e.preventDefault(); 
            });
            leftBox.addEventListener("drop", function(e){
                leftBox.insertBefore(selected, leftBox.firstChild);  
                txt = leftBox.innerText;

                description.innerHTML = txt;
                selected=null;
            });
        })
    }
}  
