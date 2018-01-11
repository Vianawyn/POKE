$(function(){
    let poke = [];
    let colorArr = ['c','d','h','s'];
    let flag = {};
    let table = $('.table');
    let ToRbtn = $('.rightBtn'),ToLbtn = $('.leftBtn'),Rbtn = $('.reBtn');
    let change = $('.change');
    let changeFlag=false;

    //发牌结束，再交换位置
    setTimeout(function(){
        changeFlag=true;
    },4000)
    /*
     poke：num+'_'+color
     */
    /*for(let i =0;i<52;i++){
     let obj = {};
     let color = colorArr[Math.floor(Math.random()*4)],
     num = Math.floor(Math.random()*13+1);
     do{
     color = colorArr[Math.floor(Math.random()*4)];
     num = Math.floor(Math.random()*13+1);
     }while(flag[color+'_'+num])
     poke.push({color,num})
     flag[color+'_'+num] = true;
     }*/
    while(poke.length < 52){
        //let obj = {};
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        if(!flag[num+'_'+color]){
            poke.push({num,color});
            flag[num+'_'+color] = true;
        }
    }
    /*
     Left：350 - 50 * i + 100 * j
     Top：80 * i
     */
    let index = 0;
    for(let i = 0; i < 7; i++){
        for(let j = 0; j <= i; j++){
            let divs = $('<div>');
            let left = 350 - 50 * i + 100* j;
            let top = 50 * i;
            divs
                .addClass('poke top')
                .attr('id',`${i}_${j}`)
                .data('num',poke[index].num)
                //.html(poke[index].color+'_'+poke[index].num)
                .css({zIndex:index,backgroundImage:`url(img/${poke[index].num}${poke[index].color}.jpg)`})
                .appendTo('.table').delay(index*80).animate({left,top,opacity:1});
            index++;
        }
    }
    for( ;index < poke.length;index++){
        let divs = $('<div>');
        divs
            .addClass('poke left')
            .attr('id',-2+"_"+-2)
            .data('num',poke[index].num)
            //.html(poke[index].color+'_'+poke[index].num)
            .css({zIndex:index,backgroundImage:`url(img/${poke[index].num}${poke[index].color}.jpg)`})
            .appendTo('.table').delay(index*80).animate({left:0,top:480,opacity:1});
    }
    //游戏
    //(x,y)s
    //(x+1,y){x+1,y+1}
    let first = null;
    table.on('click','.poke',function(){
        let cards = $(this).attr('id').split('_');
        if($(`#${cards[0]*1+1}_${cards[1]*1}`).length||$(`#${cards[0]*1+1}_${cards[1]*1+1}`).length){
            return;
        }
        console.log(1)
        if($(this).is('.active')){
            $(this).animate({top:'+=20'});
        }else {
            $(this).animate({top: '-=20'});
        }
        $(this).toggleClass('active')

        if(!first){
            first = $(this);
        }else{
            if(first.data('num')+$(this).data('num') == 14){
                $('.active').animate({
                    top:1,left:700
                },function(){
                    $(this).remove();
                });
                /*$('.active').animate({
                 top:0,
                 left:700
                 }).queue(function(){
                 $(this).remove();
                 })*/
            }else{
                $('.active').animate({
                    top:'+=20'
                },function(){
                    $(this).removeClass('active');
                });
                /*$('.active').animate({
                 top:'+=20'
                 }).queue(function(){
                 $(this).removeClass('active');
                 $(this).dequeue();
                 })*/
            }
            first = null;
        }
    })
    let zIndex = 0;
    ToRbtn.on('click',function(){
        if(!$('.left').length){
            return;
        }
        /*//MY
         let last = $("div[class='poke left']").last();
         last.animate({left:'+=700'},function(){
         let i = $(this).index();
         $(this).removeClass('left').addClass('right').css({zIndex:`-${i}`});
         })*/

        /*
         //方法一
         let last = $('.left:last')
         last.css({zIndex:function(index,value){
         return $('.right').eq(0).css('zIndex')*1+1;}})
         .removeClass('left')
         .addClass('right')
         .animate({left:'+=700'}).queue(function(){
         $(this).dequeue()
         })*/

        //方法二
        zIndex++;
        let last = $('.left:last')
        last.css({zIndex})
            .removeClass('left')
            .addClass('right')
            .animate({left:'+=700'}).queue(function(){
            $(this).dequeue()
        })


    })
    ToLbtn.on('click',function(){
        if(!$('.right').length){
            return;
        }
        let last = $("div[class='poke right']").first();
        last.css({zIndex:function(index,value){
            return $('.left').eq(-1).css('zIndex')*1+1;}})
            .removeClass('right')
            .addClass('left')
            .animate({left:'-=700'})
    })
    Rbtn.on('click',function(){
        if(!$('.right').length){
            return;
        }
        $('.right').each(function(index,obj){
            let zIndex = $('.left').eq(-1).css('zIndex')*1+1;
            $(this).css({zIndex:function(index,value){
                return $('.left').eq(-1).css('zIndex')*1+1;}})
                .removeClass('right')
                .addClass('left')
                .delay(index*60).animate({left:'-=700'})
        })
    })

    change.on('click',function(){
        if(changeFlag){
            let cindex = 0;
            let shuliang = $('.top').length;console.log(shuliang)
            let card = $('.table .top');
            let changeLeft='',changeTop='',changeLeft2='',changeTop2='';
            for(let i=0;i<shuliang;i++){//换牌的次数
                let a=Math.floor(Math.random()*(card.length-1)),
                    b=Math.floor(Math.random()*(card.length-1));
                changeLeft=card.eq(a).css("left");
                changeTop=card.eq(a).css("top");
                changeIndex=card.eq(a).css("zIndex");
                changeId=card.eq(a).attr("id");
                changeLeft2=card.eq(b).css("left");
                changeTop2=card.eq(b).css("top");
                changeIndex2=card.eq(b).css("zIndex");
                changeId2=card.eq(b).attr("id");
                card.eq(b).css({"left":changeLeft,"top":changeTop,"zIndex":changeIndex});
                card.eq(b).attr({id:changeId});
                card.eq(a).css({"left":changeLeft2,"top":changeTop2,"zIndex":changeIndex2});
                card.eq(a).attr({id:changeId2});
            }
        }
    })
})