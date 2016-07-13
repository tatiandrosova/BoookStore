window.onload = function() {

var bookList = $('#booklist');
var searchResult = $('#search-result');
var keyMask = 'book_';
var eId=0;
var password = "123456";

if (sessionStorage.getItem('key') !== 'value') {
    $('#myModal').modal("show");
}

$("#passwd-btn").click(function(){
    if ($("#passwd").val()===password) {
        sessionStorage.setItem('key', 'value');
        $('#myModal').modal("hide");
    }
});

$('.title-window').css('cursor', 'pointer');

$('.title-window').click(function(){
    $(this).next().slideToggle('slow');
});

function showBooks(){
  if(localStorage.length > 0){
    for(var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      if(key.indexOf(keyMask) == 0){
        $('<ul></ul>').prependTo(bookList)
            .addClass('bg-success')
            .attr('id', key)
            .attr('data-itemid', key);
        $('<span></span>').addClass('glyphicon glyphicon-remove').prependTo( $("#" + key));
        $('<span></span>').addClass('glyphicon glyphicon-pencil').prependTo( $("#" + key));
        $('<li></li>').addClass('price')
          .text("Цена: " + JSON.parse(localStorage.getItem(key)).price + ' руб.').prependTo( $("#" + key));
        $('<li></li>').addClass('publ')
          .text("Издательство: " + JSON.parse(localStorage.getItem(key)).publ).prependTo( $("#" + key));
        $('<li></li>').addClass('author')
          .text("Автор: " + JSON.parse(localStorage.getItem(key)).author).prependTo( $("#" + key));
        $('<li></li>').addClass('title')
          .text("Название книги: " + JSON.parse(localStorage.getItem(key)).title).prependTo( $("#" + key)); 
      }
    }
  }
} 

showBooks();

$('.glyphicon-pencil').click( function(){
    $('#edit-book').show();
    $('#edit-title').attr('value', JSON.parse(localStorage.getItem(this.parentNode.id)).title);
    $('#edit-author').attr('value', JSON.parse(localStorage.getItem(this.parentNode.id)).author);
    $('#edit-publ').attr('value', JSON.parse(localStorage.getItem(this.parentNode.id)).publ);
    $('#edit-price').attr('value', JSON.parse(localStorage.getItem(this.parentNode.id)).price);
    eId = this.parentNode.id;
});

$('.glyphicon-remove').click( function(){
    localStorage.removeItem(this.parentNode.id);
    $(this.parentNode).remove();
    return false;
});

$('#cancel').click( function() { 
   $('#edit-book').hide();
    return true;
});

$('#save').click( function() { 
    var book = {};
    
   if($("#edit-title").val() == '') {
       $('#edit-alert').html("Введите название книги!");
       $("#edit-title").focus();
       $('#edit-alert').fadeIn().delay(1000).fadeOut();
       return false;
   }
    if($("#edit-author").val() == '') {
       $('#edit-alert').html("Введите автора книги!");
       $("#edit-author").focus();
       $('#edit-alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    if($("#edit-publ").val() == '') {
       $('#edit-alert').html("Введите издательство!");
       $("#edit-publ").focus();
       $('#edit-alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    if($("#edit-price").val() == '' || !$("#edit-price").val().match('^[0-9]+$')) {
       $('#edit-alert').html("Введите цену книги!");
       $("#edit-price").focus();
       $('#edit-alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    
    book.title = $('#edit-title').val();
    book.author = $('#edit-author').val();
    book.publ = $('#edit-publ').val();
    book.price = $('#edit-price').val();
    
    localStorage.setItem(keyMask+eId.slice(5), JSON.stringify(book));
});

$('#add').click( function() {
    var book = {};
    var currentDate = new Date();
    var time = currentDate.getTime();

   if($("#input-title").val() == '') {
       $('#alert').html("Введите название книги!");
       $("#input-title").focus();
       $('#alert').fadeIn().delay(1000).fadeOut();
       return false;
   }
    if($("#input-author").val() == '') {
       $('#alert').html("Введите автора книги!");
       $("#input-author").focus();
       $('#alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    if($("#input-publ").val() == '') {
       $('#alert').html("Введите издательство!");
       $("#input-publ").focus();
       $('#alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    if($("#input-price").val() == '' || !$("#input-price").val().match('^[0-9]+$')) {
       $('#alert').html("Введите цену книги!");
       $("#input-price").focus();
       $('#alert').fadeIn().delay(1000).fadeOut();
       
       return false;
   }
    
    book.title = $('#input-title').val();
    book.author = $('#input-author').val();
    book.publ = $('#input-publ').val();
    book.price = $('#input-price').val();

    localStorage.setItem(keyMask+time, JSON.stringify(book));
});

$('#price-sort').click(function(){
    $('#sort-order').css("display", "auto");
});
$('#publ-sort').click(function(){
    $('#sort-order').css("display", "none");
});
$('#author-sort').click(function(){
    $('#sort-order').css("display", "none");
});

$('#sort').click(function(){
    var $elements = $('#booklist ul');
     
    $elements.sort(function (a, b) {
        var an, bn;
        
        if ($("#author-sort").prop("checked")) {
            an = JSON.parse(localStorage.getItem(a.id)).author,
            bn = JSON.parse(localStorage.getItem(b.id)).author; 
        }
        if ($("#publ-sort").prop("checked")) {
            an = JSON.parse(localStorage.getItem(a.id)).publ,
            bn = JSON.parse(localStorage.getItem(b.id)).publ;
        }
        if ($("#price-sort").prop("checked")) {
            an = JSON.parse(localStorage.getItem(a.id)).price,
            bn = JSON.parse(localStorage.getItem(b.id)).price;
            if ($('#inc-sort').prop("checked"))
                return an.toUpperCase().localeCompare(bn.toUpperCase());
            if ($('#dec-sort').prop("checked"))
                return bn.toUpperCase().localeCompare(an.toUpperCase());
        }

        return an.toUpperCase().localeCompare(bn.toUpperCase());
    });

    $elements.detach().appendTo(bookList); 

});

function showSearchResult (key) {
    $('<ul></ul>').appendTo($('#search-content'))   
    $('<li></li>').addClass('title')
      .text("Название книги: " + JSON.parse(localStorage.getItem(key)).title).appendTo($('#search-content')); 
    $('<li></li>').addClass('author')
      .text("Автор: " + JSON.parse(localStorage.getItem(key)).author).appendTo($('#search-content'));
    $('<li></li>').addClass('publ')
      .text("Издательство: " + JSON.parse(localStorage.getItem(key)).publ).appendTo($('#search-content'));
    $('<li></li>').addClass('price')
      .text("Цена: " + JSON.parse(localStorage.getItem(key)).price + ' руб.').appendTo($('#search-content')); 
}


$('#search').click(function(){
    if ($('#search-author').val() == "" && $('#search-publ').val() == "") {
        $('#search-alert').html('Введите автора книги или издательство!');
        $('#search-alert').fadeIn().delay(1000).fadeOut();
        return false; 
    }  
    $('#search-content').html(" ");
    for(var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i), k=0;
      if(key.indexOf(keyMask) == 0){
          if ($('#search-author').val() !== "" && $('#search-publ').val() !== "") {
              if ((JSON.parse(localStorage.getItem(key)).author.indexOf($('#search-author').val())+1 > 0) && (JSON.parse(localStorage.getItem(key)).publ.indexOf($('#search-publ').val())+1 > 0)) {
                  showSearchResult(key); k++;}
          }
          else if ($('#search-author').val() !== "") {
              if (JSON.parse(localStorage.getItem(key)).author.indexOf($('#search-author').val())+1) {
                  showSearchResult(key); k++;}
          }
          else if ($('#search-publ').val() !== "") {
              if (JSON.parse(localStorage.getItem(key)).publ.indexOf($('#search-publ').val())+1) {
                  showSearchResult(key); k++;}
          }
      }
    }
    if (k == 0) $('#search-content').html("Поиск не дал результатов!");
    else $('#search-result').show();
    return false;
});
}