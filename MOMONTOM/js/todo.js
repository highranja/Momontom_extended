const
    toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];





function deleleToDo(e){
    const btn = e.target,
        li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDos)
    toDos = cleanToDos;
    saveToDos();
}






function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    // 로컬스토리지가 스트링만 받기때문에 자바스크립트 코드를 변환해서  집어넣는다
}





function paintToDo(text){
    const li = document.createElement('li'),
        delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerHTML = "X";
    delBtn.addEventListener('click',deleleToDo)
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    
    const toDoObj = {
        text : text,
        id : newId
    }
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    // toDoInput.value =;
}






function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        // 다시 끌고올때는 오브젝트로 변환
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text)
        });
    } 

}




function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
}
init();