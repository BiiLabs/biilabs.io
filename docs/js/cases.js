$(function () {
})

function setLocaleCallback() {
    if (window.innerWidth > 992) {
        parallex.reset()
        setTimeout(function() {
            $('.cases-img').parallex()
        }, 1000)
    }
}
