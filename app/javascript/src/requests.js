import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export var createTask = function () {
  $.ajax({
 type: 'POST',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1',
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
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1',
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
   url: 'https://fewd-todolist-api.onrender.com/tasks/1549/mark_complete?api_key=1',
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
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1',
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
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1',
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

export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};