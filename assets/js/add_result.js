$(document).ready(function() {
    $('button[type="button"]').click(function() {
        var $tr = $(this).closest('tr');
        var candidateId = $(this).closest('tr').data('candidate');
        var interviewId = $(this).closest('table').data('interview');
        var result = $(this).closest('tr').find('select[name="result'+candidateId+'"]').val();
        
        // Send POST request to server
        $.post('/result/interview/add-result', {
            result: result,
            candidateId: candidateId,
            interviewId: interviewId
        }).done(function(response) {
            alert("Result is added.");
            $tr.remove();
        }).fail(function() {
            alert('Failed to add result. Please try again.');
        });
    });
});