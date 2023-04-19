$(document).ready(function () {
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serializeArray();
        const dataToSend = {};

        formData.forEach((item) => {
            if (Array.isArray(dataToSend[item.name])) {
                dataToSend[item.name].push(item.value);
            } else if (dataToSend.hasOwnProperty(item.name)) {
                dataToSend[item.name] = [dataToSend[item.name], item.value];
            } else {
                dataToSend[item.name] = item.value;
            }
        });

        $.get("employee_search.php", dataToSend, function (data) {
            $("#search-results").html(data);
        });
    });
});

$(document).ready(function () {
    let sortOrders = {};

    $(document).on("click", ".sortable", function () {
        const columnIndex = $(this).data("column-index");
        const table = $(this).closest("table");

        // Toggle the sorting order for the clicked column
        if (sortOrders[columnIndex] === "asc") {
            sortOrders[columnIndex] = "desc";
        } else {
            sortOrders[columnIndex] = "asc";
        }

        sortTable(table, columnIndex, sortOrders[columnIndex]);
    });
});

function sortTable(table, columnIndex, sortOrder) {
    const tbody = table.find("tbody");
    const rows = tbody.find("tr").toArray();

    // Specify the data type of each column: 'string', 'number', or 'date'
    const columnDataTypes = {
        0: 'number', // EID
        1: 'string', // FName
        2: 'string', // LName
        3: 'string', // DoB
        4: 'number', // FID
        5: 'string', // Facility_Name
        6: 'string', // Title
        7: 'date',   // Start_Date
        8: 'date',   // End_Date
    };

    // Sort the rows based on the content of the specified column
    rows.sort(function (a, b) {
        const aText = $(a).find("td").eq(columnIndex).text().trim();
        const bText = $(b).find("td").eq(columnIndex).text().trim();

        if (columnDataTypes[columnIndex] === 'number') {
            const aNumber = parseInt(aText, 10);
            const bNumber = parseInt(bText, 10);

            return sortOrder === "asc" ? aNumber - bNumber : bNumber - aNumber;
        } else if (columnDataTypes[columnIndex] === 'date') {
            const aDate = new Date(aText);
            const bDate = new Date(bText);

            return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
        } else {
            return sortOrder === "asc" ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
    });

    // Remove all the rows in the tbody before appending the sorted rows
    tbody.empty();

    // Append the sorted rows to the tbody
    $.each(rows, function (index, row) {
        tbody.append(row);
    });
}


$("#insert-employee-btn").on("click", function () {
    const formHtml = `
          <form id="insert-employee-form">
              <div class="form-group">
                  <label for="FName">First Name*</label>
                  <input type="text" class="form-control" name="fname" required>
              </div>
              <div class="form-group">
                  <label for="LName">Last Name*</label>
                  <input type="text" class="form-control" name="lname" required>
              </div>
              <div class="form-group">
                  <label for="DoB">Date of Birth*</label>
                  <input type="date" class="form-control" name="dob" required>
              </div>
              <div class="form-group">
                  <label for="Medicare">Medicare Number*</label>
                  <input type="number" class="form-control" name="medicare" required>
              </div>
              <div class="form-group">
                  <label for="Telephone">Telephone Number</label>
                  <input type="text" class="form-control" name="telephone">
              </div>
              <div class="form-group">
                  <label for="Address">Address</label>
                  <input type="text" class="form-control" name="address">
              </div>
              <div class="form-group">
                  <label for="City">City</label>
                  <input type="text" class="form-control" name="city">
              </div>
              <div class="form-group">
                  <label for="Province">Province</label>
                  <input type="text" class="form-control" name="province">
              </div>
              <div class="form-group">
                  <label for="Postal_Code">Postal Code</label>
                  <input type="text" class="form-control" name="postal_code">
              </div>
              <div class="form-group">
                  <label for="Citizenship">Citizenship</label>
                  <input type="text" class="form-control" value="Canada" name="citizenship">
              </div>
              <div class="form-group">
                  <label for="Email">Email*</label>
                  <input type="text" class="form-control" name="email" required>
              </div>
              <div class="form-group">
                  <label for="FID">Facility ID (work in)*</label>
                  <input type="number" class="form-control" name="fid" required>
              </div>
              <div class="form-group">
                <label for="Role">Role</label>
                <select class="form-control" name="role" required>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="receptionist">Receptionist</option>
                <option value="administrative personnel">Administrative Personnel</option>
                <option value="security personnel">Security Personnel</option>
                <option value="regular employee" selected>Regular Employee</option>
                </select>
              </div>
              <div class="form-group">
                  <label for="Start_Date">Start Date*</label>
                  <input type="date" class="form-control" name="start_date" required>
              </div>
              <div class="form-group">
                  <label for="End_Date">End Date</label>
                  <input type="date" class="form-control" name="end_date">
              </div>


              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      `;


    const insertEmployeeModal = `
        <div class="modal" tabindex="-1" role="dialog" id="insert-employee-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add an Employee (* means required)</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${formHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

    $("body").append(insertEmployeeModal);
    $("#insert-employee-modal").modal("show");

    $("#insert-employee-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serialize();

        $.post("employee_insert.php", formData, function (data) {
            const response = JSON.parse(data);

            if (response.status === "success") {
                alert("Employee added successfully!");
                $("#insert-employee-modal").modal("hide");
                $("#insert-employee-modal").remove();

                // Fetch the newly inserted facility
                $.get("employee_search.php", { "eid": response.eid }, function (data) {
                    $("#search-results").html(data);
                });
            } else {
                alert("An error occurred while adding the employee. Error details: " + response.error);
            }
        });
    });
});

$(document).on("click", ".delete-btn", function () {
    const eid = $(this).data("eid");
    if (confirm("Are you sure you want to delete the employee with EID: " + eid + "?")) {
        $.post("employee_delete.php", { "eid": eid }, function (data) {
            if (data === "success") {
                alert("Employee deleted successfully!");
                $("#search-form").submit();
            } else {
                alert("An error occurred while deleting the employee: " + data);
            }
        });
    }
});

$(document).on("click", ".update-btn", function () {
    const eid = $(this).data("eid");

    // Fetch facility data
    $.getJSON(`employee_fetch.php?eid=${eid}`, function (data) {
        let formContent = "";
        for (const key in data) {
            formContent += `
              <div class="form-group">
                <label for="${key}">${key}</label>
                <input type="text" class="form-control" id="${key}" name="${key}" value="${data[key]}" ${key === "EID" ? "readonly" : ""}>
              </div>`;
        }
        $("#update-employee-form").html(formContent);
    });

    // Show the modal
    $("#update-employee-modal").modal("show");
});

$("#update-employee-submit").on("click", function () {
    const formData = $("#update-employee-form").serialize();

    $.post("employee_update.php", formData, function (data) {
        const response = JSON.parse(data);
        if (response.status === "success") {
            alert("Employee updated successfully!");
            $("#update-employee-modal").modal("hide");
            $("#search-form").submit();
        } else {
            alert("An error occurred while updating the employee: " + response.message);
        }
    });
});
