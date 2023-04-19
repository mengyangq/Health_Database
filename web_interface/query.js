document.addEventListener("DOMContentLoaded", function() {
    hljs.highlightAll();
});

$(document).on("click", ".check-sql-q6", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q6").html(data);
    });
  });

  $(document).on("click", ".check-sql-q7", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();

    const facilityID = document.getElementById("facility-id-q7").value;
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query-facility.php", { query: sqlQuery,facilityID: facilityID }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q7").html(data);
    });
  });

  $(document).on("click", ".check-sql-q8", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();

    const EID = document.getElementById("employee-id-q8").value;

    const startDate = document.getElementById("startDate-q8").value;
    const endDate = document.getElementById("endDate-q8").value;
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query-date.php", { query: sqlQuery,EID: EID, startDate: startDate, endDate: endDate }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q8").html(data);
    });
  });


  $(document).on("click", ".check-sql-q9", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q9").html(data);
    });
  });

  $(document).on("click", ".check-sql-q10", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();

    const facilityID = document.getElementById("facility-id-q10").value;
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query-facility.php", { query: sqlQuery,facilityID: facilityID }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q10").html(data);
    });
  });


  $(document).on("click", ".check-sql-q11", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();

    const facilityID = document.getElementById("facility-id-q11").value;
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query-facility.php", { query: sqlQuery,facilityID: facilityID }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q11").html(data);
    });
  });


  $(document).on("click", ".check-sql-q12", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();

    const EID = document.getElementById("facility-id-q12").value;

    const startDate = document.getElementById("startDate-q12").value;
    const endDate = document.getElementById("endDate-q12").value;
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query-date.php", { query: sqlQuery,EID: EID, startDate: startDate, endDate: endDate }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q12").html(data);
    });
  });


  $(document).on("click", ".check-sql-q13", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q13").html(data);
    });
  });

  $(document).on("click", ".check-sql-q14", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q14").html(data);
    });
  });

  $(document).on("click", ".check-sql-q15", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q15").html(data);
    });
  });

  $(document).on("click", ".check-sql-q16", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q16").html(data);
    });
  });

  $(document).on("click", ".check-sql-q17", function () {
    // Get the SQL query from the code block
    const targetId = $(this).data("target");

    const sqlQuery = $(targetId).find("code").text();
  
    // Send the query to your server-side script using jQuery's $.post() method
    $.post("query.php", { query: sqlQuery }, function(data) {
      // Display the results in the 'query-results' div
      $("#query-results-q17").html(data);
    });
  });

  function checkPasswordAndSubmit() {
    const correctPassword = "myxy2023";
    const passwordInput = document.getElementById("password");
    const enteredPassword = passwordInput.value;
    if (enteredPassword === correctPassword) {
      const sqlCode = $("#sql-code").val();
      const requestData = { query: sqlCode };
  
      $.post("query.php", requestData, function (data) {
        $("#sql-form-results").html(data);
    });
    } else {
      alert("Incorrect password. Please try again.");
    }
    passwordInput.value = '';
  };