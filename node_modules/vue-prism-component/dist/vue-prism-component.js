(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('prismjs')) :
  typeof define === 'function' && define.amd ? define(['prismjs'], factory) :
  (global = global || self, global.PrismComponent = factory(global.Prism));
}(this, (function (Prism) { 'use strict';

  Prism = Prism && Object.prototype.hasOwnProperty.call(Prism, 'default') ? Prism['default'] : Prism;

  function assign(obj) {
    for (var i = 1; i < arguments.length; i++) {
      // eslint-disable-next-line guard-for-in, prefer-rest-params
      for (var p in arguments[i]) {
        obj[p] = arguments[i][p];
      }
    }

    return obj;
  }

  var index = {
    functional: true,
    props: {
      code: {
        type: String
      },
      inline: {
        type: Boolean,
        "default": false
      },
      language: {
        type: String,
        "default": 'markup'
      }
    },
    render: function render(h, ctx) {
      var code = ctx.props.code || (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '');
      var inline = ctx.props.inline;
      var language = ctx.props.language;
      var prismLanguage = Prism.languages[language];
      var className = "language-".concat(language);

      if (inline) {
        return h('code', assign({}, ctx.data, {
          "class": [ctx.data["class"], className],
          domProps: assign({}, ctx.data.domProps, {
            innerHTML: Prism.highlight(code, prismLanguage)
          })
        }));
      }

      return h('pre', assign({}, ctx.data, {
        "class": [ctx.data["class"], className]
      }), [h('code', {
        "class": className,
        domProps: {
          innerHTML: Prism.highlight(code, prismLanguage)
        }
      })]);
    }
  };

  return index;

})));
