var $status = $("#status");

$("#password").keyup(function () {
    var size = $(this).val().length;
    if(size > 0 && size < 2){
        changeClass("status-worst");
        $status.text("Fraco");
    }else if(size > 1 && size < 3){
        changeClass("status-good");
        $status.text("Boa");
    }else if(size > 2 && size < 4){
        changeClass("status-excelent");
        $status.text("Forte");
    }else if(size === 0){
        changeClass("");
        $status.text("Vazio");
    }
});

function changeClass(name){
    $status.removeClass(function (index, className){
        return (className.match (/(^|\s)status-\S+/g) || []).join(' ');
    });
    $status.addClass(name);
}
