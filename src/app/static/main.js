let url = window.location.origin;
$(document).ready(function() { // 
    $('.selectpicker').selectpicker();
  });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
window.onload = function () {
    
    if (window.location.toString().search("/view/projects")!=-1){
        // let form = document.forms.search;
        // console.log(form);
        renderPagination();
        document.getElementById('submitForm').onclick = renderPagination;

    }
    if (window.location.toString().search("/admin/addprojects")!=-1){
        
        document.getElementById('addProjectButton').onclick = addForm;
        document.getElementById('uploadProjects').onclick = uploadProjects;
    }

    
    var els = document.getElementsByClassName('route');
    l = els.length;
    for (var i = 0; i< l; i++) {
        els[i].onclick = function() {
            
            showBlink();
            CatchProjectOfDirection(this.dataset.id);
            
        };
        
    }
    
    $(document).scroll(function () {
        $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height());
      });
      var swiper = new Swiper('.swiper-container', {
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,   
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            250: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            550: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            850: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1150: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1450: {
                slidesPerView: 3,
                spaceBetween: 15
            }
        }
      });
}
/// ДЛЯ ПОДГРУЗКИ
showBlink = function() {
    var swiper = document.getElementById('swiperDisplay')
    var cardPlace = document.getElementById('swiper')
    swiper.style.display = '';
    cardPlace.innerHTML = '';
    for (i = 0; i < 9; i++) {
        
    
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");    
        cardContainer.classList.add("swiper-slide");  
          
        var card = document.createElement("div");
        
        card.classList.add("swiper-card"); 
        card.classList.add("ph-item"); 
        
        cardCircle = document.createElement("div");
        cardCircle.classList.add("swiper-circle"); 
       
        cardTitle = document.createElement("div");
        
    
        cardCircle.appendChild(cardTitle);
        
        cardBody = document.createElement("div");
        cardBody.classList.add("swiper-content"); 
    
        cardText = document.createElement("p")
        cardText.classList.add("card-text");
        
        cardButton = document.createElement("a")
        cardButton.classList.add("btn");
        cardButton.classList.add("btn-primary");
        cardButton.innerHTML = "Перейти";
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardButton);
        
        card.appendChild(cardCircle);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
        cardPlace.appendChild(cardContainer);
    
        }
}

CatchProjectOfDirection =  async function(directionID) {
    let urlDir = url + '/direction';
    let uri = new URL(urlDir);
    var body = new FormData();
    body.append("direction_id", directionID);

    sendRequest(uri,'POST',function () {

        setTimeout(() => ShowProjects(this.response), 2000);
    }, body);


}

/// ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
ShowProjects = function(response) {
    var swiper = document.getElementById('swiperDisplay')
    var cardPlace = document.getElementById('swiper')
    swiper.style.display = '';
    cardPlace.innerHTML = '';
    if (response.length < 1) {

    }
    else
    {
    
    for (i in response) {
    
    
    var cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");    
    cardContainer.classList.add("swiper-slide");  
      
    var card = document.createElement("div");
    
    card.classList.add("swiper-card"); 
    
    cardCircle = document.createElement("div");
    cardCircle.classList.add("swiper-circle"); 
   
    cardTitle = document.createElement("h4");
    
    cardTitle.innerHTML = response[i].semester.name;

    cardCircle.appendChild(cardTitle);
    
    cardBody = document.createElement("div");
    cardBody.classList.add("swiper-content"); 

    cardText = document.createElement("p")
    cardText.classList.add("card-text");
    cardText.innerHTML = response[i].name;
    cardButton = document.createElement("a")
    cardButton.classList.add("btn");
    cardButton.classList.add("btn-primary");
    cardButton.href = url + '/view/project/' + response[i].id; 
    cardButton.innerHTML = "Перейти";
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    
    card.appendChild(cardCircle);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    cardPlace.appendChild(cardContainer);

    }
}
    var swiper = new Swiper('.swiper-container', {
        updateOnWindowResize: true,
        observer: true,
        observeParents: true,   
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            250: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            550: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            850: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1150: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1450: {
                slidesPerView: 3,
                spaceBetween: 15
            }
        }
      });
}

sendRequest = function(url, method, onloadHandler, params){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send(params);
}

