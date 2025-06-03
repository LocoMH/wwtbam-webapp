$(document).ready(function () {
    // Generate UI elements
    for (let i = 1; i <= 15; i++) {
        $("#money-tree-overlay").append(`<div class="money-tree-text money-tree-number" id="money-tree-number-${i}">${i}</div>`)
        $("#money-tree-overlay").append(`<div class="money-tree-text money-tree-value" id="money-tree-value-${i}"></div>`)
    }
})