function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
let url = window.location.origin;
// Для задержки между загрузкои проектов
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
$(document).ready(function () {
    $('select').niceSelect();
});

window.onload = function () {

    $('select').niceSelect('update');
    if (window.location.toString().search("/view/projects") != -1) {
        // let form = document.forms.search;
        // console.log(form);
        renderPagination();
        document.getElementById('submitForm').onclick = renderPagination;

    }
    if (window.location.toString().search("/view/project/") != -1) {
        // let counter = 0;
        project_id = window.location.toString().substring(window.location.toString().indexOf("/view/project/") + 14, window.location.toString().length);
        // проставка лаика в случае cookie == true
        cookie1 = getCookie(project_id);
        if (cookie1 == "true") {
            document.querySelector("#button-like1").checked = true;
        }
        var like = document.querySelector('#button-like1');

        like.onclick = function () {
            cookie = getCookie(project_id);
            if (cookie == "true") {

                let urlDir = url + '/view/like';
                let uri = new URL(urlDir);
                var body = new FormData();
                body.append("like", 'False');
                body.append("project_id", `${project_id}`);
                sendRequest(uri, 'POST', function () {

                    if (this.response == "complete dislike") {
                        document.cookie = `${project_id}=false; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
                        document.querySelector("#plike").innerHTML = parseInt(document.querySelector("#plike").innerHTML, 10) - 1;
                    }
                }, body);

            }
            else {
                let urlDir = url + '/view/like';
                let uri = new URL(urlDir);
                var body = new FormData();
                body.append("like", 'True');
                body.append("project_id", `${project_id}`);
                sendRequest(uri, 'POST', function () {

                    if (this.response == "complete like") {
                        document.cookie = `${project_id}=true; expires=Tue, 19 Jan 2038 03:14:07 GMT`;

                        document.querySelector("#plike").innerHTML = parseInt(document.querySelector("#plike").innerHTML, 10) + 1;
                    }
                }, body);
            }
        }
        // document.cookie = "user1=John2; expires=Tue, 19 Jan 2038 03:14:07 GMT"; // обновляем только куки с именем 'user'
        // console.log(getCookie('name'));
        // console.log(getCookie('user'));
        // if (getCookie('name')){
        //     alert('андефаинд');
        // }
        // if (getCookie('user')){
        //     alert('всё правильно')
        // }

    }
    if (window.location.toString().search("/admin/addprojects") != -1) {

        document.getElementById('addProjectButton').onclick = addForm;
        document.getElementById('uploadProjects').onclick = uploadProjects;
    }


    var els = document.getElementsByClassName('route');
    l = els.length;
    for (var i = 0; i < l; i++) {
        els[i].onclick = function () {
            showBlink(this.children[1].children[0].innerHTML);
            CatchProjectOfDirection(this.dataset.id);

        };

    }
    /*Код для button-top в base-html*/
    jQuery(document).ready(function () {
        var btn = $('#button-top');
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                btn.addClass('show');
            } else {
                btn.removeClass('show');
            }
        });
        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, '300');
        });
    });
}

/// ДЛЯ ПОДГРУЗКИ
showBlink = function (direction) {
    var chosenDirection = document.getElementById('top-proj-derec');
    chosenDirection.innerHTML = direction;
    var cardPlace = document.getElementById('top-cards-flex');
    cardPlace.innerHTML = '';
    for (i = 0; i < 9; i++) {


        var cardContainer = document.createElement("a");
        cardContainer.classList.add("route-to-pr-page");
        cardContainer.classList.add("top-card");

        /// место с картинкои и лаиками
        var card = document.createElement("div");
        card.classList.add('ph-item');
        card.classList.add("top-likes");

        var cardImage = document.createElement('img');
        cardImage.src = "https://img.pikbest.com/01/56/32/93KpIkbEsTjF8.jpg-0.jpg!bw700";
        cardImage.classList.add('card-img-top');
        card.appendChild(cardImage);
        var likePlace = document.createElement('div');
        likePlace.classList.add('bott-right');
        var likeCount = document.createElement('p');
        var heart = document.createElement('i');
        heart.classList.add('bi');
        heart.classList.add('bi-heart');
        likeCount.appendChild(heart);
        likePlace.appendChild(likeCount);
        card.appendChild(likePlace);
        cardContainer.appendChild(card);
        /// Название и описание проекта снизу карточки
        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        var cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.classList.add('fw-bold');

        cardBody.appendChild(cardTitle);
        var cardText = document.createElement('p');
        // cardText.classList.add('card-text');
        cardText.classList.add('ph-col-6');
        cardText.classList.add('empty');
        // cardText.innerHTML = 'amogus';
        cardBody.appendChild(cardText);
        cardContainer.appendChild(cardBody);
        cardPlace.appendChild(cardContainer);

    }
}

CatchProjectOfDirection = async function (directionID) {
    let urlDir = url + '/direction';
    let uri = new URL(urlDir);
    var body = new FormData();
    body.append("direction_id", directionID);

    sendRequest(uri, 'POST', function () {

        // setTimeout(() => ShowProjects(this.response), 10);
        ShowProjects(this.response)
    }, body);


}

/// ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
ShowProjects = function (response) {
    var cardPlace = document.getElementById('top-cards-flex');
    cardPlace.innerHTML = '';
    console.log(response);
    if (response.length < 1) {
        var p = document.createElement('h5');
        p.innerHTML = "Ничего не найдено :("
        cardPlace.appendChild(p)
    }
    else {

        for (i in response) {
            var cardContainer = document.createElement("a");
            cardContainer.classList.add("route-to-pr-page");
            cardContainer.classList.add("top-card");
            cardContainer.href = url + '/view/project/' + response[i].id;
            /// место с картинкои и лаиками
            var card = document.createElement("div");
            card.classList.add("top-likes");

            var cardImage = document.createElement('img');
            cardImage.src = "https://img.pikbest.com/01/56/32/93KpIkbEsTjF8.jpg-0.jpg!bw700";
            cardImage.classList.add('card-img-top');
            card.appendChild(cardImage);
            var likePlace = document.createElement('div');
            likePlace.classList.add('bott-right');
            var likeCount = document.createElement('p');
            likeCount.innerHTML = response[i].likes;
            var heart = document.createElement('i');
            heart.classList.add('bi');
            heart.classList.add('bi-heart');
            likeCount.appendChild(heart);
            likePlace.appendChild(likeCount);
            card.appendChild(likePlace);
            cardContainer.appendChild(card);
            /// Название и описание проекта снизу карточки
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            var cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.classList.add('fw-bold');
            cardTitle.innerHTML = response[i].name;

            cardBody.appendChild(cardTitle);
            var cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.innerHTML = response[i].short_description;
            cardBody.appendChild(cardText);
            cardContainer.appendChild(cardBody);

            cardPlace.appendChild(cardContainer);

        }
    }
}

sendRequest = function (url, method, onloadHandler, params) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);
}

renderPagination = function () {
    // if (form) {
    //     alert('!!!!');
    //     document.getElementById('name').value = form.name.value;
    // }
    // else {
    //     alert('asd');   
    // }
    let urlDir = url + '/view/search';
    let uri = new URL(urlDir);
    let form = document.forms.search;
    // console.log(form);
    var body = new FormData(form);
    // console.log(body);


    try {
        // var curpage = document.getElementById('current_page');
        page_val = this.value;
        body.append("page", page_val);
        sendRequest(uri, 'POST', function () {
            if (this.response[3].length > 0) {
                renderDirectionResponse(this.response);
                console.log(this.response);
                renderButtons(this.response[0], first = false);
            }
            else {
                printEmpty();
            }
        }, body);

    }
    catch (e) {
        alert('ТРЕВОГА, НА СЕРВЕРЕ ЗАМЕЧЕНЫ УКРАИНЦЫ. МАССОВАЯ ЭВАКУАЦИЯ');
        sendRequest(uri, 'POST', function () {
            renderDirectionResponse(this.response);
            renderButtons(this.response[0]);
        }, body);
    }
    // if (page) {

    //     body.append('page',page);

    //     }
    // else {
    //  sendRequest(uri,'POST',function () {
    //     console.log(this.response);
    //     renderDirectionResponse(this.response);
    //     renderButtons(this.response[0]);
    // }, body);
    // }


}
// ДЛЯ СТРАНИЦЫ /view/projects
renderDirectionResponse = function (response) {
    // <a class="to-project-link">
    //     <!--Добавить ссылку на проект-->
    //     <div class="d-flex flex-column bd-highlight">
    //         <div class="d-flex justify-content-between bd-highlight pro-block">
    //             <div class="d-flex flex-column bd-highlight pro-name-napr">
    //                 <p class="fw-bold pro-name">Название проекта</p>
    //                 <!--Добавить название проекта-->
    //                 <p class="pro-derec">Учебное направление СДЕЛАТЬ!!!</p>
    //                 <!--Добавить направление проекта-->
    //             </div>
    //             <p class="pro-like"><i class="bi bi-heart"></i> 2222</p>
    //             <!--Добавить лайки проекта-->
    //             <p class="pro-sem">СЕМЕСТР СДЕЛАТЬ!!!!</p>
    //             <!--Добавить семестр проекта-->
    //         </div>
    //     </div>
    // </a>
    var cardPlace = document.getElementById('projects');
    cardPlace.innerHTML = '';
    for (i in response[3]) {
        var cardContainer = document.createElement('a');
        cardContainer.classList.add("to-project-link");
        var card = document.createElement('div');
        card.classList.add('d-flex');
        card.classList.add('flex-column');
        card.classList.add('bd-highlight');
        //крепить к card
        var escheodindiv = document.createElement('div');
        escheodindiv.classList.add('d-flex');
        escheodindiv.classList.add('justify-content-between');
        escheodindiv.classList.add('bd-highlight');
        escheodindiv.classList.add('pro-block');
        // крепить к escheodindiv
        var cardName = document.createElement('div');
        cardName.classList.add('d-flex');
        cardName.classList.add('flex-column');
        cardName.classList.add('bd-highlight');
        cardName.classList.add('pro-name-napr');
        var p = document.createElement('p');
        p.classList.add('fw-bold');
        p.classList.add('pro-name');
        var p2 = document.createElement('p');
        p2.classList.add('pro-derec');
        p.innerHTML = response[3][i].name;
        cardContainer.href = url + '/view/project/' + response[3][i].id;
        p2.innerHTML = response[3][i].direction.name;
        cardName.appendChild(p);
        cardName.appendChild(p2);
        // крепить к escheodindiv
        var likePlace = document.createElement('p');
        likePlace.classList.add('pro-like');
        likePlace.innerHTML = response[3][i].likes;
        var heart = document.createElement('i');
        heart.classList.add('bi');
        heart.classList.add('bi-heart');
        likePlace.appendChild(heart);
        // крепить к escheodindiv
        var cardSemester = document.createElement('p');
        cardSemester.classList.add('pro-sem');
        cardSemester.innerHTML = response[3][i].semester.name;
        escheodindiv.appendChild(cardName);
        escheodindiv.appendChild(likePlace);
        escheodindiv.appendChild(cardSemester);
        card.appendChild(escheodindiv);
        cardContainer.appendChild(card);
        cardPlace.appendChild(cardContainer);


    }

}

renderButtons = function (response) {
    var pagination = document.getElementById('pagination');
    pagination.style.display = '';
    pagination.children[0].value = response.page - 1;
    pagination.children[0].onclick = renderPagination;
    if (response.page == response.iter_pages[0]) {
        pagination.children[0].classList.add('disabled');
    }
    else {
        pagination.children[0].classList.remove('disabled');
    }
    pLength = pagination.children.length - 1;
    for (var i = 1; i < pLength; i++) {
        // console.log(pagination.children.length);
        pagination.children[1].remove();
    }
    for (i in response.iter_pages) {
        li = document.createElement('li');
        li.classList.add('page-item');
        a = document.createElement('a');

        if (response.iter_pages[i] == response.page) {
            li.classList.add('active');
            li.classList.add('disabled');
            li.id = 'current_page';
            li.value = response.page;
        }
        else {
            li.value = response.iter_pages[i];
        }
        a.classList.add('page-link');
        a.innerHTML = response.iter_pages[i];
        a.onclick = renderPagination;
        a.value = response.iter_pages[i];
        li.appendChild(a);
        pagination.insertBefore(li, pagination.children[i].nextElementSibling);

    }
    // pagination.children[pagination.children.length-1] = response.page +1;
    pagination.children[pagination.children.length - 1].value = response.page + 1;
    pagination.children[pagination.children.length - 1].onclick = renderPagination;
    if (response.page == response.iter_pages[response.iter_pages.length - 1]) {
        pagination.children[pagination.children.length - 1].classList.add('disabled');
    }
    else {
        pagination.children[pagination.children.length - 1].classList.remove('disabled');
    }
}

printEmpty = function () {
    var pagination = document.getElementById('pagination');
    pagination.style.display = 'none';
    var cardPlace = document.getElementById('projects');
    cardPlace.innerHTML = '';
    var h3 = document.createElement('h3');
    h3.innerHTML = "Ничего не найдено :(";
    cardPlace.appendChild(h3);
}
addForm = function () {

    let form = document.forms[document.forms.length - 1];

    cloneForm = form.cloneNode(true);
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.direction_id.value = form.elements.direction_id.value;
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.name.value = '';
    cloneForm.elements.curator_id.value = '';
    // console.log(cloneForm.elements.curators_ids);

    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    var pArea = document.getElementById('project-area');
    pArea.append(cloneForm);

}

uploadProjects = async function () {
    document.getElementById('uploadProjects').onclick = function () {
        return false;
    }
    forms = document.forms;
    cloneForm = forms[0].cloneNode(true);
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.direction_id.value = form.elements.direction_id.value;
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.name.value = '';
    cloneForm.elements.curator_id.value = '';
    // console.log(cloneForm.elements.curators_ids);

    cloneForm.name = `${Math.round(Math.random() * 10000)}`;
    cloneForm.id = `${Math.round(Math.random() * 10000)}`;
    button = document.getElementById('modal-footer')
    button.style.display = "none";
    var success = 0;
    var error = 0;
    console.log(forms);
    // CountProjects = document.getElementById('uploadPlaceholder');
    var onDelete = []
    for (var i = 0; i < forms.length; i++) {

        let urlDir = url + '/admin/addproject';
        let uri = new URL(urlDir);
        var body = new FormData(forms[i]);
        await sleep(2000);
        if (body.get('checkbox')) {
        }
        else {
            body.delete('checkbox');

            sendRequest(uri, 'POST', function () {
                if (this.response == "complete add") {
                    p = document.getElementById('uploadPlaceholder');
                    p.innerHTML = `${i} из ${forms.length}`;
                    button = document.getElementById('modal-footer');
                    button.style.display = "";
                    success++;
                    // onDelete.push(forms[i].id);

                    // console.log(forms[i].id);
                    // projectArea = document.getElementById('project-area');
                    // onDeleteForm = document.getElementById(`${forms[i].id}`); 
                    // projectArea.removeChild(onDeleteForm);
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

    p1 = document.getElementById('results');
    p1.innerHTML = `${success + 1} проектов успешно загружено, при загрузке ${error} произошла ошибка`;
    successCheck = document.getElementById('loader-success');
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
