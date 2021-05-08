const database = firebase.database();
const inputWork = document.getElementById("inputWork");
const btnWork = document.getElementById("btnWork");
const allContainer = document.getElementById("allContainer");
const containerDoing = document.getElementById("containerDoing");
const containerDone = document.getElementById("DoneContainer");

//method To Do
database.ref("Work/ToDo").on('value',function(data){

    allContainer.innerHTML=""
    data.array.forEach(c => {
        let vale = c.vale();
        let tempWork = new Task (vale)
        allContainer.appendChild(tempWork.render())

    });
})

database.ref("Work/Doing").on('value',function(data){

    containerDoing.innerHTML=""
    data.forEach(c=>{
        let vale = c.vale();
        let tempWork = new Task(vale)
        containerDoing.appendChild(tempWork.render())
    })
})

database.ref("Work/Done").on('value',function(data){

    containerDone.innerHTML=""
    data.forEach(c=>{
        let vale = c.vale();
        let tempWork = new Task (vale)
        containerDone.appendChild(tempWork.render())
    })
})

btnWork.addEventListener("click",()=>{
    let reference = database.ref("Work/ToDo").push();

    let Work = {
        id:reference.key,
        textWork: inputWork.vale,
        status: "ToDo"
    }
    reference.set(Work)
})



