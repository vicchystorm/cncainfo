$(function(){
	'use-strict';

	window.__webSqlDebugModeOn = true;
	
	var applaunchCount = window.localStorage.getItem('has_run');

	if(!applaunchCount) { 
    	//do some stuff if has not loaded before
		/*var db = window.openDatabase("Database", "1.0", "CNCAdb", 200000);
        db.transaction(populateDB, errorCB, successCB);*/
		window.localStorage.setItem('has_run', 'true');
	 		 
	}else{
		//alert("Already Run");
	}
	
	
/*		
	
	$.ajax({
			url: "http://cnca.miralsa.net/wp-json/wp/v2/posts?per_page=5&_embed",
			crossDomain: true,
			type: "GET",
			beforeSend: function() {
				$("#mloaders4").css("display","block");
			}
		})
		.done(function( result ) {
			$("#mloaders4").css("display","none");
			var pa="";
			var mposts="";
			
			$.each(result, function(i, field) {  
				
 			var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

			pa+='<a href="#" class="small-listing-item">';
			pa+='<div class="entry-thumb"><img src="'+myImage+'" alt=""></div>';
			pa+='<div class="entry-content">';
			pa+="<h2>"+ field.title.rendered +"</h2>";
			pa+='<div class="entry-meta">'+ field.date +'</div>';
			pa+='</div>';
			pa+='</a>';
			mposts=pa;
				
			$('#mloaders2').append(mposts); 
			pa="";
 			//"Title: " + field.title + " duration: " + field.duration + " Price:" + field.price + "<br/>"			
        	});
 
		});
	
	
	//Fil d'actu
	$.ajax({
			url: "http://cnca.miralsa.net/apps/fil.json",
			crossDomain: true,
			type: "GET",
			beforeSend: function() {
				$("#hloaders").css("display","block");
			}
		})
		.done(function( result ) {
			$("#hloaders").css("display","none");
			var pa="<ul>";
			var mposts="";
			var x=0;
		
			$.each(result.posts, function(i, field) {   
 
			pa+='<li><a href="#">';
			pa+="#"+ field.heure +" - "+ field.note;
			pa+='</a></li>';
			
			x++;
        	});
				
			mposts=pa;
			$('#ctn').append(mposts); 
			pa="";
			$('#ctn').append("</ul>"); 
			
		});
	  
	
	
	*/
	
	
	
	
	
	
	
	
	
	// sidenav control left
	$(".sidenav-control-left").sideNav({

		edge: 'left',
		closeOnClick: false

	});

	// sidenav control right
	$(".sidenav-control-right").sideNav({
		
		edge: 'right',
		closeOnClick: false

	});

	// panel collapse icon
	$(document).on("click",".collapsible-header",function(e){
	    $(this).parent().siblings().find('span i').removeClass('fa-chevron-down')
		$(this).find('span i').toggleClass('fa-chevron-down')
	});

	// slick slider
	$('.slider-slick').slick({
		
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		autoplay: true

	});
	
	// faq collapse icon
	$(document).on("click",".faq-collapsible",function(e){
	    $(this).parent().siblings().find('i').removeClass('fa-minus')
		$(this).find('i').toggleClass('fa-minus')
	});

	// testimonial
	$("#testimonial").owlCarousel({
 
      	slideSpeed : 300,
      	paginationSpeed : 400,
      	singleItem: true,

  	});

	// tabs
	$('ul.tabs').tabs(); 
	
	
	

});	
	
		
 
	
	
/*<button data-page="1" data-per-page="7">Load More </button> */

