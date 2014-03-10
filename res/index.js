var iframe = { obj: null, height: null };

var menuInfo = {
    home: {
        src: "home.html",
        title: "Home",
        msg: "JUI is html5-based user interface library."
    },
    install: {
        src: "install.html",
        title: "Install",
        msg: "JUI library is very easy to install and use."
    },
    core: {
        title: "Core",
        msg: "To make it easier to develop a user interface provides many core functions.",
        menu: {
            common: "core/common",
            api: "core/api",
            log: "core/log",
            custom: "core/custom"
        }
    },
    script: {
        title: "JavaScript",
        msg: "To represent data provides a variety of UI components.",
        menu: {
            common: "script/common",
            button: "script/button",
            combo: "script/combo",
            window: "script/window",
            table: "script/table",
            treetable: "script/treetable",
            xtable: "script/xtable",
            dropdown: "script/dropdown",
            tab: "script/tab",
            tooltip: "script/tooltip",
            modal: "script/modal",
            tree: "script/tree",
            paging: "script/paging",
            autocomplete: "script/autocomplete",
            datepicker: "script/datepicker",
            notify: "script/notify"
        }
    },
    style: {
        title: "CSS",
        msg: "Fundamental HTML Elements styled and enhanced with extensible classes.",
        menu: {
            common: "style/common",
            form: "style/form",
            icon: "style/icon",
            button: "style/button",
            group: "style/group",
            vgroup: "style/vgroup",
            vmenu: "style/vmenu",
            dropdown: "style/dropdown",
            navbar: "style/navbar",
            table: "style/table",
            tab: "style/tab",
            window: "style/window",
            msgbox: "style/msgbox",
            grid: "style/grid",
            tree: "style/tree",
            paging: "style/paging",
            panel: "style/panel",
            bargraph: "style/bargraph",
            datepicker: "style/datepicker",
            notify: "style/notify"
        }
    }
};

function initHashEvent() {
	$(window).hashchange(function() {
		if(location.hash.indexOf("#") != -1) {
			hash = location.hash.substring(1).split("/");
			initMenuUrl(hash);
			initIFrameResize();
		} else {
			initMenuUrl([ "home" ]);
		}
		
		$("body").scrollTop(0);
	});
	
	// 온-로드 시점에도 발생
	$(window).hashchange();
}

function initMenuUrl(hash) {
	if(hash[0] != "home") {
		$("header .menu").find("a").removeClass("active");
	}
	
	var src = menuInfo[hash[0]].src;
	
	// 타이틀 & 메시지 처리
	if(hash != "home") {
		$("nav:first").removeClass("main");
		$("nav .title").html(menuInfo[hash[0]].title);
		$("nav .msg").html(menuInfo[hash[0]].msg);
		$("nav .headline").show();
		$("nav .container").hide();
		$("#footer-bg").addClass("bg-sub").removeClass("bg");
	} else {
		$("nav:first").addClass("main");
		$("nav .headline").hide();
		$("nav .container").show();
		$("#footer-bg").addClass("bg").removeClass("bg-sub");
	}
	
	// 영역 보이기 및 숨기기
	$("article").hide();
	$("#" + hash[0]).show();
	
	// 상단 메뉴바 선택 효과 처리
	$("[href*=" + hash[0] + "]").addClass("active");
	
	// 자바스크립트 및 스타일 처리
	if(hash[0] == "core" || hash[0] == "script" || hash[0]  == "style") {
		for(var key in menuInfo[hash[0]].menu) {
			initSubMenuUrl(hash);
			break;
		}
	} else {
		$("#" + hash[0]).find("iframe").attr("src", src);
	}
}

function initSubMenuUrl(hash) {
	// 초기값 처리...
	hash[1] = (hash[1]) ? hash[1] : "common";
	
	var src = menuInfo[hash[0]].menu[hash[1]];
	var $target = $("#" + hash[0]),
		$menu = $target.find(".vmenu a[href='#" + hash[0] + "/" + hash[1] + "']");
		
	$target.find("a").removeClass("active");
	$target.find("iframe").attr("src", src + ".html");
	$menu.addClass("active");
	
	if(hash[0] == "script") {
		initLeafMenuUrl(hash, src, $target, $menu);
	}
}

function initLeafMenuUrl(hash, src, $target, $menu) {
	var $submenu = $("#" + hash[0]).find(".submenu");
	
	if(hash[1] == "common") {
		$submenu.hide();
		return;
	}
	
	// 서브메뉴 위치 설정
	$submenu.insertAfter($menu);
	$submenu.find("li").attr("data-key", hash[1]);		
	$submenu.find("li").removeClass("active");
	$submenu.find("li:first").addClass("active");
	$submenu.show();
	
	// 클릭 이벤트 처리
	$submenu.unbind("click").on("click", "li:not(.active)", function(e) {
		var subkey = $(this).data("subkey");
			
		$submenu.find("li").removeClass("active");
		$(this).addClass("active");	
		
		$target.find("iframe").attr("src", src + subkey + ".html");
	});
}

function initIFrameResize() {
	setInterval(function() {
		if(iframe.obj != null) {
			if(iframe.height != getIFrameheight(iframe.obj)) {
				setIFrameHeight(iframe.obj);
			}
		}
	}, 3000);
}

function getIFrameheight(obj) {
	var height = 0;
	
	if(obj.contentDocument && obj.contentDocument.body) {
        height = obj.contentDocument.body.offsetHeight + 40;
    } else if(obj.contentWindow.document.body) {
        height = obj.contentWindow.document.body.scrollHeight;
    }
    
    return height;
}

function setIFrameHeight(obj, id) {
    if($("#" + id).find("iframe")[0] != obj && id) return;

    if(obj.contentDocument && obj.contentDocument.body) {
        obj.height = obj.contentDocument.body.offsetHeight + 40;
    } else if(obj.contentWindow.document.body) {
        obj.height = obj.contentWindow.document.body.scrollHeight;
    }
    
	iframe.obj = obj;
	iframe.height = obj.height;
}

function about() {
	var $layer = $("#about");
	
	if($layer.css("display") == "none") {
		$layer.show();
		$("#btn_about").addClass("active");
	} else {
		$layer.hide();
		$("#btn_about").removeClass("active");
	}
}

$(function() {
	initHashEvent();
	
	$("body").on("click", function(e) {
		if(e.target.tagName == "A") return;
		var $layer = $("#about");
		
		if($layer.css("display") != "none") {
			about();
		}
	});
});