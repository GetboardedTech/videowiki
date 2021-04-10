'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Prism = _interopDefault(require('prismjs'));

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

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error("Prism component for language \"".concat(language, "\" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/"));
    }

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

module.exports = index;
