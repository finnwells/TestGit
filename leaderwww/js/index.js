$(function() {
	var centerView = $("#centerView");

	function init() {
		resize();
		loadMenus();
	}

	function loadCenterView(url) {
		centerView.load(url);
	}

	function resize() {
		var navHei = $(".navbar").height();
		var docHei = $(window).height() - navHei - 2;
		$("#centerView").height(docHei);
		$("#menu").height(docHei);
	}

	function loadMenus() {
		var menu = $("#menu");
		_Global.get("json/menu_data.json", "json", function(menus) {
			for(var i = 0; i < menus.length; i++) {
				var li = combMenus(menus[i], true);
				menu.append(li);
			}
			menu.metisMenu();
		})
	}

	/**
	 * 创建菜单树,如果点击的是顶级菜单的话，并且该菜单没有子菜单的话，会收缩已经打开的顶级菜单
	 * @param {Object} menu 
	 * @param {Object} isTop 是否是顶级菜单
	 */
	function combMenus(menu, isTop) {
		var li = $("<li>");
		var a = $("<a href='javascript:void(0);' aria-expanded='false'>");
		var iconCls = $("<span class='sidebar-nav-item-icon " + menu.iconCls + "'></span>");
		var menuText = $("<span class='sidebar-nav-item'>" + menu.text + "</span>")
		var arrow = $("<span class='fa arrow'></span>");
		a.append(iconCls).append(menuText);
		if(menu.children && menu.children.length) {
			a.append(arrow);
			li.append(a);
			var _ul = $('<ul aria-expanded="false">');
			for(var i = 0; i < menu.children.length; i++) {
				var _li = combMenus(menu.children[i]);
				_ul.append(_li);
			}
			li.append(_ul);
		} else {
			a.on("click", function() {
				if(isTop) {
					$("#menu").find(".active").each(function(i, el) {
						var self = $(el);
						self.removeClass("active").find(".in").animate({
							height: "0px"
						}, 200, "", function() {
							self.find(".in").removeClass("in");
						});
					});
				}
				if(menu.url) {
					loadCenterView(menu.url);
				}
				return false;
			});
			li.append(a);
		}
		return li;
	}

	init();
});