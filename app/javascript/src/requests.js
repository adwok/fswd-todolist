import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export var getAndDisplayAllTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=117',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty(); // Add this line
      response.tasks.forEach(function (task) {
        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

export var createTask = function () {
  $.ajax({
 type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=117',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task-content').val()
      }
    }),
    success: function (response, textStatus) {
      $('#new-task-content').val(''); // Add this line
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });  
}

$('#create-task').on('submit', function (e) {
  e.preventDefault();
  createTask();
});

export var deleteTask = function (id) {
  $.ajax({
 type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=117',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'));
});

$.ajax({
  type: 'PUT',
   url: 'https://fewd-todolist-api.onrender.com/tasks/1549/mark_complete?api_key=117',
   dataType: 'json',
   success: function (response, textStatus) {
     console.log(response);
   },
   error: function (request, textStatus, errorMessage) {
     console.log(errorMessage);
   }
 });

export var markTaskComplete = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=117',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

export var markTaskActive = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=117',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$(document).on('change', '.mark-complete', function () {
  if (this.checked) {
     markTaskComplete($(this).data('id'));
   } else {
     markTaskActive($(this).data('id'));
   }
 });

//export var indexTasks = function (successCB, errorCB) {
  //var request = {
    //type: 'GET',
    //url: 'api/tasks?api_key=1',
    //success: successCB,
    //error: errorCB
  //}

  //$.ajax(request);
//};

//export var postTask = function (content, successCB, errorCB) {
  //var request = {
    //type: 'POST',
    //url: 'api/tasks?api_key=1',
    //data: {
      //task: {
        //content: content
      //}
    //},
    //success: successCB,
    //error: errorCB
  //}

  //$.ajax(request);
//};