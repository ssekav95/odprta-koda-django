$(document).ready(function(){

  console.log("ASD");

});


$("#new-project").click(function(){
  //create new Project
});

newtasktr = null;

$("#new-task").click(function(){
  console.log("New Task!");

  newtasktr = $("#new-task-tr");
  newtasktr.hide();
  //$(".new-task").remove();
  tr = $("<tr/>");
  inpt = $("<td/>",{class:"input"}).appendTo(tr);
  name1 = $("<td/>",{class:"todo-name"}).appendTo(tr);
  date = $("<td/>",{class:"todo-date"}).appendTo(tr);
  $("<input/>",{id:"new-task-date",type:"date", clas:"u-full-width"}).appendTo(date);
  $("<input/>",{id:"new-task-name",type:"text", clas:"u-full-width"}).appendTo(name1);
  $("<button/>", {id:"create-new-task", text:"GO!"}).appendTo(inpt)
  tr.insertBefore("#new-task-tr");
});

$(document).on("click","table .input input",function(e){

  pk = $(this).parent().parent().attr("id").split('-')[1];
  console.log(pk);
  $.get( "/todo/naloge/?id="+pk, function() {

  });
});

$(document).on("click","#create-new-task", function(){
  //location.reload();
});

$("#new-project").click(function(){
  console.log("New Project");
  cont =$(this).attr("disabled",true);
  $(this).find("h7").remove();
  frm = $("<form/>",{id:"new-project-form"}).appendTo(cont);
  inpt = $("<input/>",{ type:"text",id:"new-project-name"}).appendTo(frm);
  inpt.focus();
});

$(document).on('keyup','#new-project-name', function (e) {

       if(e.which === 13){
         //SUBMIT

         location.reload();

       }
 });

 $(document).on('click', "#create-new-task",function(){
   desc = $("#new-task-name").val();

   var obj = {'description': $("#new-task-name").val(), 'due':$("#new-task-date").val()}

   $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
  });
   $.ajax({
    type: 'POST',
    traditional: true,
    url: 'naloge/',
    contentType: 'application/json; charset=utf-8', //EDITED
    data: JSON.stringify({
      'description':$("#new-task-name").val(),
      'due':$("#new-task-date").val(),
      'projekt':$(".todo-cont .todo-header").attr("id").split('-')[1],
    }),
    success: function(data) {
         location.reload();
    },
  });
});


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
