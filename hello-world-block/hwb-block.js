(function(blocks, element) {
  var el = element.createElement;
  var registerBlockType = blocks.registerBlockType;
  registerBlockType("hwb/block", {
    title: "hwb-block",
    category: "common",

    edit: function(props) {
      return el("p", { className: "hwp-block" }, "hello");
    },

    save: function(props) {
      return el("p", { className: "hwp-block" }, "hello");
    }
  });
})(window.wp.blocks, window.wp.element);
