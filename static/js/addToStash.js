<script src="jquery-3.3.1.js"></script>
$(document).ready(function(){
    $("#add1").click(function(){
        $("#addStash").append(" <b>Appended text</b>.");
    });
    $("#btn2").click(function(){
        $("ol").append("<li>Appended item</li>");
    });
});