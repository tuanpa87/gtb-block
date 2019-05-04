(function(blocks, element, editor) {
  var el = element.createElement;
  var registerBlockType = blocks.registerBlockType;
  var PlainText = editor.PlainText;

  registerBlockType("hwb/block", {
    title: "hwb-block",
    category: "common",
    attributes: {
      text: {
        source: "children",
        selector: "p",
        default: "default text"
      }
    },

    edit: function(props) {
      //console.log("edit", props);
      return el(PlainText, {
        className: "hwp-block",
        onChange: function(value) {
          //console.log(value)
          props.setAttributes({ text: value });
        },
        value: props.attributes.text
      });
    },

    save: function(props) {
      //console.log("save", props);
      return el("p", { className: "hwp-block" }, props.attributes.text);
    }
  });
})(window.wp.blocks, window.wp.element, window.wp.editor);
