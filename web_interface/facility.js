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

    $.get("facility_search.php", dataToSend, function (data) {
      $("#search-results").html(data);
    });
  });
});

$(document).on("click", ".delete-btn", function () {
  const fid = $(this).data("fid");
  if (confirm("Are you sure you want to delete the facility with FID: " + fid + "?")) {
    $.post("facility_delete.php", { "fid": fid }, function (data) {
      if (data === "success") {
        alert("Facility deleted successfully!");
        $("#search-form").submit();
      } else {
        alert("An error occurred while deleting the facility: " + data);
      }
    });
  }
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

  // Specify the data type of each column: 'string' or 'number'
  const columnDataTypes = {
    0: 'number', // FID
    1: 'string', // Name
    2: 'string', // Address
    3: 'string', // City
    4: 'string', // State
    5: 'string', // Zip
    6: 'string', // Phone
    7: 'string', // Email
    8: 'string', // Website
    9: 'number'  // Capacity
  };

  // Sort the rows based on the content of the specified column
  rows.sort(function (a, b) {
    const aText = $(a).find("td").eq(columnIndex).text().trim();
    const bText = $(b).find("td").eq(columnIndex).text().trim();

    if (columnDataTypes[columnIndex] === 'number') {
      const aNumber = parseInt(aText, 10);
      const bNumber = parseInt(bText, 10);

      if (sortOrder === "asc") {
        return aNumber - bNumber;
      } else {
        return bNumber - aNumber;
      }
    } else {
      if (sortOrder === "asc") {
        return aText.localeCompare(bText);
      } else {
        return bText.localeCompare(aText);
      }
    }
  });

  // Remove all the rows in the tbody before appending the sorted rows
  tbody.empty();

  // Append the sorted rows to the tbody
  $.each(rows, function (index, row) {
    tbody.append(row);
  });
}

$(document).on("click", ".update-btn", function () {
  const fid = $(this).data("fid");

  // Fetch facility data
  $.getJSON(`facility_fetch.php?fid=${fid}`, function (data) {
    let formContent = "";
    for (const key in data) {
      formContent += `
          <div class="form-group">
            <label for="${key}">${key}</label>
            <input type="text" class="form-control" id="${key}" name="${key}" value="${data[key]}" ${key === "FID" ? "readonly" : ""}>
          </div>`;
    }
    $("#update-facility-form").html(formContent);
  });

  // Show the modal
  $("#update-facility-modal").modal("show");
});

$("#update-facility-submit").on("click", function () {
  const formData = $("#update-facility-form").serialize();

  $.post("facility_update.php", formData, function (data) {
    const response = JSON.parse(data);
    if (response.status === "success") {
      alert("Facility updated successfully!");
      $("#update-facility-modal").modal("hide");
      //$("#search-form").submit();
      $.get("facility_search.php", { "fid": response.fid }, function (data) {
        $("#search-results").html(data);
      });
    } else {
      alert("An error occurred while updating the facility. Please try again.");
    }
  });
});


$("#insert-facility-btn").on("click", function () {
  const formHtml = `
        <form id="insert-facility-form">
            <div class="form-group">
                <label for="Name">Name*</label>
                <input type="text" class="form-control" name="name" required>
            </div>
            <div class="form-group">
                <label for="Address">Address</label>
                <input type="text" class="form-control" name="address">
            </div>
            <div class="form-group">
                <label for="City">City*</label>
                <input type="text" class="form-control" name="city" required>
            </div>
            <div class="form-group">
                <label for="Province">Province*</label>
                <input type="text" class="form-control" name="province" required>
            </div>
            <div class="form-group">
                <label for="Postal_Code">Postal Code</label>
                <input type="text" class="form-control" name="postal_code">
            </div>
            <div class="form-group">
                <label for="Phone_Number">Phone Number</label>
                <input type="text" class="form-control" name="phone_number">
            </div>
            <div class="form-group">
                <label for="Web_Address">Web Address</label>
                <input type="text" class="form-control" name="web_address">
            </div>
            <div class="form-group">
                <label for="Type">Type*</label>
                <input type="text" class="form-control" name="type" required>
            </div>
            <div class="form-group">
                <label for="Capacity">Capacity*</label>
                <input type="number" class="form-control" name="capacity" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;


  const insertFacilityModal = `
      <div class="modal" tabindex="-1" role="dialog" id="insert-facility-modal">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Insert a Facility (* means required)</h5>
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

  $("body").append(insertFacilityModal);
  $("#insert-facility-modal").modal("show");

  $("#insert-facility-form").on("submit", function (event) {
    event.preventDefault();

    const formData = $(this).serialize();

    $.post("facility_insert.php", formData, function (data) {
      const response = JSON.parse(data);

      if (response.status === "success") {
        alert("Facility inserted successfully!");
        $("#insert-facility-modal").modal("hide");
        $("#insert-facility-modal").remove();

        // Fetch the newly inserted facility
        $.get("facility_search.php", { "fid": response.fid }, function (data) {
          $("#search-results").html(data);
        });
      } else {
        alert("An error occurred while inserting the facility. Please try again.");
      }
    });
  });
});


function openMap(address) {
  const mapHtml = `
      <div id="map" style="width: 100%; height: 400px;"></div>
  `;

  // Set the map HTML
  document.getElementById("map-modal-body").innerHTML = mapHtml;

  // Show the modal
  $('#map-modal').modal('show');

  // Initialize the Google Map
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: results[0].geometry.location
      });
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(document).on("click", ".address", function () {
  const address = $(this).text();
  const city = $(this).siblings(".city").text();
  const province = $(this).siblings(".province").text();
  const postalCode = $(this).siblings(".postal-code").text();

  const fullAddress = `${address}, ${city}, ${province}, ${postalCode}`;
  openMap(fullAddress);
});

function mapsApiLoaded() {
  // The Google Maps JavaScript API has been loaded.
}