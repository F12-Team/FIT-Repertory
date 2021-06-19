function truncate(string) {
    if (string.length<255){
        return string
    }
    else {
        var firstSpace = string.substring(255, substring.length);
        if (string.substring(firstSpace.indexOf(' '),string.length)){
            return string.substring(0,firstSpace.indexOf(' ')) + "..."
        }
        else {
            return string.substring(0, 255) + "..."
        }
    }
}
var currDir = false;
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
    if (window.location.toString().search("/admin/updateproject") == -1) {
        $('select').niceSelect();
    }
});

window.onload = function () {

    if (window.location.toString().search("/admin/updateproject") == -1) {
        $('select').niceSelect('update');
    }


    if (window.location.toString().search("/view/projects") != -1) {
        if (screen.width>1079) {
            document.querySelector('#proj-name1').remove();
        }
        else {
            document.querySelector('#other').remove();
        }
        if (window.location.toString().indexOf("?") != -1) {
            baseUrl = window.location.href.split("?")[0];
            direction_id = window.location.href.split("=")[1];
            window.history.pushState('name', '', baseUrl);
        }
        if (document.querySelector('#search-addon')){
        document.querySelector('#search-addon').onclick = function () {
            if (document.querySelector('#proj-name').value.length > 0) {
                document.querySelector("#clickme").innerText = document.querySelector('#proj-name').value;
                
            }
            else {
                document.querySelector("#clickme").innerHTML = 'Проект...';
            }

        }
        }
        // let select = document.getElementsByClassName("nice-select")[0].children[1].getElementsByTagName('li');
        if (direction_id) {
            let select = document.querySelector("#direction_id").getElementsByTagName('option');
            // let select = document.getElementsByClassName("nice-select")[0].children[1].getElementsByTagName('li');
            // for (let doc =0; doc < select.length; doc++){
            //     if (select[doc].dataset.value == direction_id) {
            //         select[doc].classList.add('selected');
            //         select[doc].classList.add('focus');
            //         alert(select[doc].dataset.value);
            //     }
            // }

            for (let doc = 0; doc < select.length; doc++) {
                if (select[doc].value == direction_id) {
                    select[doc].selected == true;
                }
                else {
                    select[doc].selected == false;
                }
            }
            $(`#direction_id option[value="${direction_id}"]`).attr('selected', true)
            let visualSelect = document.getElementsByClassName("nice-select")[0].children[1].getElementsByTagName('li');
            for (let doc = 0; doc < visualSelect.length; doc++) {
                if (visualSelect[doc].dataset.value == direction_id) {
                    visualSelect[doc].classList.add('selected');
                    visualSelect[doc].classList.add('focus');
                    document.getElementsByClassName("nice-select")[0].children[0].innerHTML = visualSelect[doc].innerHTML;
                }
                else {
                    visualSelect[doc].classList.remove('selected');
                    visualSelect[doc].classList.remove('focus');
                }
            }
            direction_id = null;
        }
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


    }

    //добавление onlick деиствия для карточек на index
    var els = document.getElementsByClassName('route');
    l = els.length;
    for (var i = 0; i < l; i++) {
        els[i].onclick = function () {
            showBlink(this.children[1].children[0].innerHTML, this.dataset.id);
            CatchProjectOfDirection(this.dataset.id);
        };

    }
    // альтернативныи onclick для мобильных устроиств
    if (document.getElementsByClassName('index-sel')[1]) {
        var els1 = document.getElementsByClassName('index-sel')[1].children[1].children;
        l1 = els1.length;
        for (var i = 0; i < l1; i++) {
            els1[i].onclick = function () {
                showBlink(this.innerHTML, this.dataset.value);
                CatchProjectOfDirection(this.dataset.value);

            };

        }
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
showBlink = function (direction, datasetID) {
    document.querySelector("#to-projects").children[0].href = url + `/view/projects?direction_id=${datasetID}`
    // строчка для перехода к выбранным проектам
    var chosenDirection = document.getElementById('top-proj-derec');
    chosenDirection.innerHTML = direction;
    var cardPlace = document.getElementById('top-cards-flex');
    cardPlace.innerHTML = '';
    for (i = 0; i < 9; i++) {
        var cardContainer = document.createElement("a");
        cardContainer.className = 'before_course ph-item';
        //верх с картинкои и лаиками
        var preCourse = document.createElement('div');
        preCourse.className = 'pre_course';
        var cardImage = document.createElement('div');
        cardImage.className = 'course';
        cardImage.style.backgroundImage = `url(${url+"/defposter"})`;
        cardImage.style.position = 'relative';
        var courseLike = document.createElement('div');
        courseLike.className = 'course-like';
        var itemLikes = document.createElement('p');
        // itemLikes.innerHTML = response[i].likes;
        var heart = document.createElement('i');
        heart.className = 'bi bi-heart';
        itemLikes.appendChild(heart);
        courseLike.appendChild(itemLikes);

        cardImage.appendChild(courseLike);
        // низ с названием и описанием
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        var cardName = document.createElement('h5');
        cardName.className = "card-title fw-bold";
        // cardName.innerHTML = response[i].name;
        var cardText = document.createElement('p');
        cardText.className = 'card-text';
        // cardText.innerHTML = response[0].short_description;
        cardBody.appendChild(cardName);
        cardBody.appendChild(cardText);
        cardContainer.appendChild(cardImage);
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

        setTimeout(() => ShowProjects(this.response), 10);
        // ShowProjects(this.response)
    }, body);

}

/// ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
ShowProjects = function (response) {
    var cardPlace = document.getElementById('top-cards-flex');
    cardPlace.innerHTML = '';
    // console.log(response);
    if (response.length < 1) {

        var p = document.createElement('h5');
        p.classList.add('card-title');
        p.classList.add('fw-bold');
        p.innerHTML = "Ничего не найдено :("
        cardPlace.appendChild(p)
    }
    else {
        // console.log(response.length);
        for (i in response) {
            // контреинер к которому всё крепится
            var cardContainer = document.createElement("a");
            cardContainer.className = 'before_course';
            cardContainer.href = url + '/view/project/' + response[i].id;
            //верх с картинкои и лаиками
            var preCourse = document.createElement('div');
            preCourse.className = 'pre_course';
            var cardImage = document.createElement('div');
            cardImage.className = 'course';

            try{
                // console.log(response[i].poster[0].id);
                cardImage.style.backgroundImage = `url(${url+"/images/"+response[i].poster[0].id})`;
                var courseLike = document.createElement('p');
                courseLike.className = 'course-like';
                var heart = document.createElement('i');
                heart.className = 'bi bi-heart';
                courseLike.innerHTML= response[i].likes;
                courseLike.appendChild(heart);
            }
            catch(e){
                cardImage.style.backgroundImage = `url(${url+"/defposter"})`;
                cardImage.style.position = 'relative';
                var courseLike = document.createElement('div');
                courseLike.className = 'course-like';
                var itemLikes = document.createElement('p');
                itemLikes.innerHTML = response[i].likes;
                var heart = document.createElement('i');
                heart.className = 'bi bi-heart';
                itemLikes.appendChild(heart);
                courseLike.appendChild(itemLikes);

            }
            cardImage.appendChild(courseLike);
            // низ с названием и описанием
            var cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            var cardName = document.createElement('h5');
            cardName.className = "card-title fw-bold";
            cardName.innerHTML = response[i].name;
            var cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.innerHTML = truncate(response[0].short_description);
            cardBody.appendChild(cardName);
            cardBody.appendChild(cardText);
            cardContainer.appendChild(cardImage);
            cardContainer.appendChild(cardBody);
            cardPlace.appendChild(cardContainer); 

        }
    }
    baseUrl = window.location.href.split("#")[0];
    window.history.pushState('name', '', baseUrl);
}

sendRequest = function (url, method, onloadHandler, params) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);
}

