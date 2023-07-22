$(document).ready(function (){

    function RefreshStats(once) {
        if (stopStats) return;
        setTimeout(function () {
            if (ifvisible.now()) {
                $.get("/online_stats_s" + $("body").attr("data-server") + ".json", function (data) {
                    if (data.a > 0) {
                        accStat.innerHTML = data.a;
                    }
                    if (data.p > 0) {
                        charStat.innerHTML = data.p;
                    }
                    if (data.o > 0) {
                        onlineStat.innerHTML = data.o;
                    }
                    if (data.g > 0) {
                        online24.innerHTML = data.g;
                    }
                });
            }
            if (once == !1) RefreshStats(!1);
        }, 1000);
    }
    
    
    // const ids = ['players-online',
    //             'accounts-created',
    //             'created-characters',
    //             'guilds-created',
    //             'players-online-last-24h'];
    // for(var i = 0; i < ids.length; i++)
    // {
    //     el[ids[i]] = document.querySelector(`#statistic-${ids[i]}`);
    //     od[ids[i]] = new Odometer({
    //         el: el[ids[i]],
    //         duration: 3000,
    //         format: '(,ddd)',
    //         animation: 'count'
    //     });
    // }
    $.ajax({
        url: window.location.pathname,
        type: "POST",
        data: {type: "getData"},
        success: function(data) {
            for(const [key, value] of Object.entries(JSON.parse(data)))
            {
                $(`#statistic-${key}`).html(value);
                console.log(key);
            }
        },
    });
    setInterval(function (){ 
        $.ajax({
            url: window.location.pathname,
            type: "POST",
            data: {type: "getData"},
            success: function(data) {
                for(const [key, value] of Object.entries(JSON.parse(data)))
                {
                    $(`#statistic-${key}`).html(value);
                    console.log(key);
                }
            },
        });
    }, 1000);
});