$(".modal").on("show.bs.modal shown.bs.modal", function (e) {
    // Remove overlay and enable scrolling of body
    $("body").removeClass("modal-open").find(".modal-backdrop").remove();
});

$("#kb-shortcut-popover").find('a').popover({
    container: '#kb-shortcut-popover',
    placement: 'left',
    popperConfig: {
        modifiers: {
            flip: {
                enabled: false
            }
        }
    }
});

let gateIndex = 0;
let input1 = false;
let input2 = false;
let inputButton1 = $("#input-1");
let inputButton2 = $("#input-2");
let inputWire1 = $("#input-wire-1");
let inputWire2 = $("#input-wire-2");
let gate = $("#gate");
let lightEl = $("#light");
let gateDesc = $("#gate-desc-body");



const gateArray = [
    {
        label: "NOT",
        desc: "The NOT gate is the simplest gate: it simply inverts the input it is given.",
        gate: "img/gates/notgate.png",
        init: function () {
            inputWire2.parent().hide();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg = input1
                ? "img/lights/light-off.png"
                : "img/lights/light-on.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "OR",
        desc: "The OR gate will output a 1 if at least one of its inputs is a 1.",
        gate: "img/gates/orgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg =
                input1 || input2
                    ? "img/lights/light-on.png"
                    : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "NOR (NOT OR)",
        desc: "The NOT OR gate, or NOR for short, is the inverse of a regular or gate: it only outputs 1 if both outputs are 0.",
        gate: "img/gates/norgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg = !(input1 || input2)
                ? "img/lights/light-on.png"
                : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "AND",
        desc: "The AND gate will only output 1 if both inputs are 1.",
        gate: "img/gates/andgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg =
                input1 && input2
                    ? "img/lights/light-on.png"
                    : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "NAND (NOT AND)",
        desc: "The NOT AND gate, or NAND for short, is the inverse of AND: will output 0 if both inputs are 1, otherwise it outputs 1. <br/> (Fun fact, every single component in a computer can be constructed with a NAND gate)",
        gate: "img/gates/nandgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg = !(input1 && input2)
                ? "img/lights/light-on.png"
                : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "XOR (exclusive OR)",
        desc: "The exclusive OR gate, or XOR for short, will output 1 when <em>only a single input</em> is 1, otherwise it outputs 0",
        gate: "img/gates/xorgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg =
                (input1 && !input2) || (!input1 && input2)
                    ? "img/lights/light-on.png"
                    : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
    {
        label: "XNOR (exclusive NOR OR)",
        desc: "The exclusive NOT OR gate, or XNOR for short, is the inverse of XOR: it will output 0 when <em>only a single input</em> is 1, otherwise it outputs 1",

        gate: "img/gates/xnorgate.png",
        inputs: {
            off: "inputs/off-input-dual.png",
            on: "inputs/off-input-dual.png",
        },
        init: function () {
            inputButton2.parent().show();
            this.inputHandler();
        },
        inputHandler: function () {
            let lightImg = !((input1 && !input2) || (!input1 && input2))
                ? "img/lights/light-on.png"
                : "img/lights/light-off.png";
            lightEl.attr("src", lightImg);
        },
    },
];


let currentgate = gateArray[0];

function updatePlayground() {
    gate.attr("src", currentgate.gate);
    currentgate.init();
    $("#gate-label, #gate-desc-title").html(currentgate.label);
    $("#gate-desc-body").html(currentgate.desc);
}

function nextgate() {
    $("#nav-" + gateIndex).removeClass("active");
    if (gateIndex == gateArray.length - 1) {
        gateIndex = 0;
    } else {
        gateIndex++;
    }
    $("#nav-" + gateIndex).addClass("active");

    currentgate = gateArray[gateIndex];
    updatePlayground();
}

function prevgate() {
    $("#nav-" + gateIndex).removeClass("active");

    if (gateIndex == 0) {
        gateIndex = gateArray.length - 1;
    } else {
        gateIndex--;
    }
    $("#nav-" + gateIndex).addClass("active");
    console.log(gateIndex)
    currentgate = gateArray[gateIndex];
    updatePlayground();
}

function selectgateByIndex(i) {
    $("#nav-" + gateIndex).removeClass("active");
    gateIndex = i;
    currentgate = gateArray[i];
    updatePlayground();
    $("#nav-" + i).addClass("active");
}

function toggleInput1() {
    input1 = !input1;
    let inputButtonDisplay = input1
        ? "img/buttons/on-button.png"
        : "img/buttons/off-button.png";
    let inputWireDisplay = input1
        ? "img/inputs/on-input-single.png"
        : "img/inputs/off-input-single.png";
    inputWire1.attr("src", inputWireDisplay);
    inputButton1.attr("src", inputButtonDisplay);
    currentgate.inputHandler();
}

function toggleInput2() {
    input2 = !input2;
    let inputButtonDisplay = input2
        ? "img/buttons/on-button.png"
        : "img/buttons/off-button.png";
    let inputWireDisplay = input2
        ? "img/inputs/on-input-single.png"
        : "img/inputs/off-input-single.png";
    inputWire2.attr("src", inputWireDisplay);
    inputButton2.attr("src", inputButtonDisplay);
    currentgate.inputHandler();
}

$(document).bind("keydown", function (e) {
    if (e.keyCode == 49) {
        toggleInput1();
    }
    if (e.keyCode == 50) {
        toggleInput2();
    }
    if (e.keyCode == 37 || e.keyCode == 38) prevgate();
    if (e.keyCode == 39 || e.keyCode == 40) nextgate();
    console.log(e.keyCode)
})

updatePlayground();
