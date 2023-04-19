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
        
        $.get("infection_search.php", dataToSend, function (data) {
            $("#search-results").html(data);
        });
    });
});

$("#insert-infection-btn").on("click", function () {
    const formHtml = `
          <form id="insert-infection-form">
              <div class="form-group">
                  <label for="EID">Employee ID*</label>
                  <input type="number" class="form-control" name="eid" required>
              </div>
              <div class="form-group">
                  <label for="Nature">Nature*</label>
                  <select class="form-control" name="nature" required>
                      <option value="COVID-19">COVID-19</option>
                      <option value="Delta Variant">Delta Variant</option>
                      <option value="Omicron Variant">Omicron Variant</option>
                      <option value="Influenza">Influenza</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="i_date">Infection Date*</label>
                  <input type="date" class="form-control" name="i_date" required>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      `;

    const insertInfectionModal = `
        <div class="modal" tabindex="-1" role="dialog" id="insert-infection-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add an Infection Entry (* means required)</h5>
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

    $("body").append(insertInfectionModal);
    $("#insert-infection-modal").modal("show");

    $("#insert-infection-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serialize();

        $.post("infection_insert.php", formData, function (data) {
            const response = JSON.parse(data);
            console.log(response);
            if (response.status === "success") {
                alert("Infection entry added successfully!");
                $("#insert-infection-modal").modal("hide");
                $("#insert-infection-modal").remove();

                // Fetch the newly inserted infection entry
                $.get("infection_search.php", { "eid": response.eid }, function (data) {
                    $("#search-results").html(data);
                });
            } else {
                alert("An error occurred while adding the infection entry. Error details: " + response.error);
            }
        });
    });
});

$(document).on("click", ".update-btn", function () {
    const data = $(this).data("row");

    let formContent = `
      <input type="hidden" id="update-eid" name="eid" value="${data.EID}">
      <input type="hidden" id="update-infection-number" name="infection_number" value="${data.Infection_Number}">
      <div class="form-group">
        <label for="update-nature">Nature</label>
        <input type="text" class="form-control" id="update-nature" name="nature" value="${data.Nature}" required>
      </div>
      <div class="form-group">
        <label for="update-i-date">Infection Date</label>
        <input type="date" class="form-control" id="update-i-date" name="i_date" value="${data.I_Date}" required>
      </div>`;
    $("#update-infection-form").html(formContent);

    // Show the modal
    $("#update-infection-modal").modal("show");
});

$("#update-infection-submit").on("click", function () {
    const formData = $("#update-infection-form").serialize();

    $.post("infection_update.php", formData, function (data) {
        const response = JSON.parse(data);
        if (response.status === "success") {
            alert("Infection updated successfully!");
            $("#update-infection-modal").modal("hide");
            $.get("infection_search.php", { "eid": response.eid, "infection_number": response.infection_number}, function (data) {
                $("#search-results").html(data);
              });
        } else {
            alert("An error occurred while updating the infection: " + response.message);
        }
    });
});

