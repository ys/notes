function addTodo() {
	var todos =JSON.parse(localStorage.getItem("todos"));
	if (todos == null) todos = new Array();
	if($('#todos').children().length!= 0){

		var index = todos.length ;
	} else {
		index = 0;
	}
	var data = $('#newTodoText').val();
	var newArticle = $('<article></article>');
	var newHidden = $('<input class=\"index\" type=\"hidden\">');
	newHidden.val(index);
	var newLabel = $('<label></label>');
	newLabel.append('<input type=\"checkbox\"/>');
	var newSpan = $('<span></span>');
	newSpan.text(data);
	newLabel.append(newSpan);
	newArticle.append(newHidden).append(newLabel).append('<a class=\"delete\" href=\"#delete\">x</a>');
	$('#todos').append(newArticle);
	$('#newTodoText').val('');
	var todo = new Object();
	todo.desc =data;
	todo.done = false;
	todos.push(todo)
	localStorage.setItem("todos", JSON.stringify(todos));
	bindFields();
	
}
function removeTodo(index) {
	var todos = JSON.parse(localStorage.getItem("todos"));
	todos.splice(index,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function changeStatus(index, done) {
	var todos = JSON.parse(localStorage.getItem("todos"));
	todos[index].done = done;
	localStorage.setItem("todos", JSON.stringify(todos));	    
}
function bindFields(){
	$('#todos article:last-child .delete').click(function(e){
		removeTodo($(this).prevAll('.index').val());
		$(this).parent().fadeOut();
		e.preventDefault();
		return false;
	});
	$('#todos article:last-child input:checkbox').change(function(){
		
		if ($(this).is(':checked')) {
			changeStatus($(this).parent().prevAll('.index').val(), true);
			$(this).nextAll('span').addClass('cross');
		} else {
			changeStatus($(this).parent().prevAll('.index').val(), false);
			$(this).nextAll('span').removeClass('cross');
		}
	});
	
}
function loadTodos(){
	var todos = JSON.parse(localStorage.getItem("todos"));
	if (todos != null){
		for (i=0;i<todos.length;i++)
		{
			var todo = todos[i];
			var check = '';
			var classes = '';
			if (todo.done){
				check = 'checked';
				classes = 'cross';
			}
			var newArticle = $('<article></article>');
			var newHidden = $('<input class=\"index\" type=\"hidden\">');
			newHidden.val(i);
			var newLabel = $('<label></label>');
			newLabel.append('<input type=\"checkbox\" '+check+'/>');
			var newSpan = $('<span class=\"'+classes+'\"></span>');
			newSpan.text(todo.desc);
			newLabel.append(newSpan);
			newArticle.append(newHidden).append(newLabel).append('<a class=\"delete\" href=\"#delete\">x</a>');
			$('#todos').append(newArticle);
			
		}
	}
	
}
$(function(){
	loadTodos();
	$('#new input').keydown(function(e){
	      if(e.which == 13){
				addTodo();
	       }
	      });

	$('#clear').click(function(e){
		if (confirm("Are you sure you want to delete all todos?")){
			localStorage.removeItem("todos");
			e.preventDefault();
			$('#todos').children().fadeOut();	
		}
		return false;
	});
	
	$('.delete').click(function(e){
		removeTodo($(this).prevAll('.index').val());
		$(this).parent().fadeOut();
		e.preventDefault();
		return false;
	});
	$('input:checkbox').change(function(){
		
		if ($(this).is(':checked')) {
			changeStatus($(this).parent().prevAll('.index').val(), true);
			$(this).nextAll('span').addClass('cross');
		} else {
			changeStatus($(this).parent().prevAll('.index').val(), false);
			$(this).nextAll('span').removeClass('cross');
		}
	});
});