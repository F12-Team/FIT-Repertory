let url = window.location.origin;



window.onload = function () {
    
    if (window.location.toString().endsWith("/view/projects")){
        renderPagination();
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
        console.log(this.response);
        setTimeout(() => ShowProjects(this.response), 2000);
    }, body);


}

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
    cardButton.href = url + 'view/project/' + response[i].id; 
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
    let urlDir = url + '/view/search';
    let uri = new URL(urlDir);
    let form = document.forms.search;
    var body = new FormData(form);


    try {
        var curpage = document.getElementById('current_page');
        page_val = curpage.children[0].value;
        body.append("page", page_val);
       

     }
     catch(e){
         alert('ТРЕВОГА, НА СЕРВЕРЕ ЗАМЕЧЕНЫ УКРАИНЦЫ. МАССОВАЯ ЭВАКУАЦИЯ');
     }
     sendRequest(uri,'POST',function () {
        console.log(this.response);
        renderDirectionResponse(this.response);
        renderButtons(this.response[0]);
    }, body);

    
}

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
    cardButton.href = url + 'view/project/' + response[3][i].id; 
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
    
    // var pagination_items = document.getElementById('pagination_items');
    if (response.page == response.iter_pages[0]) {
       pagination.children[0].classList.add('disabled');
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
        a.classList.add('page-link');
        a.innerHTML = response.iter_pages[i];
        a.onclick =  renderPagination;
        li.appendChild(a);
        pagination.insertBefore(li, pagination.children[i].nextElementSibling);
        
    }

    // <ul class="pagination">
    //   <li class="page-item">
    //     <a class="page-link" href="#" aria-label="Previous">
    //       <span aria-hidden="true">&laquo;</span>
    //       <span class="sr-only">Previous</span>
    //     </a>
    //   </li>
    //   <li class="page-item"><a class="page-link" href="#">1</a></li>
    //   <li class="page-item"><a class="page-link" href="#">2</a></li>
    //   <li class="page-item"><a class="page-link" href="#">3</a></li>
    //   <li class="page-item">
    //     <a class="page-link" href="#" aria-label="Next">
    //       <span aria-hidden="true">&raquo;</span>
    //       <span class="sr-only">Next</span>
    //     </a>
    //   </li>
    // </ul>
}