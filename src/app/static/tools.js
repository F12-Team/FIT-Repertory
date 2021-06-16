window.onload = function() {
    if (window.location.toString().search("/admin/users") != -1) {
        document.querySelector('#addUserButton').onclick = addUserForm;
        document.querySelector('#uploadUsers').onclick = upload;
        document.querySelector('#uploadUsers').dataset.value = 'user';
    }
    if (window.location.toString().search("/admin/groups") != -1) {
        document.querySelector('#addGroupButton').onclick = addGroupForm;
        document.querySelector('#uploadGroups').onclick = upload;
        document.querySelector('#uploadGroups').dataset.value = 'group';
    }
    if (window.location.toString().search("/admin/semesters") != -1) {
        document.querySelector('#addSemesterButton').onclick = addSemesterForm;
        document.querySelector('#uploadSemesters').onclick = upload;
        document.querySelector('#uploadSemesters').dataset.value = 'semester';
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
async function upload(){
    // alert(this.dataset.value);
}
function  addSemesterForm() {
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