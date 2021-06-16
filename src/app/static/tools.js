function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', init);
function init() {
    if (window.location.toString().search("/admin/users") != -1) {
        document.querySelector('#addUserButton').onclick = addUserForm;
        document.querySelector('#uploadUsers').onclick = Upload;
        document.querySelector('#uploadUsers').dataset.value = 'user';
    }
    if (window.location.toString().search("/admin/groups") != -1) {
        document.querySelector('#addGroupButton').onclick = addGroupForm;
        document.querySelector('#uploadGroups').onclick = Upload;
        document.querySelector('#uploadGroups').dataset.value = 'group';
    }
    if (window.location.toString().search("/admin/semesters") != -1) {
        document.querySelector('#addSemesterButton').onclick = addSemesterForm;
        document.querySelector('#uploadSemesters').onclick = Upload;
        document.querySelector('#uploadSemesters').dataset.value = 'semester';
    }
    if (window.location.toString().search("/admin/") != -1) {
        document.getElementsByClassName('btn-danger').onclick = function () {
            alert(3);
        };
        els = document.getElementsByClassName('btn-danger');
        l = els.length;
        for (var i = 0; i < l; i++) {
            els[i].onclick = function () {
                if (window.location.toString().search("/admin/projects") != -1) {
                document.querySelector('#delete-placeholder').innerHTML = `Удалить "${this.parentElement.parentElement.children[2].innerHTML}"?`;
                }
                else {
                    document.querySelector('#delete-placeholder').innerHTML = `Удалить "${this.parentElement.parentElement.children[1].innerHTML}"?`;
                }
            };
        }
    }


}
function addUserForm() {
    let form = document.forms[document.forms.length - 1];
    //login
    //first_name
    //last_name
    //middle_name
    //password
    //role_id
    cloneForm = form.cloneNode(true);
    cloneForm.elements.role_id.value = form.elements.role_id.value;
    cloneForm.elements.login.value = '';
    cloneForm.elements.first_name.value = '';
    cloneForm.elements.last_name.value = '';
    cloneForm.elements.middle_name.value = '';
    cloneForm.elements.password.value = '';
    // console.log(cloneForm.elements.curators_ids);

    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    var pArea = document.getElementById('project-area');
    pArea.insertBefore(cloneForm, pArea.children[pArea.children.length - 2].nextElementSibling);
}

function addGroupForm() {

    let form = document.forms[document.forms.length - 1];
    //name
    //description
    //direction_id
    cloneForm = form.cloneNode(true);
    cloneForm.elements.direction_id.value = form.elements.direction_id.value;
    cloneForm.elements.name.value = '';
    cloneForm.elements.description.value = '';
    // console.log(cloneForm.elements.curators_ids);

    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    var pArea = document.getElementById('project-area');
    pArea.insertBefore(cloneForm, pArea.children[pArea.children.length - 2].nextElementSibling);

}

function addSemesterForm() {
    let form = document.forms[document.forms.length - 1];
    //name
    //description
    //direction_id
    cloneForm = form.cloneNode(true);
    cloneForm.elements.name.value = '';
    cloneForm.elements.description.value = '';
    // console.log(cloneForm.elements.curators_ids);

    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    var pArea = document.getElementById('project-area');
    pArea.insertBefore(cloneForm, pArea.children[pArea.children.length - 2].nextElementSibling);
}

async function Upload() {
    // alert(this.dataset.value);
    this.onclick = function () {
        return false;
    }
    let form = document.forms[document.forms.length - 1];
    forms = document.forms;
    cloneForm = forms[0].cloneNode(true);
    if (this.dataset.value == "user")
    {
    cloneForm.elements.role_id.value = form.elements.role_id.value;
    cloneForm.elements.login.value = '';
    cloneForm.elements.first_name.value = '';
    cloneForm.elements.last_name.value = '';
    cloneForm.elements.middle_name.value = '';
    cloneForm.elements.password.value = '';
    }
    else if(this.dataset.value == "semester") {
    cloneForm.elements.name.value = '';
    cloneForm.elements.description.value = '';
    }
    else if (this.dataset.value == "group"){
    cloneForm.elements.direction_id.value = form.elements.direction_id.value;
    cloneForm.elements.name.value = '';
    cloneForm.elements.description.value = '';
    }
    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    button = document.getElementById('button-footer');
    button.style.display = "none";
    var success = 0;
    var error = 0;
    console.log(forms);
    var onDelete = []
    let formLength = forms.length;
    for (var i = 0; i < forms.length; i++) {

        let urlDir = url + `/admin/add${this.dataset.value}`;
        let uri = new URL(urlDir);
        var body = new FormData(forms[i]);
        await sleep(1000);
        if (body.get('checkbox')) {
        }
        else {
            body.delete('checkbox');

            sendRequest(uri, 'POST', function () {
                if (this.response == "complete add") {
                    p = document.getElementById('upload-placeholder');
                    p.innerHTML = `${i} из ${formLength}`;
                    button = document.getElementById('button-footer');
                    button.style.display = "";
                    success++;

                } else {
                    error++;
                }
            }, body);

            forms[i].innerHTML = '';
            onDelete.push(forms[i].id);
        }
        console.log(onDelete);
    }
    for (var i = 0; i < onDelete.length; i++) {
        if (onDelete[i] != "") {
            console.log(onDelete.length);
            projectArea = document.getElementById('project-area');
            onDeleteForm = document.getElementById(onDelete[i]);
            projectArea.removeChild(onDeleteForm);
            onDelete[i] = "";
        }
    }

    p1 = document.getElementById('upload-results');
    p1.innerHTML = `${success + 1} проектов успешно загружено, при загрузке ${error} произошла ошибка`;
    successCheck = document.getElementById('uploader-success');
    successCheck.innerHTML = '';
    ico = document.createElement('i');
    ico.classList.add('fa');
    ico.classList.add('fa-check');
    successCheck.appendChild(ico);
    projectArea = document.getElementById('project-area');
    if (projectArea.children.length < 1) {
        projectArea.appendChild(cloneForm);
    }

}