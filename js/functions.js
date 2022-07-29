
$(document).ready(function(){


    zoomOut("#zoomout_1",true, "appear")
    zoomOut("#zoomout_2",true, "appear")

    stepsScroll( "#stepsscroll_1" )

    zoomIn("#zoomin_1", true)

    copy("#app_cromatica")
    
    scrollLateral("#app_style");
})


function zoomOut(id_elem, elem_animate=false, class_animate=null){
    let elem = $(id_elem);
    if( elem.length !=1 ){
        return;
    }
    let initalScale = 2;
    let minimumScale = 0.75;
    let windowWidth = $(window).width();
    let windowHeight = $(window).width();

    if(windowWidth>1200){
        minimumScale = 0.65;
    }

    let offsetTopElem = $(id_elem+" #zoomout__scrollnext").offset().top;
    let distElement = $(id_elem).offset().top;
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
        let scrollElement = scroll - distElement;
        if( scroll >= distElement){
            let scalemax = initalScale - (scrollElement / 1000)
            if (scalemax < minimumScale) {
                scalemax = minimumScale
            }
            $(id_elem+" #zoomout__sticky").css({"transform": "scale("+scalemax+")"})
            if(!elem_animate){
                return;
            }
            if (scroll >= offsetTopElem - $(window).height() - 200) {
                $(id_elem +" .zoomout__img").addClass(class_animate)
            }else{
                $(id_elem +" .zoomout__img").removeClass(class_animate)
            }
        }
    })
}



let animations = [
    "a-appear", "a-to-bottom"
]
function stepsScroll(id){
    let elem = $(id);
    let order = 0;
    let n_steps = 8;
    if( elem.length !=1 ){
        return;
    }
    let distElement = $(id).offset().top;
    $(window).bind('mousewheel', function(e){
        let scroll = $(window).scrollTop();
        let windowWidth = $(window).width();
        let windowHeight = $(window).width();
        let scrollElement = scroll - distElement;
        
        if( scrollElement >= 0 && scrollElement <= windowHeight){
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
                removeStep(order, animations[order-1]);
                order = order>0 ? order-1 : 0;
                console.log(order);
                
            }
            else{
                console.log('scrolling down !');
                order = order<n_steps ? order+1 :n_steps;
                console.log(order);
                addStep(order, animations[order]);
    
                

            }
        }
    });
}

function addStep(n, a_class){
    $(".step_"+n).addClass(a_class);
}

function removeStep(n, a_class){
    $(".step_"+n).removeClass(a_class);
}

function zoomIn(id_elem , next_text){
    let elem = $(id_elem);
    if( elem.length !=1 ){
        return;
    }
    let initalScale = 1;
    let maximumScale = 5;
    let windowWidth = $(window).width();
    let windowHeight = $(window).width();
    let px_salida = 2*windowHeight/3;

    let distElement = $(id_elem).offset().top;
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
        let scrollElement =  scroll - distElement;
        if( scrollElement >= 0){
            let scalemax = initalScale + (scrollElement * 0.001)
            if (scalemax > maximumScale) {
                scalemax = maximumScale
            }
            $(id_elem+" .zoomin__background").css({"transform": "scale("+scalemax+")"})
        }
        if(!next_text){
            return
        }
        let ini = scrollElement - px_salida;
        let opacity = 0 + ini*0.001;
        let posx = 0 + ini*0.1;
        if(opacity >= 1 ){
            opacity = 1;
        }else if(opacity <=0 ){
            opacity = 0;

        }
        if( scrollElement>= px_salida){
            $(id_elem+" .zoomin__next").css({"opacity": opacity})
            $(id_elem+" .zoomin__next").css({"transform": "translateY("+posx+"px)"})
        }
    })
}


function copy(id_elem){
    let elem = $(id_elem);
    if( elem.length !=1 ){
        return;
    }

    let distElement = $(id_elem).offset().top;

    let child_2 =  $(".stepscopys__copy-card:nth-child(2)");
    let child_3 =  $(".stepscopys__copy-card:nth-child(3)");
    let child_4 =  $(".stepscopys__copy-card:nth-child(4)");
    let getPosX_2 =  parseInt(child_2.css("left").replace("px", ""));
    let getPosX_3 =  parseInt(child_3.css("left").replace("px", ""));
    let getPosX_4 =  parseInt(child_4.css("left").replace("px", ""));

    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
        let scrollElement =  scroll - distElement;   
        if( scrollElement >= 0){
            let mov_2 = getPosX_2 + scrollElement/3 < 0 ? getPosX_2 + scrollElement/3 : 0;
            let op_2 = 0+(getPosX_2 + scrollElement/3)/10;
            let mov_3 = getPosX_3 + scrollElement/3 < 0 ? getPosX_3 + scrollElement/3 : 0;
            let mov_4 = getPosX_4 + scrollElement/3 < 0 ? getPosX_4 + scrollElement/3 : 0;
            child_2.css({"left": mov_2+"px"})
            child_3.css({"left": mov_3+"px"})
            child_4.css({"left": mov_4+"px"})
           

        };
    });
}


function scrollLateral(id_elem){
    let elem = $(id_elem);
    if( elem.length !=1 ){
        return;
    }
    let distElement = elem.offset().top;
    
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();
        console.log("scroll");
        console.log(scroll);
        let scrollElement =  scroll - distElement;  
        if( scrollElement>=0 ){
            console.log("scrollElement");
            console.log(scrollElement);
           $(id_elem+" .latscroll-slide").css({"transform": "translateX("+(-scrollElement)+"px)"})
           

        };
    });
}


function elemenIsOnView(id, px=0){
    let scroll = $(window).scrollTop();
    let distElement = $(id).offset().top;
    let scrollElement =  scroll - distElement;   
    if( scrollElement >= px){
        console.log("----")
        return scrollElement;
    }
    return false;
}