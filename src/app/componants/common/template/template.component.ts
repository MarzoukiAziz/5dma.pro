import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  loadAPI: Promise<any>;

  constructor() {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src')!.includes('loader')
      ) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        '/assets/plugins/js/jquery.min.js',
        '/assets/plugins/js/loader.js',
        '/assets/plugins/js/bootstrap.min.js',
        '/assets/plugins/js/bootsnav.js',
        '/assets/plugins/js/viewportchecker.js',
        '/assets/plugins/js/select2.min.js',
        '/assets/plugins/js/wysihtml5-0.3.0.js',
        '/assets/plugins/js/bootstrap-wysihtml5.js',
        '/assets/plugins/js/datedropper.min.js',
        '/assets/plugins/js/dropzone.js',
        '/assets/plugins/js/owl.carousel.min.js',
        '/assets/plugins/js/slick.min.js',
        '/assets/plugins/js/gmap3.min.js',
        '/assets/plugins/js/jquery.easy-autocomplete.min.js',
        '/assets/js/custom.js',
        '/assets/js/jQuery.style.switcher.js',
      ];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }
}
