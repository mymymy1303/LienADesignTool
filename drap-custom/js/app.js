'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement("style");msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.head.appendChild(msViewportStyle);
}$(function () {
	var e = navigator.userAgent;e.indexOf("Mozilla/5.0") > -1 && e.indexOf("Android ") > -1 && e.indexOf("AppleWebKit") > -1 && -1 === e.indexOf("Chrome") && $("select.form-control").removeClass("form-control").css("width", "100%");
});

var app = angular.module("canhCamApp", ["ui.bootstrap", "720kb.socialshare"]);
// Config
app.config(["$compileProvider", function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
}]);
// Filter
app.filter("html", ["$sce", function ($sce) {
	return function (val) {
		return $sce.trustAsHtml(val);
	};
}]);

window.fbAsyncInit = function () {
	FB.init({
		appId: "100000511421818",
		autoLogAppEvents: true,
		xfbml: true,
		version: "v3.1"
	});

	// Put additional init code here
};

// Load the Facebook JS SDK Asynchronously
(function (d, s, id) {
	var js,
	    fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Main Controller
app.controller("mainControl", function ($scope, $http, $rootScope) {
	$scope.showloading = false;
	$scope.imageSave = null;
	$rootScope.genIMG = [];
	$rootScope.imageSaveBASE64 = null;
	$scope.materials = [];
	$scope.showloadingmaterial = false;
	$scope.showdone = false;
	// $scope.buildimagedone = false
	$scope.CAT_URL = getUrlParameter("productid"), $scope.PA_URL = getUrlParameter("pat");
	$scope.lang = {
		loading: "Đang tải dữ liệu...",
		pattern: "Mẫu",
		back: "Trở về",
		share: "Chia sẻ",
		done: "Hoàn thành",
		booking: "Đặt hàng",
		save: "Lưu ảnh",
		itempage: "Số mẫu/trang",
		noitem: "Danh sách màu phối!",
		notice: "Vui lòng chọn danh mục bên cạnh để thực hiện phối màu",
		material: "Danh mục chất liệu"
	};
	$http({
		method: "GET",
		url: baoNguyenApp.API.URL + baoNguyenApp.API.main + "?id=" + $scope.CAT_URL
	}).then(function (response) {
		$scope.settings = eval(response.data.settings);
		$scope.backURL = response.data.settings.productUrl;
		$scope.header = $scope.settings.header.replace("/Data/Sites/", baoNguyenApp.API.URL + "/Data/Sites/");
	}, function (error) {
		console.log("Lỗi Data: " + error);
	});

	$scope.setPattern = function (e) {
		doSetMaterial(e, $scope, $http, $rootScope);
	};

	$scope.buildImage = function () {
		doneBuilder($scope);
	};

	$scope.saveImage = function () {
		var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "download";

		/**
   * Tạo một canvas và append vào cây DOM, node cha của nó là thẻ body.
   * Chỉ dùng để hỗ trợ cho hàm saveImage nên để display: none
   * Kích thước mặc định là 1500px x 1125px để bảo đảm chất lượng hình ảnh khi xuất ra
   * Không có giá trị trả về
   * @param {Id đặt cho thẻ canvas} canvasId
   */
		var createCanvas = function createCanvas(canvasId) {
			var canvas = document.createElement("canvas");
			canvas.id = canvasId;
			canvas.width = 1500;
			canvas.height = 1125;
			canvas.style.display = "none";
			document.body.appendChild(canvas);
		};

		/**
   * Tạo một Image object, có attribute src là đường dẫn imgUrl truyền vào
   * @return 1 promise, resolve khi image được load thành công, reject khi có lỗi xảy ra.
   * @param {Đường dẫn của ảnh cần tạo} imgUrl
   */
		var createImage = function createImage(imgUrl) {
			return new Promise(function (resolve, reject) {
				try {
					var img = new Image();
					img.onload = function () {
						return resolve(img);
					};
					img.src = imgUrl;
				} catch (error) {
					reject(error);
				}
			});
		};

		/**
   * Vẽ image với colorCode tương ứng lên canvas, 1 image 1 lần gọi hàm.
   * @return 1 promise, resolve khi image được draw thành công, reject khi có lỗi xảy ra.
   * @param {Image object} image
   * @param {Mã màu cần phủ lên image, có dạng mã Hex} colorCode
   */
		var drawImage = function drawImage(image, colorCode) {
			return new Promise(function (resolve, reject) {
				try {
					//Tạo 2 biến chứa object CanvasRenderingContext2D để render hình ảnh
					//2 canvas được tạo ẩn, và sẽ bị remove khỏi DOM ngay khi download hình ảnh
					var canvas = document.getElementById("myCanvas");
					var _tempCanvas = document.getElementById("tempCanvas");

					var context = canvas.getContext("2d");
					var tempContext = _tempCanvas.getContext("2d");

					//Vẽ image lên tempCanvas - canvas phụ
					tempContext.drawImage(image, 0, 0);
					if (colorCode !== "") {
						//Nếu colorCode được khai báo thì đổ màu lên hình ảnh
						//Khi đổ màu, vì thiết lập globalCompositeOperation nên chỉ vẽ được 1 hình ảnh lên canvas. Do đó phải sử dụng canvas phụ tempCanvas
						tempContext.globalCompositeOperation = "source-in";
						tempContext.fillStyle = colorCode;
						tempContext.fillRect(0, 0, 1500, 1125);
					}

					//Vẽ nội dung của canvas phụ tempCanvas lên canvas chính, để có thể vẽ nhiều image lên 1 canvas.
					context.drawImage(tempContext.canvas, 0, 0);

					//Thiết lập canvas phụ về mặc định, để dùng cho lần vẽ tiếp theo
					tempContext.globalCompositeOperation = "source-over";
					tempContext.clearRect(0, 0, _tempCanvas.width, _tempCanvas.height);
					resolve("Draw image successfully");
				} catch (error) {
					reject(error);
				}
			});
		};

		/**
   * Chuyển base 64 thành blob object
   * @param {image dataURI} base64
   */
		var base64ToBlob = function base64ToBlob(base64) {
			return new Promise(function (resolve, reject) {
				try {
					var binaryString = atob(base64.split(",")[1]);
					var base64Array = new Uint8Array(binaryString.length);

					for (var index = 0; index < base64Array.length; index++) {
						base64Array[index] = binaryString.charCodeAt(index);
					}

					resolve(new Blob([base64Array]));
				} catch (error) {
					reject(error);
				}
			});
		};

		//Tạo 2 canvas phục vụ cho việc render hình ảnh và đổ màu
		createCanvas("myCanvas", 1500, 1125);
		createCanvas("tempCanvas", 1500, 1125);

		//Cú pháp dùng để gọi 1 series promise theo thứ tự được khai báo trong 1 Array
		// Code được lấy từ https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
		var serial = function serial(funcs) {
			return funcs.reduce(function (promise, func) {
				return promise.then(function (result) {
					return func().then(Array.prototype.concat.bind(result));
				}).catch(function (error) {
					return Array.prototype.concat.bind(error);
				});
			}, Promise.resolve([]));
		};

		var funcs = $rootScope.genIMG.map(function (image) {
			return function () {
				return createImage(image.url).then(function (img) {
					return drawImage(img, image.colorCode);
				}).catch(function (error) {
					return console.log(error);
				});
			};
		});

		var funcsCover = $rootScope.genIMG.map(function (image) {
			return function () {
				return createImage(image.url_cover).then(function (img) {
					return drawImage(img, "");
				}).catch(function (error) {
					return console.log(error);
				});
			};
		});

		//Xen kẽ hai array để khi vẽ image lên canvas sẽ vẽ
		// theo thứ tự: ảnh phối -> lớp phủ -> ảnh phối -> lớp phủ ......
		var mixedFuncs = [];
		for (var i = 0; i < funcs.length; i++) {
			mixedFuncs.push(funcs[i]);
			mixedFuncs.push(funcsCover[i]);
		}

		//2 option dựa vào parameter đưa vào. Nếu option là download thì ảnh phối cảnh sẽ lấy từ ảnh
		//phoicanh.png, sau đó download bình thường.

		//Nếu option là preview thì sẽ return một Promise để thao tác trong hàm Order hoặc Share.
		if (option == "download") {
			createImage("./img/phoicanh.png").then(function (img) {
				return drawImage(img, "");
			}).then(function () {
				serial(mixedFuncs).then(function () {
					var canvas = document.getElementById("myCanvas");
					var imgBase64 = canvas.toDataURL();

					//Chuyển base64 thành Blob object => Thay đổi cách đưa image data vào attribute href của thẻ a
					base64ToBlob(imgBase64).then(function (canvasBlob) {
						//Tạo thẻ a để làm trung gian download, ngay khi download sẽ remove khỏi DOM.
						var imageLink = document.createElement("a");
						imageLink.setAttribute("href", URL.createObjectURL(canvasBlob));
						imageLink.setAttribute("download", "liena-" + Math.floor(Math.random() * 999999) + 99999 + ".png");

						// $rootScope.imageSaveBASE64 = imgBase64
						imageLink.style.display = "none";
						document.body.appendChild(imageLink);
						imageLink.click();
						document.body.removeChild(imageLink);

						//Remove 2 canvas ra khỏi cây DOM
						document.body.removeChild(canvas);
						document.body.removeChild(tempCanvas);
					});
				});
			}).catch(function (err) {
				return console.log(err);
			});
		}

		if (option == "preview") {
			return new Promise(function (resolve, reject) {
				createImage("./img/phoicanh.jpg").then(function (img) {
					return drawImage(img, "");
				}).then(function () {
					serial(mixedFuncs).then(function () {
						try {
							var canvas = document.getElementById("myCanvas");
							var imgBase64 = canvas.toDataURL();

							$rootScope.imageSaveBASE64 = imgBase64;

							//Remove 2 canvas ra khỏi cây DOM
							document.body.removeChild(canvas);
							document.body.removeChild(tempCanvas);
							resolve("Set image successful");
						} catch (error) {
							reject(error);
						}
					});
				}).catch();
			});
		}
	};

	$scope.shareImage = function () {
		var newsFullPath = document.URL;
		var newsFullPathEncode = encodeURIComponent(newsFullPath);
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + newsFullPathEncode + '&src=sdkpreparse');
	};
	$scope.order = function () {
		var orderOption = $scope.saveImage("preview");
		orderOption.then(function () {
			var dataToOrder = {
				image: $rootScope.imageSaveBASE64,
				productId: parseInt($scope.CAT_URL),
				pat: $rootScope.dataPat.toString().replace(",,", ",-,")
			};
			console.table(dataToOrder); //Bật dòng này để kiểm tra code base64 của ảnh đã vào hay chưa
			///////////////Code cho hàm Order vào đây////////////////////////

			//Chặn chuyển trang
			$http({
				method: "POST",
				url: baoNguyenApp.API.URL + baoNguyenApp.API.save,
				data: dataToOrder
			}).then(function (response) {
				if (response.data.success) {
					window.location.href = response.data.cartpageurl;
				}
			}, function (error) {
				console.log("Lỗi Save: " + error);
			});
		}).catch(function (err) {
			return console.log(err);
		});
	};
});
// Child Controller
app.controller("getMenuMaterial", function ($scope, $http, $rootScope) {
	$http({
		method: "GET",
		url: baoNguyenApp.API.URL + baoNguyenApp.API.menu
	}).then(function (response) {
		$scope.menus = eval(response.data.menu);
		$scope.ctrlClickHandler = function (e, m) {
			$rootScope.index = m;
			getMaterial(e, $scope, $http, $rootScope);
		};
		$scope.ctrlClickHandler($scope.menus[0].id, 0);

		if ($scope.PA_URL && $scope.PA_URL != "undefined") {
			$rootScope.dataPat = $scope.PA_URL.split(",");
			var empIds = $scope.PA_URL.split(",");

			var _loop = function _loop(index) {
				$http({
					method: "GET",
					url: baoNguyenApp.API.URL + baoNguyenApp.API.material + "?id=" + $scope.menus[index].id
				}).then(function (data) {
					$scope.data = eval(data.data.lists);
					var filteredArray = $scope.data.filter(function (itm) {
						return empIds.indexOf("" + itm.id + "") > -1;
					});
					getPat(filteredArray, index, filteredArray[0] ? filteredArray[0].id : null, $rootScope);
				}, function (error) {
					console.log("Lỗi Material: " + error);
				});
			};

			for (var index = 0; index < empIds.length; index++) {
				_loop(index);
			}
			// doneBuilder($scope, $http)
		}
	}, function (error) {
		console.log("Lỗi Menu: " + error);
	});
});

function getMaterial(el, $scope, $http, $rootScope) {
	// Phân trang
	$scope.dataCat = el;
	$scope.lists = [];
	$scope.viewby = 1000; // Default 12
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 3;
	$scope.select = [{
		id: 12,
		name: "12"
	}, {
		id: 20,
		name: "20"
	}, {
		id: 24,
		name: "24"
	}, {
		id: 40,
		name: "40"
	}, {
		id: 48,
		name: "48"
	}];
	$scope.viewby = $scope.select[0];
	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
	$scope.pageChanged = function () {
		$scope.lists = $scope.materials.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
	};
	$scope.setItemsPerPage = function (num) {
		$scope.itemsPerPage = num.id;
		$scope.currentPage = 1;
		$scope.lists = $scope.materials.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
	};
	// Phân trang
	$scope.showloading = true;
	$http({
		method: "GET",
		url: baoNguyenApp.API.URL + baoNguyenApp.API.material + "?id=" + el
	}).then(function (response) {
		$scope.materials = eval(response.data.lists);
		$rootScope.dataCat = el;
		// Phân trang
		$scope.totalItems = response.data.lists.length;
		$scope.lists = $scope.materials.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
		// Phân trang
		$scope.showloading = false;
	}, function (error) {
		console.log("Lỗi Material: " + error);
	});
}

function doSetMaterial(e, $scope, $http, $rootScope) {
	$scope.showloadingmaterial = true;
	$scope.showdone = true;
	$http({
		method: "GET",
		url: baoNguyenApp.API.URL + baoNguyenApp.API.material + "?id=" + $rootScope.dataCat
	}).then(function (response) {
		$scope.data = eval(response.data.lists);
		var newArray = $scope.data.filter(function (el) {
			return el.id == e;
		});
		if ($rootScope.index == 3) {
			$rootScope.dataPat[4] = null;
		} else if ($rootScope.index == 4) {
			$rootScope.dataPat[3] = null;
		}
		getPat(newArray, $rootScope.index, e, $rootScope);
	}, function (error) {
		console.log("Lỗi Data: " + error);
	});
	$scope.showloadingmaterial = false;
}

function getPat(newArray, e, m, $rootScope) {
	$rootScope.dataPat[e] = m;

	if ($rootScope.dataPat[e] == null && e == 3 || $rootScope.dataPat[e] == null && e == 4) {
		$rootScope.dataPat[e] = m;
	}

	if (e == 0) {
		$(".blockprodis-nem .nem").css({
			"background-color": newArray[0].color[0]
		});
	} else if (e == 1) {
		$(".blockprodis-goi .goi").css({
			"background-color": newArray[0].color[0]
		});
	} else if (e == 2) {
		$(".blockprodis-goiom .goiom").css({
			"background-color": newArray[0].color[0]
		});
	} else if (e == 3) {
		if ($rootScope.dataPat[e] != null) {
			$(".blockprodis-men-b .men-b").css({
				"background-color": newArray[0].color[0]
			});
			$(".blockprodis-men-f .men-f").css({
				"background-color": newArray[0].color[0]
			});
		}
	} else {
		if ($rootScope.dataPat[e] != null) {
			$(".blockprodis-men-b .men-b").css({
				"background-color": newArray[0].color[1]
			});
			$(".blockprodis-men-f .men-f").css({
				"background-color": newArray[0].color[0]
			});
		}
	}

	if (e == 0) {
		$rootScope.genIMG[e] = {};
		$rootScope.genIMG[e].colorCode = newArray[0].color[0];
		$rootScope.genIMG[e].url = "./img/nem-w.png";
		$rootScope.genIMG[e].url_cover = "./img/nem-s.png";
		$rootScope.genIMG[e].index = e;
	} else if (e == 1) {
		$rootScope.genIMG[e] = {};
		$rootScope.genIMG[e].colorCode = newArray[0].color[0];
		$rootScope.genIMG[e].url = "./img/goi-w.png";
		$rootScope.genIMG[e].url_cover = "./img/goi-s.png";
		$rootScope.genIMG[e].index = e;
	} else if (e == 2) {
		$rootScope.genIMG[e] = {};
		$rootScope.genIMG[e].colorCode = newArray[0].color[0];
		$rootScope.genIMG[e].url = "./img/goiom-w.png";
		$rootScope.genIMG[e].url_cover = "./img/goiom-s.png";
		$rootScope.genIMG[e].index = e;
	} else if (e == 3) {
		if ($rootScope.dataPat[e] != null) {
			$rootScope.genIMG[3] = {};
			$rootScope.genIMG[4] = {};
			$rootScope.genIMG[3].colorCode = newArray[0].color[0];
			$rootScope.genIMG[3].url = "./img/men-b-w.png";
			$rootScope.genIMG[3].url_cover = "./img/men-b-s.png";
			$rootScope.genIMG[3].index = 3;
			$rootScope.genIMG[4].colorCode = newArray[0].color[0];
			$rootScope.genIMG[4].url = "./img/men-f-w.png";
			$rootScope.genIMG[4].url_cover = "./img/men-f-s.png";
			$rootScope.genIMG[4].index = 4;
		}
	} else {
		if ($rootScope.dataPat[e] != null) {
			$rootScope.genIMG[3] = {};
			$rootScope.genIMG[4] = {};
			$rootScope.genIMG[3].colorCode = newArray[0].color[1];
			$rootScope.genIMG[3].url = "./img/men-b-w.png";
			$rootScope.genIMG[3].url_cover = "./img/men-b-s.png";
			$rootScope.genIMG[3].index = 3;
			$rootScope.genIMG[4].colorCode = newArray[0].color[0];
			$rootScope.genIMG[4].url = "./img/men-f-w.png";
			$rootScope.genIMG[4].url_cover = "./img/men-f-s.png";
			$rootScope.genIMG[4].index = 4;
		}
	}
}

function doneBuilder($scope) {
	$scope.showloadingmaterial = true;
	$scope.showdone = false;
	html2canvas(document.querySelector("#drawimages"), {
		logging: false
	}).then(function (canvas) {
		var dataURL = canvas.toDataURL();
		$("#resultsdraw").html('<img class="img-fluid" src="' + dataURL + '">');
		$("#drawimages").hide();
		$scope.imageSave = canvas;
		$scope.imageSaveBASE64 = dataURL;
	});
	$scope.showloadingmaterial = false;
}

function getUrlParameter(param, dummyPath) {
	var sPageURL = dummyPath || window.location.search.substring(1),
	    sURLVariables = sPageURL.replace(/%2C/g, ",").split(/[&||?]/),
	    res;
	for (var i = 0; i < sURLVariables.length; i += 1) {
		var paramName = sURLVariables[i],
		    sParameterName = (paramName || "").split("=");

		if (sParameterName[0] === param) {
			res = sParameterName[1];
		}
	}

	return res;
}

var baoNguyenApp = {
	// API hệ thống 
	API: {
		URL: "http://preview8611.canhcam.com.vn",
		main: '/Product/Services/Api/Drap/PreLoader.ashx',
		menu: '/Product/Services/Api/Drap/List.ashx',
		save: '/Product/Services/Api/Drap/Save.ashx',
		share: '/Product/Services/Api/Drap/Share.ashx',
		material: '/Product/Services/Api/Drap/Detail.ashx'
	},
	// Bật loadding 
	loading: function loading(i) {
		i && 1 == i ? $("#loading").removeClass("done").removeClass("finished") : (setTimeout(function () {
			$("#loading").addClass("done");
		}, 200), setTimeout(function () {
			$("#loading").removeClass("done").addClass("finished");
		}, 1e3));
	},
	// Load dữ liệu & xử lý
	fetch: function fetch(e, o, n) {
		baoNguyenApp.loading(!0), $.ajax({
			url: e,
			type: o,
			dataType: "json",
			cache: !0,
			complete: function complete(e) {
				n(e), baoNguyenApp.loading(!1);
			}
		});
	},
	// Khởi tạo app
	init: function init() {
		$('.control-bar .toggle a').on('click', function () {
			$('.control-bar').addClass('active');
		});
	}
};

function setToolPos() {
	var a = $('.select-nav').outerHeight();
	var b = $('.select-nav .select-nav-color .notice').outerHeight();
	var c = $('.select-nav .done-bar').outerHeight();
	var m = a - c - 50;
	if (a - (b + c) > 0 && $(window).height() > 600) {
		$('.select-nav .select-nav-color .notice').height(m);
	}
}

function setToolPosC() {
	var a = $('.select-nav').outerHeight();
	var b = $('.select-nav .select-nav-color .list-item').outerHeight();
	var c = $('.select-nav .done-bar').outerHeight();
	var m = a - c - 60;
	if (a - (b + c) > 0 && $(window).height() > 600) {
		$('.select-nav .select-nav-color .list-item').height(m);
	}
}

function toggleMenu(el) {
	$(el).parents('ul').find('li').removeClass('active');
	$(el).parents('li').addClass('active');
	setToolPosC();
}

function toggleMenuChild(el) {
	$(el).parents('ul').find('li').removeClass('active');
	$(el).addClass('active');
}

//FUNCTION TO RESIZE SELECT NAV TO EQUALS BOX-PRODUCT
function equalBoxSize() {
	$('.select-color').matchHeight({
		property: 'height',
		target: $('.apply-content')
	});
}

// Canh Cam Code
$(document).ready(function () {
	baoNguyenApp.init();
	baoNguyenApp.fetch(baoNguyenApp.API.URL + baoNguyenApp.API.main, 'GET', function (e) {
		// console.log(e.responseJSON)
		setTimeout(function () {
			setToolPosC();
		}, 500);
	});
	setToolPos();
	equalBoxSize();
});

$(window).resize(function () {
	setTimeout(function () {
		setToolPos();
	}, 500);
});
//# sourceMappingURL=app.js.map
