



$(document).ready(function () {

    setGraphicsVersion(graphicsVersion)
    setScreenType(screenType)
    setCurrentLevel(15)

    $("#btn-set-host").on("click", function () {
        setScreenType("host")
    })
    $("#btn-set-contestant").on("click", function () {
        setScreenType("contestant")
    })
    $("#btn-set-tvscreen").on("click", function () {
        setScreenType("tvscreen")
    })

});
