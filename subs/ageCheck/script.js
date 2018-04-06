var modal = $('#myModal');
var access = false;

$(document).ready(function(){
    $('#age-btn').click(function(){
        var month = $('input:nth-child(1)').val();
        var day = $('input:nth-child(2)').val();
        var year = $('input:nth-child(3)').val()
        var age = getAge(month, day, year);
        if(age == -1){
            alert('invalid. Please enter valid date.')
        } else if(age >= 21){
            alert('nice, you can drink')
            access = true;
            $('#myModal').css('display', 'none');
        } else {
            alert('sorry bub. too young')
        }
    })
    $(document).keypress(function(e){
        if(e.which == 13){
            if(access == false){
                $('#age-btn').click()
            }
        }
    })
})

function getAge(day, month, year) {
    var today = new Date();
    var birthDate = new Date(`${day}/${month}/${year}`);
    if (birthDate == 'Invalid Date'){
        return -1;
    }
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
}