renderPagination = function() {
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
        page_val = event.target.value;
        body.append("page", page_val);
        sendRequest(uri,'POST',function () {
            if (this.response[3].length>0){
            renderDirectionResponse(this.response);
            renderButtons(this.response[0],first=false);
            }
            else {
                printEmpty();
            }
        }, body);

     }
     catch(e){
         alert('ТРЕВОГА, НА СЕРВЕРЕ ЗАМЕЧЕНЫ УКРАИНЦЫ. МАССОВАЯ ЭВАКУАЦИЯ');
         sendRequest(uri,'POST',function () {
            renderDirectionResponse(this.response);
            renderButtons(this.response[0]);
        },body);
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
renderDirectionResponse = function(response){
  
    var cardPlace = document.getElementById('projects');
    cardPlace.innerHTML = '';
    for (i in response[3]) {
    var cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");    
      
    var card = document.createElement("div");
    
    card.classList.add("swiper-card"); 
    card.classList.add("d-flex"); 
    card.classList.add("flex-column"); 
    cardCircle = document.createElement("div");
    cardCircle.classList.add("swiper-circle"); 
   
    cardTitle = document.createElement("h4");
    
    cardTitle.innerHTML = response[3][i].semester.name;

    cardCircle.appendChild(cardTitle);
    
    cardBody = document.createElement("div");
    cardBody.classList.add("swiper-content"); 

    cardText = document.createElement("p")
    cardText.classList.add("card-text");
    cardText.innerHTML = response[3][i].name;
    cardButton = document.createElement("a")
    cardButton.classList.add("btn");
    cardButton.classList.add("btn-primary");
    cardButton.href = url + '/view/project/' + response[3][i].id; 
    cardButton.innerHTML = "Перейти";
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    
    card.appendChild(cardCircle);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    cardPlace.appendChild(cardContainer);    


    }
    
}

renderButtons = function(response){
    var pagination = document.getElementById('pagination');
    pagination.style.display = '';
    pagination.children[0].children[0].value = response.page-1;
    pagination.children[0].children[0].onclick =  renderPagination;
    if (response.page == response.iter_pages[0]) {
       pagination.children[0].classList.add('disabled');
    }
    else {
        pagination.children[0].classList.remove('disabled');
    }
    pLength = pagination.children.length-1;
    for (var i = 1; i< pLength; i++ ) {
        // console.log(pagination.children.length);
       pagination.children[1].remove();
    }
    for (i in response.iter_pages){
        li = document.createElement('li');
        li.classList.add('page-item');
        a = document.createElement('a');
        
        if (response.iter_pages[i]==response.page){
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
        a.onclick =  renderPagination;
        a.value = response.iter_pages[i];
        li.appendChild(a);
        pagination.insertBefore(li, pagination.children[i].nextElementSibling);
        
    }
    // pagination.children[pagination.children.length-1] = response.page +1;
    pagination.children[pagination.children.length-1].children[0].value = response.page ? response.page+1 : 1;
    pagination.children[pagination.children.length-1].children[0].onclick = renderPagination;
    if (response.page == response.iter_pages[response.iter_pages.length-1]) {
        pagination.children[pagination.children.length-1].classList.add('disabled');
     }
     else{
        pagination.children[pagination.children.length-1].classList.remove('disabled');
     }
}

printEmpty = function() {
    var pagination = document.getElementById('pagination');
    pagination.style.display = 'none';
    var cardPlace = document.getElementById('projects');
    cardPlace.innerHTML = '';
    var h3 = document.createElement('h3');
    h3.innerHTML = "Ничего не найдено :(";
    cardPlace.appendChild(h3);
}
addForm = function() {
    
    let form = document.forms[document.forms.length-1];
    
    cloneForm = form.cloneNode(true);
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.direction_id.value = form.elements.direction_id.value;
    cloneForm.elements.semester_id.value = form.elements.semester_id.value;
    cloneForm.elements.name.value = '';
    cloneForm.elements.curator_id.value = '';
    // console.log(cloneForm.elements.curators_ids);
    
    cloneForm.name = `${Math.round(Math.random()*10000)}`;
    cloneForm.id = `${Math.round(Math.random()*10000)}`;
    var pArea = document.getElementById('project-area');
    pArea.append(cloneForm);
    
}

uploadProjects =  async function() {
    document.getElementById('uploadProjects').onclick = function() {
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
    
    cloneForm.name = `${Math.round(Math.random()*10000)}`;
    cloneForm.id = `${Math.round(Math.random()*10000)}`;
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
            
                sendRequest(uri,'POST', function() {
                    if (this.response== "complete add"){
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
        if (onDelete[i]!="") {
        console.log(onDelete.length);
        projectArea = document.getElementById('project-area');
        onDeleteForm = document.getElementById(onDelete[i]); 
        projectArea.removeChild(onDeleteForm);
        onDelete[i] = "";
        }
    }
    
    p1 = document.getElementById('results');
    p1.innerHTML = `${success+1} проектов успешно загружено, при загрузке ${error} произошла ошибка`;
    successCheck = document.getElementById('loader-success');
    successCheck.innerHTML = '';
    ico = document.createElement('i');
    ico.classList.add('fa');
    ico.classList.add('fa-check');
    successCheck.appendChild(ico);
    projectArea = document.getElementById('project-area');
    if (projectArea.children.length<1) {
        projectArea.appendChild(cloneForm);
    }
    
}