/**************
News Functions
**************/
function loadmBut(){
 
  var $this = $("#loadmBut");
  var $wpURL="http://cnca.miralsa.net/wp-json/wp/v2/posts?categories=13&";
  var nextPageToRetrieve = $this.data('page')+1;
  var dataPerPage = $this.data('per-page');
  $wpURL = $wpURL + "per_page="+dataPerPage+"&page="+ nextPageToRetrieve+"&_embed";

  $.ajax({
        url: $wpURL,
		crossDomain: true,
        type: 'GET',
        beforeSend: function() {
			$("#loadmore").html('<div style="padding: 5px; margin-bottom:50px" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
		}        

   })
   .done(function( result ) {
 		$("#mloaders").css("display","none");

		var pa='';
		var slide="";
	    var xx=0;
	  		
		$.each(result, function(i, field) {  

			var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

			pa+='<div class="entry">';
			pa+='<img src="'+myImage+'" alt="" onclick="loadNewsById('+field.id+')">';
			pa+='<div class="user-date">';
			pa+='<ul><li><a href="javascript:loadNewsById('+field.id+')"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
			pa+='</div>';
			pa+="<h5><a href='javascript:loadNewsById("+field.id+")'>"+ field.title.rendered +"</a></h5>";
			pa+='<p>'+ field.date +'</p><button class="button" onclick="loadNewsById('+field.id+')">Lire la suite</button>';
			pa+='</div>';
			slide=pa;

			$('#mainc').append(slide); 	
			pa="";
			xx++;
			//"Title: " + field.title + " duration: " + field.duration + " Price:" + field.price + "<br/>"
			
		});
	  
	  	if(xx>0 && xx>=4){		
			$('#loadmore').html('<button class="button shadow big" id="loadmBut" onclick="loadmBut()" data-page="'+ nextPageToRetrieve+'" data-per-page="4">Charger Plus</button>'); 	
		}else{
			$('#loadmore').html('');
		}

	});
	
}

function loadNews(){
 
	$.ajax({
		url: "http://cnca.miralsa.net/wp-json/wp/v2/posts?categories=13&per_page=5&_embed",
		crossDomain: true,
		type: "GET",
		beforeSend: function() {
			$("#mloaders").css("display","block");
			$("#mainc").html('<div style="padding: 45%" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
		}
	})
	.done(function( result ) {
		$("#mloaders").css("display","none");
		$("#mainContainer").removeClass();
		$("#mainContainer").addClass("blog app-pages app-section");
		$('#mainc').html(''); 
		
		var pa='<div class="app-title"><h4>Actualités</h4></div>';
		var slide="";

		$.each(result, function(i, field) {  

		var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

		pa+='<div class="entry">';
		pa+='<img src="'+myImage+'" alt="" onclick="loadNewsById('+field.id+')">';
		pa+='<div class="user-date">';
		pa+='<ul><li><a href="javascript:loadNewsById('+field.id+')"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
		pa+='</div>';
		pa+="<h5><a href='javascript:loadNewsById("+field.id+")'>"+ field.title.rendered +"</a></h5>";
		pa+='<p>'+ field.date +'</p><button class="button" onclick="loadNewsById('+field.id+')">Lire la suite</button>';
		pa+='</div>';
		slide=pa;
		
			
		$('#mainc').append(slide); 	
		pa="";
		//"Title: " + field.title + " duration: " + field.duration + " Price:" + field.price + "<br/>"
			
		});
		
		$('#loadmore').append('<button class="button shadow big" id="loadmBut" onclick="loadmBut()" data-page="1" data-per-page="5">Charger Plus</button>'); 	

	});

}
 
function loadNewsById(pID){
	$.ajax({
		url: "http://cnca.miralsa.net/wp-json/wp/v2/posts/"+pID+"?_embed",
		crossDomain: true,
		type: "GET",
		beforeSend: function() {
			$("#mloaders").css("display","block");
			$("#mainc").html('<div style="padding: 45%" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
			$("#loadmore").css("display","none");
		}
	})
	.done(function( field ) {
		$("#mloaders").css("display","none");
		$("#loadmore").css("display","block");
		$("#mainContainer").removeClass();
		$("#mainContainer").addClass("blog-single app-pages app-section");
		$('#mainc').html(''); 
		
		
		var slide="";
  

		var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

		var pa='<div class="app-title"><h4>Actualités</h4>  <div style="float:right"><a href="javascript:loadNews()" class="backbut">&laquo; Retour</a></div></div>';
		pa+='<div class="entry" style="clear:both">';
		pa+='<img src="'+myImage+'" alt="">';
		pa+='<div class="user-date">';
		pa+='<ul><li><a href="#"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
		pa+='</div>';
		pa+="<h5><a href='#'>"+ field.title.rendered +"</a></h5>";
		pa+='<p>'+ field.content.rendered +'</p>';
		pa+='<div class="share"><ul><li><h6>Partager via :</h6></li><li><a href="#"><i class="fa fa-facebook-square"></i></a></li><li><a href="#"><i class="fa fa-twitter-square"></i></a></li><li><a href="#"><i class="fa fa-google-plus-square"></i></a></li><li><a href="#"><i class="fa fa-instagram"></i></a></li></ul></div>';	
		pa+='<br><br></div>';
		slide=pa;
		
			
		$('#mainc').append(slide); 	
		pa="";
		 
		
		$('#loadmore').html(''); 	

	});
}	

/*********
Fin News
*********/


function loadQuran(){
		$("#mloaders").css("display","none");
		$('#mainc').html(''); 
		$("#mainc").html('<div style="padding: 45%" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');

	var slide='<iframe src="https://www.coran-francais.com/?iframe=1&logo=https://www.coran-francais.com/img/logo-coran.png" style="width:100%;height:800px;max-height:100%" frameborder="0" style="border: none;"></iframe>';
	
		$('#mainc').html(slide); 	
		$('#loadmore').html(''); 	

}	



/**************
Enseignements Functions
**************/
function loadEnsBut(){
 
  var $this = $("#loadmBut");
  var $wpURL="http://cnca.miralsa.net/wp-json/wp/v2/posts?categories=71&";
  var nextPageToRetrieve = $this.data('page')+1;
  var dataPerPage = $this.data('per-page');
  $wpURL = $wpURL + "per_page="+dataPerPage+"&page="+ nextPageToRetrieve+"&_embed";

  $.ajax({
        url: $wpURL,
		crossDomain: true,
        type: 'GET',
        beforeSend: function() {
			$("#loadmore").html('<div style="padding: 5px; margin-bottom:50px" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
		}        

   })
   .done(function( result ) {
 		$("#mloaders").css("display","none");

		var pa='';
		var slide="";
	    var xx=0;
	  		
		$.each(result, function(i, field) {  

			var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

			pa+='<div class="entry">';
			pa+='<img src="'+myImage+'" alt="" onclick="loadEnsById('+field.id+')">';
			pa+='<div class="user-date">';
			pa+='<ul><li><a href="javascript:loadEnsById('+field.id+')"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
			pa+='</div>';
			pa+="<h5><a href='javascript:loadEnsById("+field.id+")'>"+ field.title.rendered +"</a></h5>";
			pa+='<p>'+ field.date +'</p><button class="button" onclick="loadEnsById('+field.id+')">Lire la suite</button>';
			pa+='</div>';
			slide=pa;

			$('#mainc').append(slide); 	
			pa="";
			xx++;
			//"Title: " + field.title + " duration: " + field.duration + " Price:" + field.price + "<br/>"
			
		});
	  
	  	if(xx>0 && xx>=4){		
			$('#loadmore').html('<button class="button shadow big" id="loadmBut" onclick="loadEnsBut()" data-page="'+ nextPageToRetrieve+'" data-per-page="4">Charger Plus</button>'); 	
		}else{
			$('#loadmore').html('');
		}

	});
	
}

function loadEns(){
 
	$.ajax({
		url: "http://cnca.miralsa.net/wp-json/wp/v2/posts?categories=71&per_page=5&_embed",
		crossDomain: true,
		type: "GET",
		beforeSend: function() {
			$("#mloaders").css("display","block");
			$("#mainc").html('<div style="padding: 45%" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
		}
	})
	.done(function( result ) {
		$("#mloaders").css("display","none");
		$("#mainContainer").removeClass();
		$("#mainContainer").addClass("blog app-pages app-section");
		$('#mainc').html(''); 
		
		var pa='<div class="app-title"><h4>Enseignements</h4></div>';
		var slide="";
		var xx=0;

		$.each(result, function(i, field) {  

		var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

		pa+='<div class="entry">';
		pa+='<img src="'+myImage+'" alt="" onclick="loadEnsById('+field.id+')">';
		pa+='<div class="user-date">';
		pa+='<ul><li><a href="javascript:loadEnsById('+field.id+')"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
		pa+='</div>';
		pa+="<h5><a href='javascript:loadEnsById("+field.id+")'>"+ field.title.rendered +"</a></h5>";
		pa+='<p>'+ field.date +'</p><button class="button" onclick="loadEnsById('+field.id+')">Lire la suite</button>';
		pa+='</div>';
		slide=pa;
		
			
		$('#mainc').append(slide); 	
		pa="";
		//"Title: " + field.title + " duration: " + field.duration + " Price:" + field.price + "<br/>"
			xx++;
		});
		
		if(xx>0 && xx>=4){		
			$('#loadmore').html('<button class="button shadow big" id="loadmBut" onclick="loadEnsBut()" data-page="'+ nextPageToRetrieve+'" data-per-page="4">Charger Plus</button>'); 	
		}else{
			$('#loadmore').html('');
		}
	

	});

}
 
function loadEnsById(pID){
	$.ajax({
		url: "http://cnca.miralsa.net/wp-json/wp/v2/posts/"+pID+"?_embed",
		crossDomain: true,
		type: "GET",
		beforeSend: function() {
			$("#mloaders").css("display","block");
			$("#mainc").html('<div style="padding: 45%" id="mloaders" align="center"><img src="images/loading.gif" alt="" width="75"></div>');
			$("#loadmore").css("display","none");
		}
	})
	.done(function( field ) {
		$("#mloaders").css("display","none");
		$("#loadmore").css("display","block");
		$("#mainContainer").removeClass();
		$("#mainContainer").addClass("blog-single app-pages app-section");
		$('#mainc').html(''); 
		
		
		var slide="";
  

		var myImage=field._embedded['wp:featuredmedia']['0'].source_url;

		var pa='<div class="app-title"><h4>Enseignements</h4>  <div style="float:right"><a href="javascript:loadEns()" class="backbut">&laquo; Retour</a></div></div>';
		pa+='<div class="entry" style="clear:both">';
		pa+='<img src="'+myImage+'" alt="">';
		pa+='<div class="user-date">';
		pa+='<ul><li><a href="#"><i class="fa fa-clock-o"></i> '+ field.date +'</a></li></ul>';
		pa+='</div>';
		pa+="<h5><a href='#'>"+ field.title.rendered +"</a></h5>";
		pa+='<p>'+ field.content.rendered +'</p>';
		pa+='<div class="share"><ul><li><h6>Partager via :</h6></li><li><a href="#"><i class="fa fa-facebook-square"></i></a></li><li><a href="#"><i class="fa fa-twitter-square"></i></a></li><li><a href="#"><i class="fa fa-google-plus-square"></i></a></li><li><a href="#"><i class="fa fa-instagram"></i></a></li></ul></div>';	
		pa+='<br><br></div>';
		slide=pa;
		
			
		$('#mainc').append(slide); 	
		pa="";
		 
		
		$('#loadmore').html(''); 	

	});
}	

/*********
Fin Enseignements
*********/
 