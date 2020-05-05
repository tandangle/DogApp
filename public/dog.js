$(document).ready(function() {
    $("#first").fadeIn(2000, function(){
        $("#first").fadeOut(2000, function(){
            $("#second").fadeIn(2000,function(){
                $("#second").fadeOut(2000, function(){
                    $("#nameText, #nameInput").fadeIn(2000)
                })
            })
        })
    })
});

$("#nameInput").keyup(function(){
    if($("#nameInput").val() !== "" && $("#nameButton").css("visibility") == "hidden") {
        $("#nameButton").css('visibility', 'visible').fadeTo('fast', 1);
        console.log($("#nameButton").css("display"));
    } else if ($("#nameInput").val() == ""){
        $("#nameButton").fadeTo('fast', 0, function() {
            $(this).css('visibility', 'hidden');
        });
    }
})


$("#nameButton").click(function(){
    $("#nameText, #nameInput").fadeOut(1000);
    $("#nameButton").fadeTo(1000, 0, function() {
        $(this).css('visibility', 'hidden');
    });
})