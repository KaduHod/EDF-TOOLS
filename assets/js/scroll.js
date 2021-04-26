var footer = document.getElementsByTagName('footer')
var footer_items = document.getElementsByClassName('footer-item')

function scroll(){
 
    
    var scroll = window.scrollY

    if(scroll> 265){
        footer[0].style.animation = 'radient 5s linear infinite, move-up 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        footer_items[0].style.animation = 'moveup 300ms 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        footer_items[1].style.animation = 'moveup 300ms 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        footer_items[2].style.animation = 'moveup 300ms 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    }
    if(scroll<265){
        footer[0].style.marginTop = '300px'
        footer[0].style.animation = 'radient 5s linear infinite'
        footer_items[0].style.animation = ''
        footer_items[1].style.animation = ''
        footer_items[2].style.animation = ''
        footer_items[0].style.transform = 'translateY(400px)'
        footer_items[1].style.transform = 'translateY(400px)'
        footer_items[2].style.transform = 'translateY(400px)'
    }
}
function atualiza_no_topo(){
    window.scrollTo(0,0)
}