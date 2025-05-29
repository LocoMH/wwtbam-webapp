$(document).ready(function () {
    // Generate UI elements
    for (let i = 1; i <= 15; i++) {
        $("#money-tree-area").append(`<span class="money-tree-text money-tree-number version-dependent-formatting" id="money-tree-number-${i}">${i}</span>`)
        $("#money-tree-area").append(`<span class="money-tree-text money-tree-value version-dependent-formatting" id="money-tree-value-${i}">${i}</span>`)
    }

    $("#money-tree-value-1").text("€ 50")
    $("#money-tree-value-2").text("€ 100")
    $("#money-tree-value-3").text("€ 200")
    $("#money-tree-value-4").text("€ 300")
    $("#money-tree-value-5").text("€ 500")
    $("#money-tree-value-6").text("€ 1.000")
    $("#money-tree-value-7").text("€ 2.000")
    $("#money-tree-value-8").text("€ 4.000")
    $("#money-tree-value-9").text("€ 8.000")
    $("#money-tree-value-10").text("€ 16.000")
    $("#money-tree-value-11").text("€ 32.000")
    $("#money-tree-value-12").text("€ 64.000")
    $("#money-tree-value-13").text("€ 125.000")
    $("#money-tree-value-14").text("€ 500.000")
    $("#money-tree-value-15").text("€ 1 MILLION")
})