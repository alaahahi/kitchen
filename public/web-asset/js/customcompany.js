
 var windowidth = $( window ).width();
 $( window ).resize(function() {
     windowidth =$( window ).width();
     fixArrow ('ExecutiveManager','.ExecutiveManager');
     fixArrow ('BoardDirector','.BoardDirector');
     fixArrow ('workednow','.workednow');
     fixArrow ('workedbefore','.workedbefore');
     fixArrow ('gallerySlide','.gallerySlide');
 });
var WorkedBeforeSlidesNum=0;
function WorkedBeforePrevious() {
   var style = window.getComputedStyle(document.getElementById("workedbefore"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum > 0){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum-1;
      document.getElementById("workedbefore").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function WorkedBeforeNext() {
   var length =(document.getElementById("workedbefore").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("workedbefore"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum < length-1  ){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum+1;
      document.getElementById("workedbefore").style.transform = `translateX(${214+matrix.m41}px)`;
   }
   if(length >= 8){
      $('#seeMoreworkedbefore').show()
   }
}
var WorkedNowSlidesNum=0;
function WorkedNowPrevious() {
   var style = window.getComputedStyle(document.getElementById("workednow"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedNowSlidesNum > 0){
      WorkedNowSlidesNum= WorkedNowSlidesNum-1;
      document.getElementById("workednow").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function WorkedNowNext() {
   var length =(document.getElementById("workednow").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("workednow"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedNowSlidesNum < length-1  ){
      WorkedNowSlidesNum= WorkedNowSlidesNum+1;
      document.getElementById("workednow").style.transform = `translateX(${214+matrix.m41}px)`;
   }
   if(length >= 8){
      $('#seeMoreworkednow').show()
   }
}

var BoardDirectorSlidesNum=0;
function BoardDirectorPrevious() {
   var style = window.getComputedStyle(document.getElementById("BoardDirector"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum > 0){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum-1;
      document.getElementById("BoardDirector").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function BoardDirectorNext() {
   var length =(document.getElementById("BoardDirector").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("BoardDirector"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum < length-1  ){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum+1;
      document.getElementById("BoardDirector").style.transform = `translateX(${214+matrix.m41}px)`;
   }
}


var ExecutiveManagerSlidesNum=0;
function ExecutiveManagerPrevious() {
   var style = window.getComputedStyle(document.getElementById("ExecutiveManager"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum > 0){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum-1;
      document.getElementById("ExecutiveManager").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function ExecutiveManagerNext() {
   var length =(document.getElementById("ExecutiveManager").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("ExecutiveManager"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedBeforeSlidesNum < length-1  ){
      WorkedBeforeSlidesNum= WorkedBeforeSlidesNum+1;
      document.getElementById("ExecutiveManager").style.transform = `translateX(${214+matrix.m41}px)`;
   }
}
var galleryNum=0;
function galleryPrevious() {
   var style = window.getComputedStyle(document.getElementById("gallerySlide"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(galleryNum > 0){
      galleryNum= galleryNum-1;
      document.getElementById("gallerySlide").style.transform = `translateX(${matrix.m41-331}px)`;
   }
}
function galleryNext() {
   var length =(document.getElementById("gallerySlide").getElementsByTagName('li').length)-1;
   var style = window.getComputedStyle( document.getElementById("gallerySlide"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(galleryNum < length  ){
      galleryNum= galleryNum+1;
      document.getElementById("gallerySlide").style.transform = `translateX(${331+matrix.m41}px)`;
   }
}

$("#closee").on("click", function() {
    $("#mess_close").hide();
});
$("#closee1").on("click", function() {
    $("#mess_close1").hide();
});
$("#closee2").on("click", function() {
    $("#mess_close2").hide();
});


$(document).ready(function(){
   fixArrow ('ExecutiveManager','.ExecutiveManager');
   fixArrow ('BoardDirector','.BoardDirector');
   fixArrow ('workednow','.workednow');
   fixArrow ('workedbefore','.workedbefore');
   fixArrow ('gallerySlide','.gallerySlide');
   fixSeeMore('ExecutiveManager','#seeMoreexecutiveManager');
   fixSeeMore('BoardDirector','#seeMoreboardDirector');
   fixSeeMore('workednow','#seeMoreworkednow');
   fixSeeMore('workedbefore','#seeMoreworkedbefore');
   fixSeeMore('gallerySlide','#seeMoreGallerysSlide');

   try {
      if(document.getElementById("workednow")){
         var length =(document.getElementById("workednow").getElementsByTagName('li').length);
         if(length > 7){
            $('#seeMoreworkednow').show()
         }
         }  
   } catch (error) { console.log(error)}
   try {
      if(document.getElementById("workedbefore")){
         var length =(document.getElementById("workedbefore").getElementsByTagName('li').length);
         if(length > 7){
            $('#seeMoreworkedbefore').show()
         }
         }  
   } catch (error) { console.log(error)}
   try {
      if(document.getElementById("BoardDirector")){
         var length =(document.getElementById("BoardDirector").getElementsByTagName('li').length);
         if(length > 7){
            $('#seeMoreboardDirector').show()
         }
         }  
   } catch (error) { console.log(error)}
   try {
      if(document.getElementById("ExecutiveManager")){
         var length =(document.getElementById("ExecutiveManager").getElementsByTagName('li').length);
         if(length > 7){
            $('#seeMoreexecutiveManager').show()
         }
         }  
   } catch (error) { console.log(error)}
    $("#showMoreCharacter").click(function(e) {
       $(".mostCharacter3").show();
       $(".mostCharacter4").show();
       $(".mostCharacter5").show();
       $("#showMoreCharacter").hide();
       $("#showLessCharacter").show();
    });
    $("#showLessCharacter").click(function(e) {
       $(".mostCharacter3").hide();
       $(".mostCharacter4").hide();
       $(".mostCharacter5").hide();
       $("#showMoreCharacter").show();
       $("#showLessCharacter").hide();
    });   
 
    $("#showLessCompany").hide();
    $("#showMoreCompany").click(function(e) {
       $(".simCompany3").show();
       $(".simCompany4").show();
       $(".simCompany5").show();
       $("#showMoreCompany").hide();
       $("#showLessCompany").show();
     });
     $("#showLessCompany").click(function(e) {
       $(".simCompany3").hide();
       $(".simCompany4").hide();
       $(".simCompany5").hide();
       $("#showMoreCompany").show();
       $("#showLessCompany").hide();
    });
    
 
     $("#showLessVip").hide();
     $("#showMoreVip").click(function(e) {
          $(".vipPerson2").show();
          $(".vipPerson3").show();
         $("#showMoreVip").hide();
         $("#showLessVip").show();
     });
     $("#showLessVip").click(function(e) {
       $(".vipPerson2").hide();
       $(".vipPerson3").hide();
       $("#showMoreVip").show();
       $("#showLessVip").hide();
    });
    
    $("#showLessCategory").hide();
    $("#showMoreCategory").click(function(e) {
         $(".Category3").show();
         $(".Category4").show();
         $(".Category5").show();
        $("#showMoreCategory").hide();
        $("#showLessCategory").show();
    });
    $("#showLessCategory").click(function(e) {
      $(".Category3").hide();
      $(".Category4").hide();
      $(".Category5").hide();
      $("#showMoreCategory").show();
      $("#showLessCategory").hide();
   });
     $("#showMoreCharacter").click(function(e) {
       $(".mostCharacter").show();
       $("#showMoreCharacter").hide();
     });
     $('#inputSearch').keyup( function () {
       var inputText= $(this).val();
       let dataToReturn = [];
       if(inputText == "" || inputText == " ") return false;
       $.get(urlSearch+inputText)
       .done(function(data) {
          $("#resultSearch").html('');
          $("#resultSearch").show();
           $.each(data.suggestions, function(index, value) {
             let image = "";
             if(value.type == "company") {
                image = "/web-asset/img/noResultC.png";
                if(value.image) {
                   image = value.image;
                }
                $("#resultSearch").append('<div class="p-1"><div class="row py-3"><div class="d-flex align-items-center  me-4 mt-1 g-0 align-middle div-image-c"><img  src="'+image+'" class="img-fluid rounded-btn image-wid-p"> <!----></div> <div  class="col-8"><div  class="pt-3 "><a  href="/شركات/'+value.slug+'" class="text-gray-90 card-title text-decoration-none  fs-6">'+value.phrase+'</a></div></div></div></div>');
             }else if(value.type == "person") {
                image = "https://manhom.com/wp-content/uploads/2018/12/بدون-صورة-رجل-20.jpg";
                if(value.image) {
                   image = value.image;
                }
                $("#resultSearch").append('<div class="p-1"><div class="row py-3"><div class="d-flex align-items-center  me-4 mt-1 g-0 align-middle div-image-c"><img  src="'+value.image+'" class="img-fluid rounded-btn image-wid-p"> <!----></div> <div  class="col-8"><div  class="pt-3 "><a  href="/شخصيات/'+value.slug+'" class="text-gray-90 card-title text-decoration-none  fs-6">'+value.phrase+'</a></div></div></div></div>');
             }
           });
       });
     });
     document.addEventListener('click', function handleClickOutsideBox(event) {
       const box = document.getElementById('resultSearch');
     
       if (!box.contains(event.target)) {
         box.style.display = 'none';
       }
     });

     try {
      var options = {year: 'numeric',month: 'long',day: 'numeric'};
      var start = document.getElementById("start_date") ? String(document.getElementById("start_date").innerText) :"";
      var start_date = new Date(String(start));
      if(document.getElementById("start_date") && String(start) !='undefined' && start!='"undefined"'){
         var date =start_date.toLocaleDateString('ar-LI', options);
           if(date != 'Invalid date'){
              $('#trStart_date').show();
               start= date;
              
             }
             else{

               start = String(start).replace(/\//g,'-');
             }}
     } catch (error) {

     }

     if(document.getElementById("lessContent")){
        document.getElementById("lessContent").innerText = String(document.getElementById("moreContent").innerText).split(".")[0]+"."

     }
     $("#showMoreContent").click(function(e) {
     $("#moreContent").show();
     $("#showMoreContent").hide();
     $("#showLessContent").show();
     $("#lessContent").hide();
    });
 });
 function fixSeeMore (id,btn){
   try {
      if(document.getElementById(id)){
         var length =(document.getElementById(id).getElementsByTagName('li').length);
         if(length > 7){
            $(btn).show()
         }
         }
   } catch (error) { console.log(error)}
}
function fixArrow (id,div){
   try {
      if(document.getElementById(id)){
        
         var length =(document.getElementById(id).getElementsByTagName('li').length);
              if(windowidth < 576){
         if(length >= 1){
            $(div).show();
         }
         else{
            $(div).hide();
         }
      }
      else if(windowidth < 768){
         if(length >= 2){
            $(div).show();
         }
         else{
            $(div).hide();
         }
      }
      else if (windowidth > 992){
         if(length >= 3){
            $(div).show();
            
         }
         else{
            $(div).hide();
         }
      }
         }   
   } catch (error) { console.log(error)}
}
