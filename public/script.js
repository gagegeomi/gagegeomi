window.onload = function() {
  var box = document.getElementsByClassName("box");
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("check-box");   
        contentPaddingLeft(true)   
      
    });
  }
}

function onloadWorksUrl(id) {
  getWorkcontent(id);
   var url = document.getElementById("worksUrl"+id).value;
    document.getElementById("worksFrame").src = url;
    document.getElementById("worksUrl"+id).previousSibling.classList.toggle("clicked");
};


function getWorkcontent(id){

  var xmlhttp;
  if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
  } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("work_data")[0].style.display = 'block';
        var result = JSON.parse(this.responseText);
        document.getElementById("work_title").innerHTML = result.title;
        document.getElementById("work_date").innerHTML = result.date;
        document.getElementById("work_content").innerHTML = result.content;

      }
  };
  xmlhttp.open("get", "http://gagegeomi.us-east-2.elasticbeanstalk.com/work/" + id, true);
  xmlhttp.send(null);

}

function toggleView() {
  let view = document.getElementsByClassName("work_data")[0].style.display

  if (view == 'block') {
    var title = document.getElementById("work_title").textContent;
      document.getElementsByClassName("work_data")[0].style.display = 'none';
      document.getElementsByClassName("work_minimize")[0].style.display = 'block';      
      document.getElementsByClassName("work_minimize")[0].innerHTML = '<a href="javascript:void(0)" onclick="toggleView()">'+ title +'</a>';
  } else {
      document.getElementsByClassName("work_data")[0].style.display = 'block';
      document.getElementsByClassName("work_minimize")[0].style.display = 'none';

  }
}



function expandNav(innerHtml) {  
  var box = document.getElementsByClassName("box");
  if(innerHtml == 'expand'){
    document.getElementById("expandBtn").innerHTML = "reset";    
    for (var i = 0; i < box.length; i++) {
      if(box[i].parentElement.querySelector(".nested").classList == 'nested'){
        box[i].parentElement.querySelector(".nested").classList.toggle("active");
        box[i].classList.toggle("check-box");                
      }
    }
    contentPaddingLeft(true)
  } else {
    document.getElementById("expandBtn").innerHTML = "expand";
    var clicked = document.querySelectorAll('.clicked');
    for (var j = 0; j < clicked.length; j++) {
        clicked[j].classList.remove("clicked");
    }
    for (var i = 0; i < box.length; i++) {
      if(box[i].parentElement.querySelector(".nested").classList == 'nested active'){
        box[i].parentElement.querySelector(".nested").classList.remove("active");
        box[i].classList.remove("check-box");                
      }
    }
    contentPaddingLeft(false)
  }
}

function openNav() {
  var nav = document.querySelector('#nav');
  var style = window.getComputedStyle(nav);
  var state = style.getPropertyValue('display');        
  if (state == "block"){
    document.getElementById("nav").style.display = "none";
    document.getElementById("nav-tab").style.display = "block";
    contentPaddingLeft(false)

  } else {
    document.getElementById("nav").style.display = "block";   
    document.getElementById("nav-tab").style.display = "none";
    contentPaddingLeft(true)

  }
}

function contentPaddingLeft(x){

  if(x){
    const width = document.getElementById("nav").getBoundingClientRect().width;
    document.getElementById("content").style.paddingLeft = width + "px"
  }else{
    document.getElementById("content").style.paddingLeft = "0"
  }
  
}
