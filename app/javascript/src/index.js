import $ from 'jquery';

import {
  createTask,
  deleteTask,
  markTaskComplete,
  markTaskActive,
  indexTasks,
  postTask,
} from "./requests.js";

var getAndDisplayAllTasks = function() {
  indexTasks(function (response) {
    $('#todo-list').empty(); // Add this line
    response.tasks.forEach(function (task) {
      $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
    });
  });
};


$(document).ready(function () {
  console.log("Document is ready!");

  getAndDisplayAllTasks();

   $("#create-task").on("submit", function (e) {
     e.preventDefault();
     createTask($("#create-task input").val());
     $("#create-task input").val("");
   });

   $(document).on("click", ".delete", function () {
     deleteTask($(this).data("id"));
   });

   $(document).on("click", ".mark-complete", function () {
     markTaskComplete($(this).data("id"));
   });

   $(document).on("click", ".mark-active", function () {
     markTaskActive($(this).data("id"));
   });
});

//indexTasks(function (response) {
  //var htmlString = response.tasks.map(function(task) {
    //return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
      //" + task.content + "\
      //</div>";
  //});

  //$("#tasks").html(htmlString);
//});