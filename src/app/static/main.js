let url = window.location;


$('a .scroll').on('click', function() {

    let href = $(this).attr('scroll-target');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 370,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});

window.onload = function () {
    if (window.location.toString().endsWith("/view/projects")){
        renderPagination();
    }

    
    var els = document.getElementsByClassName('route');
    l = els.length;
    for (var i = 0; i< l; i++) {
        els[i].onclick = function() {

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



CatchProjectOfDirection =  async function(directionID) {
    let urlDir = url + 'direction';
    let uri = new URL(urlDir);
    var body = new FormData();
    body.append("direction_id", directionID);
    sendRequest(uri,'POST',function () {
        console.log(this.response);
        ShowProjects(this.response);
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
    for (i in response) {
    
    
    var cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");    
    cardContainer.classList.add("swiper-slide");  
    
    var card = document.createElement("div");
    card.classList.add("swiper-card");    

    cardCircle = document.createElement("div");
    cardCircle.classList.add("swiper-circle"); 

    cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title"); 
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


    // {% for project in projects %}
    // <div class="card-container swiper-slide">
    //     <div class="swiper-card">
    //         <div class="swiper-circle">
    //             <h4 class="card-title">{{ project.autumn_or_spring }}</h4>
    //         </div>
    //     <div class="swiper-content">
    //         <p class="card-text">{{ project.name }}</p>
    //         <a href="" class="btn btn-primary">Страница проекта</a>
    //         </div>
    // </div>
    // </div>
    // {% endfor %}
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



}