renderPagination = function () {
    $('html, body').animate({ scrollTop: 0 }, '300');
    document.querySelector('#projects').innerHTML = '';
    document.querySelector("#loading").style.display = '';
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

    var body = new FormData(form);
    try {
        page_val = this.value;
        body.append("page", page_val);
        sendRequest(uri, 'POST', function () {
            if (this.response[3].length > 0) {
                document.querySelector("#loading").style.display = 'none';
                renderDirectionResponse(this.response);

                renderButtons(this.response[0], first = false);

            }
            else {
                document.querySelector("#loading").style.display = 'none';
                printEmpty();
            }
        }, body);

    }
    catch (e) {

        sendRequest(uri, 'POST', function () {
            renderDirectionResponse(this.response);
            renderButtons(this.response[0]);
        }, body);
    }



}

renderDirectionResponse = function (response) {
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
        var cardStat = document.createElement('div');
        cardStat.classList.add('d-flex');
        cardStat.classList.add('justify-content-between');
        cardStat.classList.add('card-stat');
        var likePlace = document.createElement('p');
        likePlace.classList.add('pro-like');

        var heart = document.createElement('i');
        heart.classList.add('bi');
        heart.classList.add('bi-heart');
        likePlace.appendChild(heart);
        likePlace.innerHTML += response[3][i].likes;
        // крепить к escheodindiv
        var cardSemester = document.createElement('p');
        cardSemester.classList.add('pro-sem');
        cardSemester.innerHTML = response[3][i].semester.name;
        escheodindiv.appendChild(cardName);
        // escheodindiv.appendChild(likePlace);
        // escheodindiv.appendChild(cardSemester);
        cardStat.appendChild(cardSemester);
        cardStat.appendChild(likePlace);
        escheodindiv.appendChild(cardStat);
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
        pagination.children[0].onclick = function() {
            return false;
        }
    }
    else {
        pagination.children[0].classList.remove('disabled');
    }
    pLength = pagination.children.length - 1;
    for (var i = 1; i < pLength; i++) {
        pagination.children[1].remove();
    }
    for (i in response.iter_pages) {

        
        var li = document.createElement('li');
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
            li.classList.add('not-displayed');
        }
        a.classList.add('page-link');
        response.iter_pages[i] == null ? a.innerHTML = '...' : a.innerHTML = response.iter_pages[i];
        a.onclick = renderPagination;
        a.value = response.iter_pages[i];
        li.appendChild(a);
        pagination.insertBefore(li, pagination.children[i].nextElementSibling);
    }
    // pagination.children[pagination.children.length-1] = response.page +1;
    pagination.children[pagination.children.length - 1].value = response.page + 1;
    pagination.children[pagination.children.length - 1].onclick = renderPagination;
    if (response.page == response.iter_pages[response.iter_pages.length - 1]) {
        pagination.children[pagination.children.length - 1].onclick = function() {
            return false;
        }
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
