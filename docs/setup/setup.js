// Copyright (c) 2018 Phạm Ngọc Duy. All rights reserved.
// Please do not copy wihout asking for permission

const roleSetup = {
    "4": [[1, 4, 4, -1]],
    "5": [
        [1, 2, 4, -2, -1],
        [1, 4, 4, 4, -1]
    ],
    "6": [
        [1, 2, 4, 4, -2, -1],
        [1, 2, 3, 4, -1, -1],
        [1, 2, 4, 8, -2, -1],
        [1, 4, 4, 5, 8, -3]
    ],
    "7": [
        [1, 4, 4, 4, 5, 8, -3],
        [1, 2, 4, 4, 8, -2, -1],
        [1, 2, 4, 5, 8, -1, -1],
        [1, 2, 3, 4, 8, -1, -1]
    ],
    "8": [
        [1, 2, 4, 4, 4, 5, -3, -2],
        [1, 2, 3, 4, 4, -2, -1, -1],
        [1, 2, 4, 4, 5, -2, -1, -1],
        [1, 2, 4, 5, 8, -2, -1, -1],
        [1, 2, 3, 4, 5, -2, -1, -1],
        [1, 3, 4, 4, 5, -2, -1, -1],
        [1, 3, 4, 5, 6, -2, -1, -1],
        [1, 2, 4, 5, 6, -2, -1, -1]
    ],
    "9": [
        [1, 2, 4, 4, 4, 5, 8, -3, -2],
        [1, 2, 3, 4, 4, 8, -2, -1, -1],
        [1, 4, 4, 4, 4, 5, -2, -1, -1],
        [1, 2, 4, 4, 5, 8, -2, -1, -1],
        [1, 2, 3, 4, 5, 8, -2, -1, -1],
        [1, 2, 3, 4, 5, 6, -2, -1, -1],
        [1, 2, 3, 4, 4, 5, 6, -3, -2],
        [1, 2, 3, 4, 5, 6, 8, -3, -2]
    ],
    "10": [
        [1, 2, 3, 4, 4, 4, 5, 6, -3, -1],
        [1, 2, 3, 4, 4, 4, 5, -3, -2, -1],
        [1, 2, 4, 4, 4, 5, 6, -2, -1, -1],
        [1, 2, 3, 4, 4, 4, 5, -1, -1, -1],
        [1, 2, 3, 4, 4, 5, 8, -1, -1, -1],
        [1, 2, 3, 4, 4, 4, 5, 7, -3, -1],
        [1, 2, 3, 4, 4, 5, -2, -1, -1, -1],
        [1, 2, 3, 4, 4, 5, 6, -1, -1, -1]
    ],
    "11": [
        [1, 2, 3, 4, 4, 4, 5, 6, -1, -1, -1],
        [1, 2, 3, 4, 4, 4, 5, -2, -1, -1, -1],
        [1, 2, 3, 4, 4, 4, 4, 5, 7, -3, -1],
        [1, 2, 3, 4, 4, 4, 4, 5, 7, -3, -2],
        [1, 2, 3, 4, 4, 4, 4, 5, 6, -3, -2],
        [1, 2, 3, 4, 4, 4, 4, 5, -3, -2, -1],
        [1, 2, 3, 4, 4, 4, 5, 7, -2, -1, -1]
    ]
}
function convertSetupObjectToArray(setup) {
    preSet = [];
    Object.keys(setup).forEach((role) => {
        let count = setup[role];
        for (let i = 0; i < count; i++) {
            preSet.push(parseInt(role));
        }
    });
    return preSet;
}
function changed() {
    // chỉ số
    let canBang = 0, teamDan = 0, teamSoi = 0;
    // setup TEXT: 1 SOI, 1 DAN, 1 TIEN TRI, ...
    var setupResult = '';
    // setup Object {"-3": 1, "-2": 0, "-1": 1, "1": 1, "2": 0, ...}
    var setup = new Object();

    // mỗi chức năng
    $('input[type="checkbox"].co-chuc-nang').each((index, e) => {
        if (e.checked) {
            canBang += parseInt(e.value);
            if ($(this).hasClass("soi")) {
                teamSoi++;
            } else {
                teamDan++;
            }
            setupResult += '1 ' + e.name + ', ';
            setup[e.getAttribute('roleID')] = 1;
        } else {
            setup[e.getAttribute('roleID')] = 0;
        }
    });
    // input[type=range] sói và dân
    let dan = parseInt($('#dan')[0].value);
    let soi = parseInt($('#soi')[0].value);
    canBang += dan - soi * 6;
    setupResult += soi + ' SÓI, ' + dan + ' DÂN!';
    setup["4"] = dan; setup["-1"] = soi;

    // in kết quả
    $("#can-bang").val(canBang);
    $("label[for='can-bang']").html("CÂN BẰNG: " + canBang);
    $("#setup-total").html(teamSoi + soi + teamDan + dan);
    $("#setup-result").html(setupResult);
    $("#setup-code").html(JSON.stringify(convertSetupObjectToArray(setup)));
}


function randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
}
// onClick RANDOM BUTTON
$('#random').click(() => {
    let playersCount = $('#playersCount').val();
    var setup;
    if (roleSetup[playersCount] && roleSetup[playersCount].length > 0) {
        let RSlen = roleSetup[playersCount].length;
        setup = roleSetup[playersCount][randomInt(0, RSlen - 1)];
        // console.log(setup);
        convertAndSetup(setup);
    }
    let setupString = JSON.stringify(setup);
    $('#set').html(`<a href='?setup=${setupString}&players=${$('select').val()}&roomID=26851162'>\>\>\>${setupString}</a>`);
})
$('#start').click(() => {
    var setupString = $("#setup-code").html();
    var roomID = $('#roomID').val();
    if (!isNaN(roomID) && setupString != "") {
        getRequest(`/play/${roomID}/start?setup=${setupString}`).then(res => {
            if (res.success) {
                alert("Thành công! Nhấn back để quay lại game ngay nào!");
            } else {
                alert("Đã có lỗi!");
            }
        })
    }
})

// onChange
$('#dan').change(() => {
    $('label[for="dan"]').html('[+' + $('#dan')[0].value + '] DÂN: ' + $('#dan')[0].value);
    changed();
})
$('#soi').change(() => {
    $('label[for="soi"]').html('[-' + $('#soi')[0].value * 6 + '] SÓI: ' + $('#soi')[0].value);
    changed();
})

$('.co-chuc-nang').change(() => {
    changed();
});



// for setup url params
function convertAndSetup(setupArray) {
    $('input[type=checkbox]:checked').click();
    var setupCount = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "-3": 0, "-2": 0, "-1": 0 };
    setupArray.forEach(role => {
        if (setupCount[role]) {
            setupCount[role]++;
        } else {
            setupCount[role] = 1;
        }
    })
    // console.log(setupCount);
    Object.keys(setupCount).forEach((role) => {
        let roleCount = setupCount[role];
        if (roleCount > 0 && role != 4 && role != -1) {
            $('input[roleID="' + role + '"]').click();
        } else if (role == 4) {
            $('#dan')[0].value = roleCount;
            $('label[for="dan"]').html('[+' + $('#dan')[0].value + '] DÂN: ' + $('#dan')[0].value);
        } else if (role == -1) {
            $('#soi')[0].value = roleCount;
            $('label[for="soi"]').html('[-' + $('#soi')[0].value * 6 + '] SÓI: ' + $('#soi')[0].value);
        }
        changed();
    })
}
// get params from URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// has setup Params in URL
let setupArrayString = getParameterByName('setup');
if (setupArrayString !== null && setupArrayString !== "") {
    let setupArray = JSON.parse(setupArrayString);
    convertAndSetup(setupArray);
}
// has players Params in URL
let playersCountString = getParameterByName('players');
if (playersCountString !== null && playersCountString !== "") {
    let playersCount = JSON.parse(playersCountString);
    $('select').val(playersCount);
    $('#random').click();
}
// has roomID Params in URL
let roomIDString = getParameterByName('roomID');
if (roomIDString !== null && roomIDString !== "") {
    $('#roomID').val(parseInt(roomIDString));
}

function getRequest(url) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: `https://masoiapp.herokuapp.com${url}`,
            success: function (data) {
                resolve(data);
            }
        });
    })
}

setInterval(async () => {
    var roomID = $('#roomID').val();
    var choosedPlayersCount = $('#setup-total').html();
    if (!isNaN(roomID)) {
        let data = await getRequest(`/room/${roomID}/status`);
        // console.log(data);
        let currentPlayersCount = Object.keys(data.players.ready).filter(uid => data.players.ready[uid]).length;
        if (roleSetup[currentPlayersCount] && roleSetup[currentPlayersCount].length > 0) {
            $('#playersCount').val(currentPlayersCount);
        }
        if (choosedPlayersCount != currentPlayersCount) {
            $("label[for=playersCount]").html(`CẢNH BÁO: ${currentPlayersCount} người đã sẵn sàng!`)
            $("label[for=playersCount]").addClass("text-danger")
        } else {
            $("label[for=playersCount]").html(`${choosedPlayersCount} người chơi đã sẵn sàng`)
            $("label[for=playersCount]").removeClass("text-danger")
        }
    }
}, 5000);