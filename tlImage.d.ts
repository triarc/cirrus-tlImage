declare module Triarc.Web {
    class DragAndDropImageArea implements ng.IDirective {
        private $fileUploader;
        private $translate;
        static directiveId: string;
        watchRegistration: any;
        templateUrl: string;
        link: any;
        require: string;
        scope: {
            ngModel: string;
            buttonBinding: string;
            css: string;
            buttonCss: string;
            buttonText: string;
            supportedFileTypes: string;
            removePrefix: string;
        };
        constructor($fileUploader: any, $translate: ng.translate.ITranslateService);
        unboundLink(scope: any, elem: JQuery, attributes: ng.IAttributes, ngModel: ng.INgModelController): void;
        watchMe(scope: any, elem: any): void;
        stopWatch(): void;
    }
}
declare module Triarc.Image {
}
