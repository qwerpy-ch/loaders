/**
@Name: loaders.js
@Version: 1.0
@Author: Hideo Kubota
@Contact: hideo@azerpy.com
@Description: This is used to display a loader

---------------------
What's new in this version?
- ...

---------------------
How to use this plugin?
To use this plugin, you have to:
	- Call "loaders.js" in your page,
	- Add the "loaders.css" in your "css" folder.

---------------------
Example:
<script type="text/javascript" src="/js/loaders.js" />
<link rel="stylesheet" type="text/css" href="/css/loaders.css" media="screen" />

In "your-script.js":


---------------------
Options (in "rel" attribute):
	- oElement: display the loader centered based on the given element. Default value is "document.getElementsByTagName('body')[0]".
    - type: type of loader (spinner, 3dots, etc.). Default value: "spinner".
    - overlayOpacity: Opacity of the overlay. Default value: 0.5.
    - backgroundOverlay: color of the overlay. Defalut value: #000000.
    - loadingText: text displayed below the loader. Default value: "Saving...".

**/


(function ($) {
    // formValidator plugin definition
    $.fn.loader = function (options) {

        // Default parameters
        var defaults = {
            oElement: document.getElementsByTagName('body')[0],
            type: "spinner",
            overlayOpacity: 0.5,
            backgroundOverlay: "#000000",
            loadingText: "Saving...",
        };

        // Global variable
        var vars = {
            globalLoaderContainer: null,
            opts: {},
            tempDefaults: {},
            loaderContainer: null,
        };

        // Mix of given parameters and default parameters
        vars.opts = $.extend(defaults, options);


        function CreateLoader() {
            var sHtmlLoader = "";
            var sHtml = document.createElement("div");
            sHtml.setAttribute('class', 'globalLoaderContainer');
            //sHtmlLoader += '<div class="loaderOverlay"></div>';

            //switch (vars.opts.type) {
            //    case "spinner":
            //    default:
            sHtmlLoader += '<div class="loaderContainer">';
            sHtmlLoader += '<div class="loaderContent">';
            sHtmlLoader += '<div class="loaderBloc bloc1">';
            sHtmlLoader += '<div class="circle1"></div>';
            sHtmlLoader += '<div class="circle2"></div>';
            sHtmlLoader += '<div class="circle3"></div>';
            sHtmlLoader += '<div class="circle4"></div>';
            sHtmlLoader += '</div>';
            sHtmlLoader += '<div class="loaderBloc bloc2">';
            sHtmlLoader += '<div class="circle1"></div>';
            sHtmlLoader += '<div class="circle2"></div>';
            sHtmlLoader += '<div class="circle3"></div>';
            sHtmlLoader += '<div class="circle4"></div>';
            sHtmlLoader += '</div>';
            sHtmlLoader += '<div class="loaderBloc bloc3">';
            sHtmlLoader += '<div class="circle1"></div>';
            sHtmlLoader += '<div class="circle2"></div>';
            sHtmlLoader += '<div class="circle3"></div>';
            sHtmlLoader += '<div class="circle4"></div>';
            sHtmlLoader += '</div>';
            sHtmlLoader += '</div>';
            sHtmlLoader += '<p class="text"><span>' + vars.opts.loadingText + '</span></p>';
            sHtmlLoader += '</div>';
            //        break;
            //}

            sHtml.innerHTML = sHtmlLoader;
            return sHtml;

        }

        function LoadLoader() {
            var oHtmlLoader = CreateLoader();

            vars.opts.oElement.appendChild(oHtmlLoader);

            InitializeVariables();

            InitializePosition();

            vars.globalLoaderContainer.classList.add("show");

        }

        // Initialize position
        function InitializePosition() {
            var c = vars.globalLoaderContainer.style;
            var elemHeight = (vars.opts.oElement.tagName.toLowerCase() == 'body') ? helpers.Sizes.height : vars.opts.oElement.offsetHeight;

            c.backgroundColor = "#000000";
            c.width = vars.opts.oElement.offsetWidth + "px";
            c.height = elemHeight + "px";
            c.top = vars.opts.oElement.offsetTop + "px";
            c.left = vars.opts.oElement.offsetLeft + "px";
            c.position = "absolute";

            var d = vars.loaderContainer.style;
            d.left = ((vars.opts.oElement.offsetWidth - vars.loaderContainer.offsetWidth) / 2) + "px";
            if (vars.opts.oElement.offsetHeight > helpers.Sizes.height) {
                d.top = ((helpers.Sizes.height - vars.loaderContainer.offsetHeight) / 2) + "px";
                d.position = "fixed";
            }
            else {
                d.top = ((elemHeight - vars.loaderContainer.offsetHeight) / 2) + "px";
            }
        }

        // Initialize global variable
        function InitializeVariables() {
            vars.globalLoaderContainer = document.getElementsByClassName('globalLoaderContainer')[0];
            vars.loaderContainer = document.getElementsByClassName('loaderContainer')[0];
        }

        // Destroy global variable
        function DestroyVariables() {
            delete vars.globalLoaderContainer;
            delete vars.loaderContainer;
        }

        LoadLoader();

        // interface fluide
        return this;
    };

    $.fn.loader.close = function () {
        $("div.globalLoaderContainer").fadeOut(500, function () { $("div.globalLoaderContainer").remove(); });
    };

})(jQuery);
