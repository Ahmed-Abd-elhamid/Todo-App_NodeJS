let count = 1;
let form = document.forms.todo;
let appear = true;

function addTask() {
    if (count < 8) {
        count++;
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'tasks';
        input.id = `task${count}`;
        input.placeholder = `Task ${count}`;
        input.className = 'mt-1 text-center';
        input.required = true;
        document.getElementById('tasks').appendChild(input);
    } else {
        alert("Maximum number of Tasks");
    }
}

function rmTask(){
    if (count > 1){
        document.getElementById(`task${count}`).remove();
        count --;
    }else{
        alert("Minimum number of Tasks");
    }
}

function validateForm(){
    if (form.title.value == "") {
        alert("Title must be filled out");
        return false;
    }
    if (form.deadline.value == "") {
        alert("Deadline must be filled out");
        return false;
    }
    form.tasks.forEach((task) => {
        if (task.value == ""){
            alert("Tasks must be filled out");
            return false;
        }
    });
    return true;
}

function show(){
    appear = !appear;
    form.hidden = appear;
}