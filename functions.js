
function loginAnswer(answer) {
    loggedInAnswer = answer
    correctAnswer = null
    updateQuestionGraphics()
    updateAnswerFormatting()
}

function showAnswer(answer) {
    $(`#answer-${answer}`).show()
}

function hideAnswer(answer) {
    $(`#answer-${answer}`).hide()
}

function showCorrectAnswer(answer) {
    correctAnswer = answer
    updateQuestionGraphics()
    updateAnswerFormatting()
}

function setCurrentLevel(level) {
    if (level > 15) {
        level = 15
    } else if (level < 0) {
        level = 0
    }
    currentLevel = level
    updateMoneyTreeGraphics()
}

function setLifelineAvailability(lifeline, available) {
    lifelineAvailability[lifeline] = available
    updateLifelineGraphics()
}

function updateLifelineGraphics() {
    for (const [lifeline, available] of Object.entries(lifelineAvailability)) {
        if (available) {
            $(`#lifeline-${lifeline}`).attr("src", `graphics/${graphicsVersion}/LIFELINES/${lifelineMapping[lifeline]}0.png`)
        } else {
            $(`#lifeline-${lifeline}`).attr("src", `graphics/${graphicsVersion}/LIFELINES/${lifelineMapping[lifeline]}x.png`)
        }
    }
}

function updateMoneyTreeGraphics() {
    $('#money-tree-overlay-background').attr('src', `graphics/${graphicsVersion}/TREE/15/TREE${currentLevel}.png`)
    $('#money-tree-background').attr('src', `graphics/${graphicsVersion}/RUS_GRAPH/tree_back_cut${screenTypeMapping[screenType]}.png`)
    $('#img-background').attr('src', `graphics/${graphicsVersion}/RUS_GRAPH/back${screenTypeMapping[screenType]}.jpg`)
    $('.money-tree-text').removeClass("money-tree-current-level")
    for (sn of safetyNets) {
        $(`#money-tree-value-${sn}`).addClass("money-tree-safety-net")
        $(`#money-tree-number-${sn}`).addClass("money-tree-safety-net")
    }
    $(`#money-tree-value-${currentLevel}`).addClass("money-tree-current-level").removeClass("money-tree-safety-net")
    $(`#money-tree-number-${currentLevel}`).addClass("money-tree-current-level").removeClass("money-tree-safety-net")
}

function updateAnswerFormatting() {
    $('.answer-text').removeClass("logged-in-or-correct")
    if (loggedInAnswer) {
        $(`#answer-${loggedInAnswer}`).addClass("logged-in-or-correct")
    }
    if (correctAnswer) {
        $(`#answer-${correctAnswer}`).addClass("logged-in-or-correct")
    }
}

function updateQuestionGraphics() {
    if (!loggedInAnswer && !correctAnswer) {
        $('#question-img').attr('src', `graphics/${graphicsVersion}/RUS_LOZENG/lozengABCD.png`)
        return
    }
    if (loggedInAnswer && !correctAnswer) {
        $('#question-img').attr('src', `graphics/${graphicsVersion}/RUS_LOZENG/lozeng${loggedInAnswer}FW.png`)
        return
    }
    if (correctAnswer && (correctAnswer == loggedInAnswer || !loggedInAnswer)) {
        $('#question-img').attr('src', `graphics/${graphicsVersion}/RUS_LOZENG/lozeng${correctAnswer}RB.png`)
        return
    }
    if (correctAnswer) {
        $('#question-img').attr('src', `graphics/${graphicsVersion}/RUS_LOZENG/lozeng1${loggedInAnswer}${correctAnswer}.png`)
        return
    }
}

function setVisibility(element, visible) {
    if (visible) {
        $(`#${element}`).show()
    } else {
        $(`#${element}`).hide()
    }
}

function updateLayout() {
    $("*").removeClass("international-rave-revival international-2002 wwm")
    $("*").addClass(graphicsVersion)
    var moneyTreeTop = parseFloat(getComputedStyle($(`#${graphicsVersion}`)[0]).getPropertyValue("--money-tree-top"))
    var moneyTreeDistance = parseFloat(getComputedStyle($(`#${graphicsVersion}`)[0]).getPropertyValue("--money-tree-distance"))
    for (let i = 15; i >= 0; i--) {
        $(`#money-tree-number-${i}`).css('top', `${(15 - i) * moneyTreeDistance + moneyTreeTop}%`);
        $(`#money-tree-value-${i}`).css('top', `${(15 - i) * moneyTreeDistance + moneyTreeTop}%`);
    }
}

function updateScreenType() {
    $("*").removeClass("host contestant tvscreen")
    $("*").addClass(screenType)
    register()
}

function updateLogo() {
    $("#img-logo-overlay").attr("src", `graphics/${graphicsVersion}/GER_LOGO.jpg`)
}

function setGraphicsVersion(newGraphicsVersion) {
    graphicsVersion = newGraphicsVersion
    updateQuestionGraphics()
    updateMoneyTreeGraphics()
    updateLifelineGraphics()
    updateLayout()
    updateLogo()
}

function setScreenType(newScreenType) {
    screenType = newScreenType
    updateScreenType()
    updateMoneyTreeGraphics()
}