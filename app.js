function addTodo() {
    var category = $('a.selected').attr('rel');
    var todos = JSON.parse(localStorage.getItem("todos" + category));
    if (todos == null) todos = new Array();
    if ($('#todos').children().length != 0) {
        var index = todos.length;
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
    todo.desc = data;
    todo.done = false;
    todos.push(todo)
    localStorage.setItem("todos" + category, JSON.stringify(todos));
    bindFields();

}
function addCategory() {
    var data = $('#newCategory').val();
	var newMenuItem = $('<li></li>');
    var newCategory = $('<a href="#' + data + '" rel="' + data + '"></a>');
    newCategory.text(data);
    newMenuItem.append(newCategory);
    $('#lastItem').before(newMenuItem);
    newMenuItem.toggle('slide');
    $('#newCategory').val('');
    var categories = JSON.parse(localStorage.getItem("categories"));
    if (categories == null) categories = new Array();
	
    categories.push(data);
    localStorage.setItem("categories", JSON.stringify(categories));
    bindFields();

}
function removeTodo(index) {
    var category = $('a.selected').attr('rel');
    var todos = JSON.parse(localStorage.getItem("todos" + category));
    todos.splice(index, 1);
    localStorage.setItem("todos" + category, JSON.stringify(todos));
}
function changeStatus(index, done) {
    var category = $('a.selected').attr('rel');
    var todos = JSON.parse(localStorage.getItem("todos" + category));
    todos[index].done = done;
    localStorage.setItem("todos" + category, JSON.stringify(todos));
}
function bindFields() {
	$('menu ul li a').click(function() {
        $('menu ul li a').removeClass('selected');
        $(this).addClass('selected');
        loadTodos($(this).attr('rel'));
		return false;
    });
    $('#todos article:last-child .delete').click(function(e) {
        removeTodo($(this).prevAll('.index').val());
        $(this).parent().fadeOut();
        e.preventDefault();
        return false;
    });
    $('#todos article:last-child input:checkbox').change(function() {

        if ($(this).is(':checked')) {
            changeStatus($(this).parent().prevAll('.index').val(), true);
            $(this).nextAll('span').addClass('cross');
        } else {
            changeStatus($(this).parent().prevAll('.index').val(), false);
            $(this).nextAll('span').removeClass('cross');
        }
    });

}
function loadTodos(category) {
	$('#todos').html('');
    var todos = JSON.parse(localStorage.getItem("todos" + category));
    if (todos != null) {
	
        for (i = 0; i < todos.length; i++)
        {
			
            var todo = todos[i];
            var check = '';
            var classes = '';
            if (todo.done) {
                check = 'checked';
                classes = 'cross';
            }
            var newArticle = $('<article></article>');
            var newHidden = $('<input class=\"index\" type=\"hidden\">');
            newHidden.val(i);
            var newLabel = $('<label></label>');
            newLabel.append('<input type=\"checkbox\" ' + check + '/>');
            var newSpan = $('<span class=\"' + classes + '\"></span>');
            newSpan.text(todo.desc);
            newLabel.append(newSpan);
            newArticle.append(newHidden).append(newLabel).append('<a class=\"delete\" href=\"#delete\">x</a>');
            
            $('#todos').append(newArticle);

        }
    }

}
function loadCategories() {
    var cat = JSON.parse(localStorage.getItem("categories"));
    if (cat != null) {
        for (i = 0; i < cat.length; i++)
        {
            var category = cat[i];
            var newMenuItem = $('<li></li>');
            var newCategory = $('<a href="#' + category + '" rel="' + category + '"></a>');
            newCategory.text(category);
            newMenuItem.append(newCategory);
            $('#lastItem').before(newMenuItem);


        }
    }
}
$(function() {
    loadCategories();
    loadTodos('main');
    $('#new input').keydown(function(e) {
        if (e.which == 13) {
            addTodo();
        }
    });
    $('#newCategory').keydown(function(e) {
        if (e.which == 13) {
            addCategory();
        }
    });
    $('menu ul li a').click(function() {
        $('menu ul li a').removeClass('selected');
        $(this).addClass('selected');
        loadTodos($(this).attr('rel'));
		return false;
    });

    $('#clear').click(function(e) {
        if (confirm("Are you sure you want to delete all todos?")) {
            var category = $('a.selected').attr('rel');
            localStorage.removeItem("todos" + category);
            e.preventDefault();
            $('#todos').children().fadeOut();
        }
        return false;
    });

    $('.delete').click(function(e) {
        removeTodo($(this).prevAll('.index').val());
        $(this).parent().fadeOut();
        e.preventDefault();
        return false;
    });
    $('header h1').click(function() {
        $('menu ul li').toggle('slide');
    });
    $('input:checkbox').change(function() {

        if ($(this).is(':checked')) {
            changeStatus($(this).parent().prevAll('.index').val(), true);
            $(this).nextAll('span').addClass('cross');
        } else {
            changeStatus($(this).parent().prevAll('.index').val(), false);
            $(this).nextAll('span').removeClass('cross');
        }
    });
});