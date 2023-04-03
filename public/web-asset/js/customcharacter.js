
 var windowidth = $( window ).width();
$( window ).resize(function() {
    windowidth =$( window ).width();
    fixArrow ('news','.news');
   fixArrow ('newsPen','.newsPen');
   fixArrow ('Relatives','.Relatives',2);
   fixArrow ('videosSlide','.videosSlide');
   fixArrow ('gallerySlide','.gallerySlide');
});
var WorkedPositionsSlidesNum=0;
function WorkedPositionPrevious() {
   var style = window.getComputedStyle(document.getElementById("WorkedPosition"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedPositionsSlidesNum > 0){
      WorkedPositionsSlidesNum= WorkedPositionsSlidesNum-1;
      document.getElementById("WorkedPosition").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function WorkedPositionNext() {
   var length =(document.getElementById("WorkedPosition").getElementsByTagName('li').length)-2;
   var style = window.getComputedStyle( document.getElementById("WorkedPosition"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedPositionsSlidesNum < length  ){
      WorkedPositionsSlidesNum= WorkedPositionsSlidesNum+1;
      document.getElementById("WorkedPosition").style.transform = `translateX(${214+matrix.m41}px)`;
   }
}
var RelativesSlidesNum=0;
function RelativesPrevious() {
   var style = window.getComputedStyle(document.getElementById("Relatives"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(RelativesSlidesNum > 0){
      RelativesSlidesNum= RelativesSlidesNum-1;
      document.getElementById("Relatives").style.transform = `translateX(${matrix.m41-214}px)`;
   }
}
function RelativesNext() {
   var length =(document.getElementById("Relatives").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("Relatives"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(RelativesSlidesNum < length-1  ){
      RelativesSlidesNum= RelativesSlidesNum+1;
      document.getElementById("Relatives").style.transform = `translateX(${214+matrix.m41}px)`;
   }
   if(length >= 8){
      $('#seeMoreRelatives').show()
   }
}


var NewsNum=0;
function NewsPrevious() {
   var style = window.getComputedStyle(document.getElementById("news"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(NewsNum > 0){
      NewsNum= NewsNum-1;
      document.getElementById("news").style.transform = `translateX(${matrix.m41-286}px)`;
   }
}
function NewsNext() {
   var length =(document.getElementById("news").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("news"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(NewsNum < length-1  ){
      NewsNum= NewsNum+1;
      document.getElementById("news").style.transform = `translateX(${286+matrix.m41}px)`;
   }
   if(length >= 8){
      $('#seeMorenews').show()
   }

}


var NewsPenNum=0;
function NewsPenPrevious() {
   var style = window.getComputedStyle(document.getElementById("newsPen"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(NewsPenNum > 0){
      NewsPenNum= NewsPenNum-1;
      document.getElementById("newsPen").style.transform = `translateX(${matrix.m41-290}px)`;
   }
}
function NewsPenNext() {
   var length =(document.getElementById("newsPen").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("newsPen"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(NewsPenNum < length-1  ){
      NewsPenNum= NewsPenNum+1;
      document.getElementById("newsPen").style.transform = `translateX(${290+matrix.m41}px)`;
   }
   if(length >= 7){
      $('#seeMorenewsPen').show()
   }
}


var videosNum=0;
function videosPrevious() {
   var style = window.getComputedStyle(document.getElementById("videosSlide"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(videosNum > 0){
      videosNum= videosNum-1;
      document.getElementById("videosSlide").style.transform = `translateX(${matrix.m41-290}px)`;
   }
}
function videosNext() {
   var length =(document.getElementById("videosSlide").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("videosSlide"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(videosNum < length-1  ){
      videosNum= videosNum+1;
      document.getElementById("videosSlide").style.transform = `translateX(${290+matrix.m41}px)`;
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
var WorkedPositionsSlidesNum=0;
function WorkedPositionPrevious() {
   var style = window.getComputedStyle(document.getElementById("WorkedPosition"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedPositionsSlidesNum > 0){
      WorkedPositionsSlidesNum= WorkedPositionsSlidesNum-1;
      document.getElementById("WorkedPosition").style.transform = `translateX(${matrix.m41-214}px)`;
   }

}
function WorkedPositionNext() {
   var length =(document.getElementById("WorkedPosition").getElementsByTagName('li').length);
   var style = window.getComputedStyle( document.getElementById("WorkedPosition"));
   var matrix = new WebKitCSSMatrix(style.transform);
   if(WorkedPositionsSlidesNum < length-1  ){
      WorkedPositionsSlidesNum= WorkedPositionsSlidesNum+1;
      document.getElementById("WorkedPosition").style.transform = `translateX(${214+matrix.m41}px)`;
   }

}
$("#showMoreContent").click(function(e) {
   $("#moreContent").show();
   $("#showMoreContent").hide();
   $("#showLessContent").show();
   $("#lessContent").hide();
});
$("#showLessContent").click(function(e) {
   $("#lessContent").show();
   $("#showMoreContent").show();
   $("#showLessContent").hide();
   $("#moreContent").hide();
});
$("#showMoreVip").click(function(e) {
     $(".vipPerson").show();
     $("#showMoreVip").hide();
 });
 $("#showMoreCharacter").click(function(e) {
     $(".mostCharacter").show();
     $("#showMoreCharacter").hide();
 });
 $('#seeMoreworkednow').hide()
 $('#seeMoreworkedbefore').hide()
 
 $('#seeMoreWorkedPosition').hide()
 $('#seeMorenewsPen').hide()
 $('#seeMoreRelatives').hide()
 $('#seeMorenews').hide()

 $("#showLessCharacter").hide();
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
window.onload = function(){

 

  fixArrow ('news','.news');
  fixArrow ('newsPen','.newsPen');
  fixArrow ('Relatives','.Relatives',2);
  fixArrow ('videosSlide','.videosSlide');
  fixArrow ('gallerySlide','.gallerySlide');
  fixSeeMore('news','#seeMorenews');
  fixSeeMore('newsPen','#seeMorenewsPen');
  fixSeeMore('Relatives','#seeMoreRelatives');
  fixSeeMore('gallerySlide','#seeMoreGallerysSlide');
  var options = {year: 'numeric',month: 'long',day: 'numeric'};
   try {
      var birth =document.getElementById("birth_date") ? String(document.getElementById("birth_date").innerText) :"";
      var birth_date = new Date(String(birth));
      if(document.getElementById("birth_date") && birth !='undefined' && birth!='"undefined"'){
       var date =birth_date.toLocaleDateString('ar-LI', options);
         if(date != 'Invalid date'){
            $('#trBirthDate').show();
             document.getElementById("birth_date").innerText= date;
           }
           else{
            $('#trBirthDate').show();
             document.getElementById("birth_date").innerText = String(birth).replace(/\//g,'-');
           }
        
        // console.log(document.getElementById("birth_date").innerText)
      }
   } catch (error) {console.log(error)}
   try {
      var death = document.getElementById("death_date") ? String(document.getElementById("death_date").innerText):"";
      var death_date = new Date(String(death));

      if(document.getElementById("death_date") && death !='undefined' && death!='"undefined"'){
       var date =death_date.toLocaleDateString('ar-LI', options);
         if(date != 'Invalid date'){
              $('#death_date_show').removeClass( "date_show" );
             document.getElementById("death_date").innerText= date;
           }
           else{
              $('#death_date_show').removeClass( "date_show" );
             document.getElementById("death_date").innerText = String(birth).replace(/\//g,'-');
           }
         }
   } catch (error) { console.log(error)}
   /*
   try {
     // console.log(document.getElementById("newsPen"))
      if( document.getElementById("newsPen")){
         for (let i = 0; i < document.getElementById("newsPen").getElementsByTagName('li').length; i++) {
            document.getElementById("newsPendate"+i).innerText = moment(String(document.getElementById("newsPendate"+i).innerText)).locale('ar').format(" D  MMMM , YYYY");
          }
          $('.date-process').show()
      } 
   } catch (error) {console.log(error)}
   try {
      if( document.getElementById("news")){
         for (let i = 0; i < document.getElementById("news").getElementsByTagName('li').length; i++) {
            document.getElementById("newsdate"+i).innerText = moment(String(document.getElementById("newsdate"+i).innerText)).locale('ar').format(" D  MMMM , YYYY");
          }
          $('.date-process').show()
      }
   } catch (error) { console.log(error)}

*/
};
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
function fixArrow (id,div,count=1){
   try {
      if(document.getElementById(id)){
        
         var length =(document.getElementById(id).getElementsByTagName('li').length);
         if(windowidth < 576){
            if(length >= count){
               $(div).show();
            }
            else{
               $(div).hide();
            }
         }
         else if(windowidth < 768){
            if(length >= count+1){
               $(div).show();
            }
            else{
               $(div).hide();
            }
         }
         else if (windowidth > 992){
            if(length >= count+2){
               $(div).show();
               
            }
            else{
               $(div).hide();
            }
         }
         }   
   } catch (error) { console.log(error)}
}
