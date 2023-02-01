"use strict";

function scrollHeader() {
    $(window).scrollTop() > 5 ? $(".header").addClass("header--fixed") : $(".header").removeClass("header--fixed")
}

let colls = document.querySelectorAll(".works__coll.hidden");
const worksJs = document.querySelector(".works--js"), number = document.querySelector(".phone-mask"),
    circle = document.querySelector(".form__label-box>.form__circle");
worksJs.addEventListener("click", e => {
    e.preventDefault(), colls.forEach((e, o) => {
        o < 6 && e.classList.remove("hidden")
    }), colls = document.querySelectorAll(".works__coll.hidden"), colls.length || worksJs.classList.add("hidden")
}), document.querySelector(".phone-mask").addEventListener("input", e => {
    e.target.value ? (circle.classList.add("green"), circle.classList.remove("error")) : circle.classList.add("error")
}),

 $(".faq--js").on("click", (function (o) {
    o.preventDefault(), $(".faq__coll").removeClass("hidden"), $(this).addClass("hidden")
})), $(".arrow-top").on("click", (function () {
    var o = $(this).attr("href"), e = $(o).offset().top;
    return jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: e}, 600), !1
})), $("#map").length > 0 && ymaps.ready((function () {
    var o = new ymaps.Map("map", {
        center: [55.546893, 37.497117],
        controls: ["zoomControl"],
        zoom: 16
    }, {searchControlProvider: "yandex#search"}), e = new ymaps.Placemark([55.546893, 37.497117], {
        hintContent: "г. Москва, ул. Потаповская Роща, 4к4",
        balloonContent: ""
    });
    o.behaviors.disable("scrollZoom"), o.geoObjects.add(e)
})), $(".accordion__top").length > 0 && ($(".accordion__top").on("click", (function () {
    $(this).parent().toggleClass("active"), $(this).parent().hasClass("active") ? $(this).next().slideDown() : ($(".accordion__hidden").slideUp(), $(".accordion").removeClass("active"))
})), $((function (o) {
    o(document).mouseup((function (e) {
        var s = o(".accordion.active");
        s.is(e.target) || 0 !== s.has(e.target).length || s.removeClass("active")
    }))
})), $((function (o) {
    o(document).mouseup((function (e) {
        var s = o(".accordion__hidden");
        s.is(e.target) || 0 !== s.has(e.target).length || s.slideUp()
    }))
}))), $(".field").length > 0 && ($(".field").on("focus", (function () {
    $(this).parent().parent().addClass("focus")
})), $(".field").on("blur", (function () {
    0 == $(this).val().length ? $(this).parent().parent().removeClass("focus") : $(this).parent().parent().addClass("focus")
}))), $(function (o, e, s) {
    var n = o.querySelectorAll(".inputfile");
    Array.prototype.forEach.call(n, (function (o) {
        var e = o.nextElementSibling, s = e.innerHTML;
        o.addEventListener("change", (function (o) {
            (this.files && this.files.length > 1 ? (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length) : o.target.value.split("\\").pop()) ? e.querySelector(".upload__info").classList.add("dark") : e.innerHTML = s;
            for (var n = [], a = 1, t = 0; t < $(this).get(0).files.length; ++t) n.push($(this).get(0).files[t].name), a += t;
            a >= 1 && a <= 10 ? (e.querySelector(".upload__info").classList.add("dark"), e.querySelector(".upload__caption").innerHTML = "Добавить еще", e.querySelector(".upload__info").innerHTML = "Выбрано ".concat(a, " файла(ов)")) : a > 10 && (e.querySelector(".upload__info").classList.add("error"), e.querySelector(".upload__caption").innerHTML = "Выбрать заново", e.querySelector(".upload__info").innerHTML = "до 10 файлов не более 25 МБ")
        })), o.addEventListener("focus", (function () {
            o.classList.add("has-focus")
        })), o.addEventListener("blur", (function () {
            o.classList.remove("has-focus")
        }))
    }))
}(document, window)), scrollHeader(), $(window).scroll((function () {
    scrollHeader()
})), $(".audit--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#free-audit",
        baseClass: "dark-fancybox",
        touch: !1,
        autoFocus: !1,
        animationEffect: !1
    })
})), $(".callback--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#callback-modal",
        baseClass: "dark-fancybox",
        touch: !1,
        autoFocus: !1,
        animationEffect: !1
    })
})), $(".time--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#time-modal",
        baseClass: "dark-fancybox",
        touch: !1,
        autoFocus: !1,
        animationEffect: !1
    })
})), $(".plan--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#send-plan",
        baseClass: "dark-fancybox",
        touch: !1,
        autoFocus: !1,
        animationEffect: !1
    })
})), $(".reviews--js").on("click", (function (o) {
    var e = $(this).data("id");
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#reviews-modal-".concat(e),
        baseClass: "dark-fancybox",
        touch: !1,
        autoFocus: !1,
        animationEffect: !1
    })
})), $(".youtube").fancybox({
    loop: !1,
    arrows: !1,
    infobar: !1,
    buttons: ["close"],
    touch: !1
}), $(".loading--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({
        loop: !1,
        src: "#loading-modal",
        baseClass: "dark-fancybox",
        touch: !1,
        animationEffect: !1
    })
})), $(".application--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({loop: !1, src: "#application-modal", baseClass: "dark-fancybox", touch: !1, animationEffect: !1})
})), $(".error--js").on("click", (function (o) {
    o.preventDefault(), $.fancybox.open({loop: !1, src: "#error-modal", baseClass: "dark-fancybox", touch: !1, animationEffect: !1})
})), $(".reviews__slick").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    dots: !1,
    infinite: !0,
    speed: 1e3,
    variableWidth: !0
}), $(".reviews .arrow.arrow--prev").on("click", (function (o) {
    $(this).parents(".reviews").find(".reviews__slick").slick("slickPrev")
})), $(".reviews .arrow.arrow--next").on("click", (function (o) {
    $(this).parents(".reviews").find(".reviews__slick").slick("slickNext")
})), $(".slick-slide:not(.slick-cloned) .reviews__image").fancybox({backFocus: !1, mobile: {clickSlide: "close"}}), $(window).width() <= "1010" && $(".services__slick").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    dots: !1,
    infinite: !0,
    speed: 1e3,
    variableWidth: !0
}), $(".slick-slide:not(.slick-cloned) .services__photo").fancybox({backFocus: !1, scrolling: "no", mobile: {clickSlide: "close"}}), $(window).width() <= "590" && $(".trust__row").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    dots: !1,
    infinite: !1,
    speed: 1e3,
    variableWidth: !0
}), $(window).width() <= "590" && $(".works__row").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !1,
    dots: !1,
    infinite: !0,
    speed: 1e3,
    variableWidth: !0
}), $(".slick-slide:not(.slick-cloned) .works__top, .slick-slide:not(.slick-cloned) .works__image-fancybox").fancybox({backFocus: !1, mobile: {clickSlide: "close"}});