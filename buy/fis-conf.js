var receiver = "http://br.hao123.com:8098/receiver.php",
    receiver2 = "http://br.cfz.hao123.com:8088/receiver.php",
    receiver3 = "http://br.fenfen.hao123.com:8080/receiver.php",
    developer="caofenze",
    basePath = "/home/users/"+developer+"/global_hao123_new/webroot/", //fis 开发机目录
    basePath01 = "/home/users/"+developer+"/global_hao123_new/views/",
    basePathcfz = "/home/hao123/global_hao123_new/webroot/",
    basePathcfz01 = "/home/hao123/global_hao123_new/views/",
    exclude = /.*\.(?:svn|cvs|tar|rar|psd).*/;
fis.config.merge({
    namespace: 'buy',
    settings: {
        smarty: {
            'left_delimiter': '<%',
            'right_delimiter': '%>'
        }
    },
    pack: {
        /*'pkg/css_common_relay-rtl.css' : [
             /^\/widget\/ui\/text-overflow\/(.*\/rtl.css)$/i,
             /^\/widget\/ui\/css-base\/dist\/(.*.rtl.ie.flow.css)$/i,
             /^\/widget\/ui\/calendar\/(.*.css)$/i,
             /^\/widget\/ui\/dropdownlist\/(.*.css)$/i,
             /^\/widget\/ui\/prompt\/(.*.css)$/i,
             /^\/widget\/ui\/scrollable\/(.*.css)$/i,
             /^\/widget\/ui\/slider\/(.*.css)$/i,
             /^\/widget\/ui\/jquery\/widget\/jquery.ui.autocomplete\/(.*.css)$/i,
             /^\/widget\/ui\/jquery\/widget\/jquery.ui.datepicker\/(.*.css)$/i,
        ],*/
        /*'pkg/css_common_relay.css' : [
             /^\/widget\/ui\/(.*.css)$/i,
        ],*/
        'pkg/css_common_relay-ltr.css' : [
            /^\/widget\/ui\/text-overflow\/(.*.\/ltr.css)$/i,
            /^\/widget\/ui\/css-base\/dist\/(.*.ltr.ie.flow.css)$/i,
             /^\/widget\/ui\/calendar\/(.*.css)$/i,
             /^\/widget\/ui\/dropdownlist\/(.*.css)$/i,
             /^\/widget\/ui\/prompt\/(.*.css)$/i,
             /^\/widget\/ui\/scrollable\/(.*.css)$/i,
             /^\/widget\/ui\/slider\/(.*.css)$/i,
             /^\/widget\/ui\/jquery\/widget\/jquery.ui.autocomplete\/(.*.css)$/i,
             /^\/widget\/ui\/jquery\/widget\/jquery.ui.datepicker\/(.*.css)$/i,
        ],
        'pkg/css_common_relay_headerfooter_ltr.css' : [
            /^\/widget\/header\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/account\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/clock\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/message\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/site-switch\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/userbar-btn-header\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/weather\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/logo\/ltr\/(.*.css)$/i,
            /^\/widget\/header\/ltr\/(.*.css)$/i,
            '/widget/footer/ltr/ltr.css',
        ],
        /*'pkg/css_common_relay_headerfooter_rtl.css' : [
            /^\/widget\/header\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/account\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/clock\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/message\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/site-switch\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/userbar-btn-header\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/weather\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/logo\/rtl\/(.*.css)$/i,
            /^\/widget\/header\/rtl\/(.*.css)$/i,
            '/widget/footer/rtl/rtl.css',
        ],*/
        'pkg/css_detail_relay-ltr.css' : [
             /^\/widget\/buy-(.*\/ltr.css)$/i
        ],
        'pkg/css_detail_relay-rtl.css' : [
             /^\/widget\/buy-(.*\/rtl.css)$/i
        ],
       
        'pkg/js_detail_relay.js' : [
             /^\/widget\/buy-(.*.js)$/i
        ],
        'pkg/js_detail_headerfooter.js' : [
             /^\/widget\/footer\/(.*.js)$/i,
            /^\/widget\/header\/(.*.js)$/i
        ],
        'pkg/js_common_relay.js' : [
             /^\/widget\/ui\/(.*\/*.js)$/i
        ],
    },
    deploy: {
        test: [
            {
                receiver: receiver,
                from: "/buy/static",
                to: basePath,
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver,
                from: "template",
                to: basePath01 + "templates",
                exclude: exclude
            },
            {
                receiver: receiver,
                from: "config",
                to: basePath01 + "templates",
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver,
                from: "plugin",
                to: basePath + "../lib/smarty/plugins",
                exclude: exclude
            }
        ],
        cfz: [
            {
                receiver: receiver2,
                from: "/buy/static",
                to: basePathcfz,
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver2,
                from: "template",
                to: basePathcfz01 + "templates",
                exclude: exclude
            },
            {
                receiver: receiver2,
                from: "config",
                to: basePathcfz01 + "templates",
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver2,
                from: "plugin",
                to: basePathcfz + "../lib/smarty/plugins",
                exclude: exclude
            }
        ],
        cms: [
            {
                receiver: receiver3,
                from: "/buy/static",
                to: basePathcfz,
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver3,
                from: "template",
                to: basePathcfz01 + "templates",
                exclude: exclude
            },
            {
                receiver: receiver3,
                from: "config",
                to: basePathcfz01 + "templates",
                exclude: exclude
            },
            {
                subOnly: true,
                receiver: receiver3,
                from: "plugin",
                to: basePathcfz + "../lib/smarty/plugins",
                exclude: exclude
            }
        ]
    }
});

fis.config.set('modules.optimizer.tpl', 'html-compress');
fis.config.set('modules.spriter', 'csssprites');
fis.config.set('statics', '/buy/static/');
fis.config.get('roadmap.path').unshift({
    reg: /^\/static\/(img\/.*)$/i,
    useHash: false,
    release: '/static/${namespace}/$1'
});