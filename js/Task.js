class Task{

    constructor(task){
        this.task = task;
    }

    render = () => {
        let database = firebase.database();
        let d = new Date()
        let date = d.getFullYear()+'-'+(d.getMonth() + 1) + '-' + d.getDate();
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "x"
        btnDelete.className = "btnDelate"
        let btnUpload = document.createElement("button");
        btnUpload.innerHTML = "u"
        btnUpload.className = "btnUpload"
        let btnDown = document.createElement("button");
        btnDown.innerHTML = "d"
        btnDown.className = "btnDown"
        let component = document.createElement("div");
        component.className = "card"
        let date = document.createElement("p");
        date.innerHTML = date
        let allText = document.createElement("div");
        allText.innerHTML = this.task.taskText;

        switch(this.task.status){
            case 'ToDo':
                component.appendChild(btnDelete)
                component.appendChild(date)
                component.appendChild(allText)
                component.appendChild(btnUpload)

                break;

            case 'Doing':
                component.appendChild(btnDelete)
                component.appendChild(date)
                component.appendChild(allText)
                component.appendChild(btnUpload)

                break;
            
            case 'Done':
                component.appendChild(btnDelete)
                component.appendChild(date)
                component.appendChild(allText)
                component.appendChild(btnUpload)
        }

        btnUpload.addEventListener("click",()=> {

            switch(this.task.status){

                case "ToDo":
                    console.log("it's Ok")

                    database.ref("Work/ToDo/"+this.task.id).set(null)
                    this.task.status = "Doing"
                    database.ref("Work/Doing/"- this.task.id).set(this.task);

                    break;

                case "Doing":

                database.ref("Work/ToDo/"+this.task.id).set(null)
                this.task.status = "Done"
                database.ref("Work/ToDo/"+this.task.id).set(this.task)

                    break;
            }

        })

        btnDelete.addEventListener('click',()=>{

            database.ref("Work/" + this.task.status + "/" + this.task.id).set(null)

        })

        btnDown.addEventListener("click", () => {

            switch(this.task.status){

                case "Doing":

                    database.ref("Work/Doing/"+this.task.id).set(null)
                    this.task.status = "Done"
                    database.ref("Work/ToDo/"+this.task.id).set(this.task)

                    break;

                case "Done":

                    database.ref("Work/Done"+ this.task.id).set(null)
                    this.task.status = "Doing"
                    database.ref("Work/Doing/"+this.task.id).set(this.task);

                    break;

            }
        })

        return component;
    }
}