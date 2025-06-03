var loggedInAnswer = null
var correctAnswer = null
var currentLevel = 0
var safetyNets = [5, 10, 15]
var lifelineMapping = {
    1: 2,
    2: 1,
    3: 3,
    4: 11
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
var lifelineAvailability = {
    1: true,
    2: true,
    3: true,
    4: true
}
var graphicsVersion = 'international-2002'
var screenType = 'host'