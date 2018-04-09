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
            setCookie('ageVerified', 'true', 1)
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

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    var user=getCookie("ageVerified");
    if (user != "") {
        access = true;
        console.log('we have the right cookie')
            $('#myModal').css('display', 'none');
    } else{
        console.log('We have no cookies')
    }
}