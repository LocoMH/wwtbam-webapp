var loggedInAnswer = null
var correctAnswer = null
var currentLevel = 0
var safetyNets = [5, 10, 15]
var lifelineMapping = {
    1: 2,
    2: 1,
    3: 3,
    4: 11,
    // 5: 10,
    // 6: 8
}
var lifelineStatus = {
    1: "available",
    2: "available",
    3: "available",
    4: "unavailable",
    // 5: "available",
    // 6: "highlighted"
}
var screenTypeMapping = {
    'host': 1,
    'contestant': 2,
    'tvscreen': 3
}
var screenTypePasskeys = {
    "host": "host123",
    "contestant": "cont123",
    "tvscreen": "tv123"
}
var graphicsVersion = 'wwm'
var screenType = 'host'