$(document).ready(function () {
  $('#input-type').on('change', function () {
    if ($(this).val() === 'file') {
      $('#text-input').hide();
      $('#file-input').show();
    } else {
      $('#file-input').hide();
      $('#text-input').show();
    }
  });

  $('#convert-btn').on('click', function () {
    const inputType = $('#input-type').val();
    const action = $('#action').val();
    const charset = $('#charset').val();
    $('#progressbar').show();
    
    if (inputType === 'text') {
      const text = $('#text-input').val();
      if (!text) {
        alert('Please enter text to encode or decode.');
        $('#progressbar').hide();
        return;
      }

      if (action === 'encode') {
        const encodedText = btoa(unescape(encodeURIComponent(text)));
        $('#output').val(encodedText);
      } else {
        try {
          const decodedText = decodeURIComponent(escape(atob(text)));
          $('#output').val(decodedText);
        } catch (e) {
          alert('Invalid base64 input.');
        }
      }
      $('#progressbar').hide();

    } else {
      const file = $('#file-input')[0].files[0];
      if (!file) {
        alert('Please upload a file.');
        $('#progressbar').hide();
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        if (action === 'encode') {
          const encodedFile = btoa(fileContent);
          $('#output').val(encodedFile);
        } else {
          try {
            const decodedFile = atob(fileContent);
            $('#output').val(decodedFile);
          } catch (e) {
            alert('Invalid base64 file content.');
          }
        }
        $('#progressbar').hide();
      };
      reader.readAsBinaryString(file);
    }
  });

  $('#clear-btn').on('click', function () {
    $('#output').val('');
    $('#text-input').val('');
    $('#file-input').val('');
  });

  $("#progressbar").progressbar({
    value: false,
    complete: function() {
      $(".progress-label").text("Complete!");
    }
  });
});
