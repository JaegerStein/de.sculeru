const type = $("#type");
const typeIcons = $("#type-icons");
const typeIconList = $("#type-icon-list");

let currentImg = 1;
const imgIcon = ["src/icon/imageSmall.svg", "src/icon/imageMedium.svg", "src/icon/imageLarge.svg"];

const img = (id, src, alt) => "<img id=\"" + id + "\" src=\"" + src + "\" alt=\"" + alt + "\">";

$("#dl").on("click", function () {
    const card = $("#card");
    card.addClass("no-br");

    // This is the former husk of html2canvas miserable attempt to produce a decent image for me.
    // I'll leave it here as a warning.

    // html2canvas(document.querySelector("#card")).then(canvas => {
    //     canvas.toBlob(function (blob) {
    //         window.saveAs(blob, 'my_image.jpg');
    //     });
    // });

    domtoimage.toBlob(document.getElementById("card")).then(function (blob) {
        window.saveAs(blob, "card.png");
        card.removeClass("no-br");
    });
});

$("#upload").on("click", () => $("#image-input")[0].click());
type.on("click", () => typeIcons.toggleClass("expand"));

$("#type-icons img").on("click", function (event) {
    const $target = type.find("img");
    if ($target.attr("id") !== "replacer") {
        insert($target);
    }
    addBorderGradiant($(event.target).attr("id"));
    $(type.children()[0]).html(event.target);
});

function addBorderGradiant(currentTypeId) {
    const backgroundGradient = $("#gradient-border");
    backgroundGradient.removeClass("abi arm art spe tra wea").addClass(currentTypeId);
}

// I don't even know anymore
$("#switch-button").on("click", function (event) {
    const lower = $("#lower");
    const upload = $("#upload");
    switch (currentImg) {
        case 0:
            upload.addClass("full").removeClass("min")
            lower.addClass("full").removeClass("min")
            break;
        case 1:
            upload.addClass("third").removeClass("full")
            lower.addClass("third").removeClass("full")
            break;
        case 2:
            upload.addClass("min").removeClass("third")
            lower.addClass("min").removeClass("third")
            break;
        default:
            console.log("You fucked up");
            break;
    }
    currentImg += currentImg === 2 ? -2 : 1;
    $(event.target).attr("src", imgIcon[currentImg]);
});

function insert($img) {
    typeIconList.append($img)
}

const image_input = document.querySelector("#image-input");
image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#card").style.background = `url(${uploaded_image}) center/cover no-repeat`;
    });
    reader.readAsDataURL(this.files[0]);
});

const propContent = $("#prop-content");
const initialPFS = parseInt(propContent.css("font-size"));
propContent.on("input", function () {
    resizeFont(propContent, initialPFS, 512 - 32, 14);
});

const titleContent = $("#title-content");
const initialTFS = parseInt(titleContent.css("font-size"));
titleContent.on("input", function () {
    resizeFont(titleContent, initialTFS, 512 * (2 / 3) - 32, 20);
});


/* LEGACY
propContent.on("input", function () {
    propContent.css({'font-size': initialPFS + "px"});

    function fontSize(fsize, increment) {
        return {'font-size': (fsize + increment) + "px"}
    }

    const x = propContent.width();
    while (propContent.width() >= 512 - 32) {
        const current = parseInt(propContent.css("font-size"));
        propContent.css(fontSize(current, -1));
    }
});
*/

function resizeFont($target, initialFontSize, maxWidth, minFontSize) {
    const fontSize = (size, increment) => ({'font-size': (size + increment) + "px"});
    $target.css({'font-size': initialFontSize + "px"});
    while ($target.innerWidth() >= maxWidth) {
        const currentFontSize = parseInt($target.css("font-size"));
        if (currentFontSize <= minFontSize) break;
        $target.css(fontSize(currentFontSize, -1));
    }
}

$(function () {
    type.width(type.height());
});

/*
window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
};
*/