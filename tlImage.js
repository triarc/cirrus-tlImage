var Triarc;
(function (Triarc) {
    var Web;
    (function (Web) {
        var DragAndDropImageArea = (function () {
            function DragAndDropImageArea($fileUploader, $translate) {
                this.$fileUploader = $fileUploader;
                this.$translate = $translate;
                this.templateUrl = "Client/triarc/Views/Template/DragAndDropImageAreaTemplate.html";
                this.require = "ngModel";
                this.scope = {
                    ngModel: '=',
                    buttonBinding: '=',
                    css: '=',
                    buttonCss: '=',
                    buttonText: '=',
                    supportedFileTypes: '=',
                    removePrefix: '=',
                };
                this.link = this.unboundLink.bind(this);
            }
            // use an unbound link so that you can access the variables in the class
            DragAndDropImageArea.prototype.unboundLink = function (scope, elem, attributes, ngModel) {
                var _this = this;
                // set defaults if not passed in
                Triarc.hasNoValue(scope.css) ? elem.addClass(scope.css) : elem.addClass("drag-and-drop-image-area");
                Triarc.hasNoValue(scope.buttonCss) ? elem.find('.selection-button').addClass(scope.buttonCss) : elem.find('.selection-button').addClass("btn-success");
                var fileTypes;
                Triarc.hasNoValue(scope.supportedFileTypes) ? fileTypes = scope.supportedFileTypes : fileTypes = ".png,.jpg,.jpeg,.gif";
                this.watchMe(scope, elem);
                var setButtonText = function () {
                    if (Triarc.hasNoValue(scope.buttonText)) {
                        elem.find('.selection-button').text(scope.buttonText);
                    }
                    else {
                        elem.find('.selection-button').text(_this.$translate.instant("_bt_select"));
                    }
                };
                // initial call to set the text
                setButtonText();
                scope.$watch('buttonText', function () {
                    setButtonText();
                });
                var fileSelected = function (file) {
                    var reader = new FileReader();
                    reader.onload = (function (e) {
                        scope.ngModel = e.target.result;
                        scope.$apply();
                    });
                    reader.readAsDataURL(file);
                };
                scope.fileUploaderWrapper = new Triarc.FileUploaderWrapper(this.$fileUploader, scope, fileTypes);
                scope.fileUploaderWrapper.uploader.onAfterAddingFile = function (item) {
                    fileSelected(item._file);
                };
                scope.fileUploaderWrapper.uploader.clearQueue = function () {
                    while (scope.fileUploaderWrapper.uploader.queue.length) {
                        scope.fileUploaderWrapper.uploader.queue[0].remove();
                    }
                    scope.fileUploaderWrapper.uploader.progress = 0;
                    scope.ngModel = null;
                    elem.find('input[type="file"]').prop('value', null);
                };
            };
            DragAndDropImageArea.prototype.watchMe = function (scope, elem) {
                var _this = this;
                if (Triarc.hasNoValue(this.watchRegistration)) {
                    this.watchRegistration();
                }
                this.watchRegistration = scope.$watch('ngModel', function (newVal, oldVal) {
                    if (Triarc.hasNoValue(scope.ngModel)) {
                        if (newVal != oldVal) {
                            if (!Triarc.strContains(scope.ngModel, ",")) {
                                elem.find(".image").css('background-image', 'url(' + 'data:image/jpeg;base64,' + scope.ngModel + ')');
                            }
                            else {
                                if (scope.removePrefix == true) {
                                    var prefix = scope.ngModel.split(',', 1);
                                    scope.ngModel = scope.ngModel.substring(scope.ngModel.indexOf(',') + 1);
                                    elem.find(".image").css('background-image', 'url(' + prefix + ',' + scope.ngModel + ')');
                                }
                                else {
                                    elem.find(".image").css('background-image', 'url(' + scope.ngModel + ')');
                                }
                                _this.watchMe(scope, elem);
                            }
                            elem.find('.selection-button').hide();
                            elem.find('.remove-button').show();
                        }
                    }
                    else {
                        elem.find(".image").css('background-image', 'none');
                        elem.find('.selection-button').show();
                        elem.find('.remove-button').hide();
                    }
                });
            };
            DragAndDropImageArea.prototype.stopWatch = function () {
                this.watchRegistration();
            };
            DragAndDropImageArea.directiveId = "tlDragAndDropImageArea";
            return DragAndDropImageArea;
        })();
        Web.DragAndDropImageArea = DragAndDropImageArea;
    })(Web = Triarc.Web || (Triarc.Web = {}));
})(Triarc || (Triarc = {}));
/// <reference path="draganddropimagearea.ts" />
var Triarc;
(function (Triarc) {
    var Image;
    (function (Image) {
        var mod = angular.module('tlImage', []);
        mod.directive(Triarc.Web.DragAndDropImageArea.directiveId, function ($fileUploader, $translate) { return new Triarc.Web.DragAndDropImageArea($fileUploader, $translate); });
        mod.directive("tlImage", function () {
            return {
                link: function (scope, element, attrs) {
                    attrs.$observe("tlImage", function () {
                        var imageString = attrs.tlImage;
                        if (angular.isString(imageString)) {
                            var result = scope.$eval(imageString);
                            if (angular.isString(result))
                                element.css("background-image", "data:image/png;base64," + imageString);
                            else
                                element.css("background-image", "");
                        }
                        else {
                            element.css("background-image", "");
                        }
                    });
                }
            };
        });
    })(Image = Triarc.Image || (Triarc.Image = {}));
})(Triarc || (Triarc = {}));

